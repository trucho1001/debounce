import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  function getData(){
    fetch("https://hn.algolia.com/api/v1/search?query="+value)
    .then(res => res.json())
    .then(
      (result) => {
        setItems(result.hits);
      },
      (error) => {
      }
    )
  }

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value != "") getData();
  }, [value])

  const debouncedChangeHandler = debounce(changeHandler, 500);

  return (
    <>
      <input onChange={debouncedChangeHandler} placeholder="Type something" />
      {items.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </>
  );
}

export default App;
