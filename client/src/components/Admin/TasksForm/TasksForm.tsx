import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Close } from '@mui/icons-material';
import styles from './TaskForm.module.css';
import { jsPDF } from 'jspdf';
import { myFont } from './myFontBinary';
import { ITaskData, TasksFormProps } from './taskformTypes';

export default function TasksForm({
  openModal,
  itemInfo,
  taskInfo,
  setOpenModal,
}: TasksFormProps) {
  const [taskData, setTaskData] = useState<ITaskData>({
    taskNum: 0,
    date: '',
    itemCategory: '',
    itemMaterial: '',
    itemArticle: '',
    size: '',
    sizeComments: '',
    length: '',
    sleeve: '',
    shlitsa: '',
    loops: '',
    delay: '',
    buttons: '',
    lining: '',
    straps: '',
    height: '',
    bust: '',
    waist: '',
    hips: '',
    saddle: '',
    belt: '',
    accs: '',
    zipper: '',
    comments: '',
  });
  console.log(itemInfo);
  const fieldNames = {
    taskNum: 'Задание',
    date: 'Дата',
    itemCategory: 'Изделие',
    itemMaterial: 'Ткань',
    itemArticle: 'Лекала',
    size: 'Размер',
    sizeComments: 'Примечания к размеру',
    length: 'Длина',
    sleeve: 'Рукав',
    shlitsa: 'Шлица',
    loops: 'Шлевки',
    delay: 'Отсрочка',
    buttons: 'Кнопки / Пуговицы',
    lining: 'Утепление',
    straps: 'Погоны паты',
    height: 'Рост',
    bust: 'ОГ',
    waist: 'ОТ',
    hips: 'ОБ',
    saddle: 'Седло',
    belt: 'Пояс',
    accs: 'Стрелки / шлевки / карманы',
    zipper: 'Молния / пуговицы',
    comments: 'Примечания',
  };

  useEffect(() => {
    setTaskData({
      taskNum: taskInfo.id,
      date: new Date(taskInfo.createdAt).toLocaleString(),
      itemCategory: itemInfo.name,
      itemMaterial:
        itemInfo?.Material?.name || itemInfo?.OrderItem?.selected_material,
      itemArticle: itemInfo.article,
      size: '',
      sizeComments: '',
      length: itemInfo.OrderItem.length,
      sleeve: itemInfo.OrderItem.sleeve,
      shlitsa: '',
      loops: '',
      delay: '',
      buttons: itemInfo.OrderItem.buttons,
      lining: itemInfo.OrderItem.lining,
      straps: '',
      height: itemInfo.OrderItem.height,
      bust: itemInfo.OrderItem.bust,
      waist: itemInfo.OrderItem.waist,
      hips: itemInfo.OrderItem.hips,
      saddle: itemInfo.OrderItem.saddle,
    });
  }, [taskInfo, itemInfo]);

  const handleTaskInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreatePDF = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const doc = new jsPDF();
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    doc.addFileToVFS('MyFont.ttf', myFont);
    doc.addFont('MyFont.ttf', 'MyFont', 'normal');
    doc.setFont('MyFont');

    const labelWidth = 80; // Adjust the width of the label column
    const valueWidth = pdfWidth - 25 - labelWidth; // Calculate width for value column

    for (const key in taskData) {
      if (taskData.hasOwnProperty(key)) {
        const label = fieldNames[key];
        const value = String(taskData[key]); // Convert the value to a string

        if (value === 'null' || value === '') {
          continue;
        }
        const labelLines = doc.splitTextToSize(label, labelWidth);
        const valueLines = doc.splitTextToSize(value, valueWidth);

        const maxLines = Math.max(labelLines.length, valueLines.length);

        for (let i = 0; i < maxLines; i++) {
          const labelLine = labelLines[i] || '';
          const valueLine = valueLines[i] || '';

          doc.text(labelLine, 15, yPos);
          doc.text(valueLine, 15 + labelWidth, yPos);

          const lineYPos = yPos + 3; // Adjust the vertical position of the line
          doc.setLineWidth(0.1); // Adjust line width as needed
          doc.line(15, lineYPos, pdfWidth - 15, lineYPos); // Draw the line
          yPos += 10;
        }
      }
    }

    doc.save(
      `Задание ${taskData.taskNum}_дата ${taskData.date.slice(0, -10)}.pdf`
    );
  };

  return (
    <div
      className={`${styles.modalContainer} ${
        openModal ? styles.showdiv : styles.hidediv
      }`}
    >
      <div className={styles.modalContent}>
        <Close className={styles.close} onClick={() => setOpenModal(false)} />
        {itemInfo.category_id !== 4 && (
          <p>
            Рост: {itemInfo.OrderItem.height}, ОГ: {itemInfo.OrderItem.bust},
            ОТ: {itemInfo.OrderItem.waist}, ОБ: {itemInfo.OrderItem.hips}
          </p>
        )}
        <form onSubmit={handleCreatePDF} className={styles.taskForm}>
          <label htmlFor="taskNum">Задание</label>
          <input
            type="text"
            name="taskNum"
            defaultValue={taskInfo.id}
            onChange={handleTaskInputChange}
          />
          <label htmlFor="date">Дата</label>
          <input
            type="text"
            name="date"
            defaultValue={taskData.date}
            onChange={handleTaskInputChange}
          />
          <label htmlFor="itemCategory">Изделие</label>
          <input
            type="text"
            name="itemCategory"
            defaultValue={itemInfo.name}
            onChange={handleTaskInputChange}
          />
          <label htmlFor="itemMaterial">Ткань</label>
          <input
            type="text"
            name="itemMaterial"
            defaultValue={itemInfo?.Material?.name}
            onChange={handleTaskInputChange}
          />
          <label htmlFor="itemArticle">Лекала</label>
          <input
            type="text"
            name="itemArticle"
            defaultValue={itemInfo.article}
            onChange={handleTaskInputChange}
          />
          <label htmlFor="size">Размер</label>
          <input type="text" name="size" onChange={handleTaskInputChange} />

          <label htmlFor="sizeComments">Примечания к размеру</label>
          <textarea
            name="sizeComments"
            rows={3}
            cols={25}
            onChange={handleTaskInputChange}
          />
          <label htmlFor="length">Длина</label>
          <input
            type="text"
            name="length"
            defaultValue={itemInfo.OrderItem.length}
            onChange={handleTaskInputChange}
          />
          {itemInfo.category_id !== 4 && (
            <>
              <label htmlFor="sleeve">Рукав</label>
              <input
                type="text"
                name="sleeve"
                defaultValue={itemInfo.OrderItem.sleeve}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="shlitsa">Шлица</label>
              <input
                type="text"
                name="shlitsa"
                onChange={handleTaskInputChange}
              />

              <label htmlFor="loops">Шлёвки</label>
              <input
                type="text"
                name="loops"
                onChange={handleTaskInputChange}
              />
              <label htmlFor="delay">Отсрочка</label>
              <input
                type="text"
                name="delay"
                onChange={handleTaskInputChange}
              />
              <label htmlFor="buttons">Кнопки/пуговицы</label>
              <input
                type="text"
                name="buttons"
                defaultValue={itemInfo.OrderItem.buttons}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="lining">Утепление</label>
              <input
                type="text"
                name="lining"
                defaultValue={itemInfo.OrderItem.lining}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="straps">Погоны паты</label>
              <input
                type="text"
                name="straps"
                onChange={handleTaskInputChange}
              />
            </>
          )}
          {itemInfo.category_id === 4 && (
            <>
              <label htmlFor="height">Рост</label>
              <input
                type="text"
                name="height"
                defaultValue={itemInfo.OrderItem.height}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="bust">ОГ</label>
              <input
                type="text"
                name="bust"
                defaultValue={itemInfo.OrderItem.bust}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="waist">ОТ</label>
              <input
                type="text"
                name="waist"
                defaultValue={itemInfo.OrderItem.waist}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="hips">ОБ</label>
              <input
                type="text"
                name="hips"
                defaultValue={itemInfo.OrderItem.hips}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="saddle">Седло</label>
              <input
                type="text"
                name="saddle"
                defaultValue={itemInfo.OrderItem.saddle}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="belt">Пояс</label>
              <input type="text" name="belt" onChange={handleTaskInputChange} />
              <label htmlFor="accs">Стрелки / шлевки / карманы</label>
              <input type="text" name="accs" onChange={handleTaskInputChange} />
            </>
          )}
          {itemInfo.category_id === 6 && (
            <>
              <label htmlFor="sleeve">Рукав</label>
              <input
                type="text"
                name="sleeve"
                defaultValue={itemInfo.OrderItem.sleeve}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="height">Рост</label>
              <input
                type="text"
                name="height"
                defaultValue={itemInfo.OrderItem.height}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="bust">ОГ</label>
              <input
                type="text"
                name="bust"
                defaultValue={itemInfo.OrderItem.bust}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="waist">ОТ</label>
              <input
                type="text"
                name="waist"
                defaultValue={itemInfo.OrderItem.waist}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="hips">ОБ</label>
              <input
                type="text"
                name="hips"
                defaultValue={itemInfo.OrderItem.hips}
                onChange={handleTaskInputChange}
              />
              <label htmlFor="zipper">Молния \ пуговицы</label>
              <input
                type="text"
                name="zipper"
                onChange={handleTaskInputChange}
              />
            </>
          )}
          <label htmlFor="comments">Примечания</label>
          <textarea
            name="comments"
            rows={3}
            cols={25}
            onChange={handleTaskInputChange}
          />
          <button className={styles.pdfBtn}>Создать PDF</button>
        </form>
      </div>
    </div>
  );
}
