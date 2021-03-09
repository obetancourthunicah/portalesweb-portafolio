import { MdDone, MdDelete} from 'react-icons/md';

// ()=>     fat arrow functions  funciones de flecha gorda ;

function TodoListItem({descripcion, id, completed, doneHandler, deleteHandler}){
  const onClick = (e)=>{
    doneHandler(id);
  }
  const onDeleteClick = (e)=>{
    deleteHandler(id);
  }

  const styles = {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    padding: "1rem",
    borderBottom: "",
    justifyContent:"space-between",
    alignItems:"center",
  }

  const myClass = (completed)?"striked": "";
  return (
    <li style={styles}>
    <span className={myClass}>{descripcion}</span>
    <span className="flex">
    <MdDone size="1.5em" onClick={onClick}></MdDone>
    <MdDelete size="1.5em" onClick={onDeleteClick}></MdDelete>
    </span>
  </li>);
}

function TodoList({todos, doneHandler, deleteHandler}){
  const todoItems = todos.map((o)=>{
    return (
      <TodoListItem
        key={o.id}
        descripcion={o.description}
        id={o.id}
        completed={o.completed}
        doneHandler={doneHandler}
        deleteHandler={deleteHandler}
      />
    )
  });
  return (
    <section className="TodoList">
      <ul>
         {todoItems}
      </ul>
    </section>
  );
}

export default TodoList;
