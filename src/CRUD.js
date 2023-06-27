import React, { useRef, useState } from 'react';
import './CRUD.css';

function CRUD() {
  const list = [
    {
      id: 1,
      name: 'apple',
      price: 200,
    },
    {
      id: 2,
      name: 'banana',
      price: 100,
    }, 
  ];
  const [lists, setLists] = useState(list);
  const [updateState, setUpdateState] = useState(-1);

  function handleEdit(id) {
    setUpdateState(id);
  }

  function handleDelete(id) {
    const newList = lists.filter((lis) => lis.id !== id);
    setLists(newList);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newList = lists.map((lis) =>
      lis.id === updateState ? { ...lis, name: name, price: price } : lis
    );
    setLists(newList);
    setUpdateState(-1);
  }

  function handleInputName(event) {
    const value = event.target.value;
    const newList = lists.map((lis) =>
      lis.id === updateState ? { ...lis, name: value } : lis
    );
    setLists(newList);
  }

  function handleInputPrice(event) {
    const value = event.target.value;
    const newList = lists.map((lis) =>
      lis.id === updateState ? { ...lis, price: value } : lis
    );
    setLists(newList);
  }

  return (
    <div className="crud">
      <div>
        <AddList setLists={setLists} lists={lists} />
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              {lists.map((current) =>
                updateState === current.id ? (
                  <EditList
                    key={current.id}
                    current={current}
                    handleInputName={handleInputName}
                    handleInputPrice={handleInputPrice}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <tr key={current.id}>
                    <td>{current.name}</td>
                    <td>{current.price}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(current.id)}
                      >
                        EDIT
                      </button>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => handleDelete(current.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

function AddList({ setLists, lists }) {
  const nameRef = useRef();
  const priceRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const newlist = {
      id: lists.length + 1,
      name,
      price,
    };
    setLists((prevList) => {
      return prevList.concat(newlist);
    });
    nameRef.current.value = '';
    priceRef.current.value = '';
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="enter name" ref={nameRef} />
      <input
        type="text"
        name="price"
        placeholder="enter price"
        ref={priceRef}
      />
      <button type="submit">ADD</button>
    </form>
  );
}

function EditList({ current, handleInputName, handleInputPrice, handleSubmit }) {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          onChange={handleInputName}
          value={current.name}
        />
      </td>
      <td>
        <input
          type="text"
          name="price"
          onChange={handleInputPrice}
          value={current.price}
        />
      </td>
      <td>
        <button type="submit" onClick={handleSubmit}>
          update
        </button>
      </td>
    </tr>);
}
export default CRUD;