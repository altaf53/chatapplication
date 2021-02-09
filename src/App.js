import { useEffect, useState } from 'react';
import database from "./firebase";
import firebase from 'firebase';
import './App.css';

function App() {

  const [input, setInput] = useState('');

  const [list, setList] = useState([]);

  // useEffect()

  useEffect(() => {
    database.collection('message').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setList(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  })

  const sendMessage = (event) => {
    event.preventDefault();

    const chatMessage = {
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    database.collection("messages").add(chatMessage);
    setInput("")
  };

  return (
    <div className = "app">
      <h1>this is india</h1>

      {list.map(({id, data: { message, timestamp }}) => (
        <h3 className= "chatMessage">{message}</h3>
      ))}

      <form>
        <input value = {input} onChange = {event => setInput(event.target.value)}></input>
        <button onClick={sendMessage} type="submit">send message</button>
      </form>
    </div>
  );
}

export default App;
