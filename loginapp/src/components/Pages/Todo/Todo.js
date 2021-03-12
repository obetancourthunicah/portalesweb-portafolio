import {useState, useEffect} from 'react';

import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import "./TodoList.css";

import firebaseSDK from '../../../FireBaseInit';

function Todo(){
  const [todoData, setTodoData] = useState({
    todos:[],
    newTodo:""
  });

  useEffect(
    ()=>{
      const todosRef = firebaseSDK.database().ref('todos').orderByKey().limitToLast(100);
      todosRef.on('value', (snapshot)=>{
        const fb_todos = snapshot.val();
        const newTodos = [];
        for (let fb_id in fb_todos) {
          newTodos.push({...fb_todos[fb_id], fb_id});
        }
        setTodoData({...todoData, todos: newTodos});

      });
      // todosRef.on('child_added', (snapshot) => {
      //   let newTodo = { ...snapshot.val(), fb_id: snapshot.key };
      //   let newTodos = todoData.todos;
      //   newTodos.push(newTodo);
      //   setTodoData({...todoData, todos: newTodos, waiting:false});
      // });
      // todosRef.on('child_removed', (snapshot)=>{
      //   const deletedKey = snapshot.key;
      //   let newTodos = todoData.todos.filter(o=>{
      //     return o.fb_id !==deletedKey;
      //   });
      //   setTodoData({ ...todoData, todos: newTodos, waiting:false});
      // });
      // todosRef.on('child_changed', (snapshot) => {
      //   const changedKey = snapshot.key;
      //   const data = snapshot.val();
      //   let newTodos = todoData.todos.map(o => {
      //     if (o.fb_id == changedKey) {
      //       o = {...data, fb_id:changedKey};
      //     }
      //     return o;
      //   });
      //   console.log(newTodos);
      //   setTodoData({ ...todoData, todos: newTodos, waiting: false });
      // });
      return ()=>{
        console.log("UnMounting");
        todosRef.off();
      }
    },
    // eslint-disable-next-line
    []
  );

  const onChange = (e)=>{
    const {value} = e.currentTarget;
    setTodoData({...todoData, newTodo: value});
  };
  const onAddNew = (e)=>{
    let newToo = {
      description: todoData.newTodo,
      completed:false,
      id : new Date().getTime()
    };
    firebaseSDK.database().ref("todos").push(newToo);
      //setTodoData({ ...todoData, waiting:true });
    /*let newTodos = todoData.todos;
    newTodos.push(newToo);

    setTodoData({todos:newTodos, newTodo: ""});
    */
  }
  const doneHandler = (id)=>{
    const ref = firebaseSDK.database().ref("todos")
    const fbTodo = ref.child(id);
    const lcTodo = todoData.todos.find( (o)=>{
      return o.fb_id === id;
    });
    fbTodo.update({
      "completed": !lcTodo.completed
    });
      //setTodoData({ ...todoData, waiting: true });
    // const newTodos = todoData.todos.map((o)=>{
    //   if(o.id == id){
    //     o.completed = !o.completed;
    //   }
    //   return o;
    // });

    // setTodoData({...todoData, todos:newTodos});
  };
  const deleteHandler = (id)=>{
    if (!todoData.waiting){
      const ref = firebaseSDK.database().ref("todos")
      const fbTodo = ref.child(id);
      fbTodo.remove();
    }
    // const newTodos = todoData.todos.filter((o) => {
    //   return o.id !==id;
    // });

    // setTodoData({ ...todoData, todos: newTodos });
  }
  // const tmpTodos = todoData.todos.map( (o)=>{return JSON.stringify(o)} ).join(" | ");
  return (
    <section>
     <NewTodo
      onChange={onChange}
      value={todoData.newTodo}
      onAddNew={onAddNew}
     >
     </NewTodo>
      <TodoList 
        todos={todoData.todos}
        doneHandler={doneHandler}
        deleteHandler={deleteHandler}
      ></TodoList>
    </section>
  )
}

export default Todo;
