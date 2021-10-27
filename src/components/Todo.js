import React, { useState, useEffect } from "react";
import { FcTodoList } from "react-icons/fc";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Button } from "react-bootstrap";
import { IoSave } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//get data from localStorage
const getLocalData = () => {
  const list = localStorage.getItem("todoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isEditItem, setIsEditItem] = useState("");

  //Add item handler
  const addItemHandler = () => {
    if (!inputData) {
      toast.warn("Please write something!!!🥺", { autoClose: 2000 });
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((currentEle) => {
          if (currentEle.id === isEditItem) {
            toast.success("Data updated successfully.", {
              autoClose: 2000,
            });
            return { ...currentEle, item: inputData };
          }
          return currentEle;
        })
      );
      setInputData("");
      setToggleBtn(false);
    } else {
      const newData = {
        item: inputData,
        id: uuidv4(),
      };
      toast.success("Data added successfully.", { autoClose: 2000 });
      setItems([...items, newData]);
      setInputData("");
    }
  };

  //Delete item
  const deletehandler = (id) => {
    const updatedItems = items.filter((current) => {
      return current.id !== id;
    });
    setItems(updatedItems);
    toast.success("Data removed successfully.", { autoClose: 2000 });
  };

  //Remove all
  const removeAllHandler = () => {
    setItems([]);
    toast.success("All data removed successfully.", { autoClose: 2000 });
  };

  //Update item
  const editItemHandler = (id) => {
    const getData = items.find((item) => {
      return item.id === id;
    });
    setInputData(getData.item);
    setToggleBtn(true);
    setIsEditItem(id);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <ToastContainer className="toast-css" />
      <FcTodoList className="icon-list" />
      <div className="lbl-list mb-4">Add Your List Here ✌</div>
      <input
        type="text"
        placeholder="✍ Add item"
        className="form-control txtbox-list"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {toggleBtn ? (
        <IoSave className="icon-save" onClick={() => addItemHandler()} />
      ) : (
        <FaPlus className="icon-add" onClick={() => addItemHandler()} />
      )}

      <div className="list-item ">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <div className="item">{item.item}</div>
              <FiEdit
                className="icon-edit"
                onClick={() => editItemHandler(item.id)}
              />
              <MdOutlineDelete
                className="icon-delete"
                onClick={() => deletehandler(item.id)}
              />
            </div>
          );
        })}
      </div>
      <Button
        variant="outline-primary"
        className="my-3"
        style={{ width: " 300px" }}
        onClick={() => removeAllHandler()}
        disabled={Object.entries(items).length === 0 ? true : false}
      >
        Remove All
      </Button>
    </>
  );
}

export default Todo;
