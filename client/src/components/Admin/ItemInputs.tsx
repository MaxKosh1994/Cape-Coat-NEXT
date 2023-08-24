import AdminInput from "./AdminInput";

export default function ItemInputs(props) {
  return (
    <>
      <AdminInput
        changeHandler={props.changeHandler}
        name={"nameModel"}
        label={"Имя модели"}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={"description"}
        label={"Описание"}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={"model_sizes"}
        label={"Размер модели"}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={"characteristics"}
        label={"Характеристики"}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={"price"}
        label={"Цена"}
      />
      <AdminInput
        changeHandler={props.changeHandler}
        name={"color"}
        label={"Цвет"}
      />
    </>
  );
}
