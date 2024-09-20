import './App.css';

//to manage state we will use some of the useState we will be injecting a hok as well so we will also be using useEffect 

import {useState,useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';

const socket = io.connect('http://localhost:4000');
const userName = nanoid(4);

function App() {

  const [messages,setMessages] = useState('');
  const [chat, setChat] = useState([]); 
  /*value is binded to messages state so whenever something is sent in the value it send to messages state . In onChange an event is given and as soon as an event is given a method will be fired up which will be called setMessages*/

  const sendChat = (e)=>{
    e.preventDefault();  //so that form doesnt get automatically send to different locations 
    socket.emit('chat', {messages , userName})
  }

  useEffect(()=>{
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    })
    });

  return (
    <div className="App">
      <h1>chatty app</h1>
      {chat.map((payload , index )=>{
        return(
          <p key={index}>{payload.messages}: <span>id: {payload.userName}</span></p>
        )
      })}
      <form onSubmit={sendChat}>
        <input type='text' name='chat' 
          placeholder='send text'
          value = {messages}
          onChange={ (e) =>{setMessages(e.target.value)}}
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
  /* so setmessage is responsible for changing the message and the actual value is the message , so anychange happening is using a method which is setMessage so seMessage is resposible to setting the value of actual message and the actual message is the value*/
}

export default App;
