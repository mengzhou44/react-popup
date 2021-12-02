import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Box = styled.div`
  margin: 10px;
  font-size: 20px;
  padding: 20px;
  border: 1px solid lightblue;

  .item {
    margin: 20px;
    cursor: pointer;
  }
  .item:not(:last-child): {
    margin-top: 10px;
  }

  .popup {
    background-color: #333;

    position: fixed;
    left: 0px;
    top: 0px;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-inner {
    margin: 20px;
    padding: 20px;
    border: 1px solid blue;
    border-adius: 3px;
    background-color: #fff;
    width: 40%;
    height: 40%;
    position: relative;
  }

  .popup-inner button {
    border: 1px solid blue;
    padding: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    curor: pointer;
  }
`;

const App = function () {
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(res.data.slice(0, 10));
    }

    fetchTodos();
  }, []);

  function renderPopup() {
    if (item !== null) {
      return <Popup item={item} onClose={() => setItem(null)} />;
    }
  }
  return (
    <Box>
      {todos.map((item) => (
        <div key={item.id} className="item" onClick={() => setItem(item)}>
          {item.title}
        </div>
      ))}

      {renderPopup()}
    </Box>
  );
};

const Popup = function ({ item, onClose }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={() => onClose()}>close</button>
        <div> {item.id}</div>
        <div> {item.title}</div>
      </div>
    </div>
  );
};

export default App;
