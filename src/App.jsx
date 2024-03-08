import React, { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "./delete-icon.png"
import "./App.css";
import Footer from "./Footer.jsx";


const App = () => {

  const getAllTasks=()=>{
    const list=localStorage.getItem('lists');
    if(list) return JSON.parse(list);
    else return [];
  }

  const [items, setItems] = useState(getAllTasks());
  const [itemName, setItemName] = useState("");

  const handleClick = (e) => {
    if (!itemName) return;

    setItems([...items, { name: itemName, done: false }]);
    setItemName("");
  };

  const handleRemoveItem = (e) => {
    const id = e.target.getAttribute("id");
    setItems((items) => items.filter((s, idx) => idx !== parseInt(id)));
  };

  const handleDoneTask = (e) => {
    const id = e.target.getAttribute("id");
    let newArr = [...items];
    newArr[parseInt(id)].done = !newArr[parseInt(id)].done;
    setItems(newArr);
  };

  const handleChange = (e) => {
    const name = e.target.value;
    setItemName(name);
  };

  useEffect(()=>{
      localStorage.setItem('lists',JSON.stringify(items));
  },[items]);

  return (
    <div className="container">
      <div className="todo-container">
        <div className="todo-header-container">
          <div className="todo-header">
            <p>My To Do List</p>
          </div>
          <div className="todo-adder">
            <input
              placeholder="Title..."
              value={itemName}
              onChange={handleChange}
              onKeyDown={(e)=>{
                if(e.key==='Enter')
                handleClick();
              }}
              type="text"
            />
            <button onClick={handleClick}>+</button>
          </div>
        </div>
        <div className="todo-items">
          {!items.length ? (
            <div className="todo-items-card">
              <p>Right now no task has been added </p>
            </div>
          ) : (
            items.map((element, idx) => (
              <div className="todo-items-card">
                {element.done ? (
                  <p id={idx} className="line-through" onClick={handleDoneTask}>
                    {idx + 1}. {element.name}
                  </p>
                ) : (
                  <p id={idx} onClick={handleDoneTask}>
                    {idx + 1}. {element.name}
                  </p>
                )}
                <img alt="Delete Task" src={DeleteIcon} id={idx} onClick={handleRemoveItem}/>  
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;