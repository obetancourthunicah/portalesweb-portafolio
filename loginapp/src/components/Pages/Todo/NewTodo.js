import FormField from '../../Forms/FormField';
import { MdAdd } from 'react-icons/md';

function NewTodo({ onChange, value, onAddNew}){
  return (
    <section className="TodoAddNew">
      <section className="flex justify-between w-screen items-center px-4 border">
        <FormField
          type="text"
          id="txtNTodo"
          fname="txtNTodo"
          onChange={onChange}
          value={value}
          caption="Nuevo Todo"
          className="flex p-2 m-2 w-5/6 bg-white shadow"
          labelClassName="flex w-5/6"
          containerClassName="flex"
          onKeyUp={(e) => { if (e.keyCode == 13) { onAddNew(e);} }}
        />
        <MdAdd size={"3rem"} onClick={onAddNew}></MdAdd>
      </section>
    </section>
  );
}

export default NewTodo;
