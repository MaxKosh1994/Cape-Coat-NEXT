import AdminInput from './AdminInput';

export default function ItemInputs(props) {
  return (
    <>
      <AdminInput
        changeHandler={props.changeHandler}
        name={'name'}
        label={'Название'}
        types={'text'}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'article'}
        label={'Артикул'}
        types={'number'}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'description'}
        label={'Описание'}
        types={'text'}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'model_params'}
        label={'Параметры модели'}
        types={'text'}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'characteristics'}
        label={'Характеристики'}
        types={'text'}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'price'}
        label={'Цена'}
        types={'number'}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'new_price'}
        label={'Новая цена'}
        types={'number'}
      />
    </>
  );
}
