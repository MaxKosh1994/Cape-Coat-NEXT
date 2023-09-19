import AdminInput from './AdminInput';

// TODO нужна типизация, any заглушка
export default function ItemInputs(props: any) {
  const formData = props.formData;

  return (
    <>
      <AdminInput
        changeHandler={props.changeHandler}
        name={'name'}
        label={'Название'}
        types={'text'}
        value={formData.name}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'article'}
        label={'Артикул'}
        types={'number'}
        value={formData.article}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'description'}
        label={'Описание'}
        types={'text'}
        value={formData.description}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'model_params'}
        label={'Параметры модели'}
        types={'text'}
        value={formData.model_params}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'characteristics'}
        label={'Характеристики'}
        types={'text'}
        value={formData.characteristics}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'price'}
        label={'Цена'}
        types={'number'}
        value={formData.price}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={'new_price'}
        label={'Новая цена'}
        types={'number'}
        value={formData.new_price}
        formData={formData}
      />
    </>
  );
}
