import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
function App() {

const [timeLeft,setTimeLeft] = useState(25*60);
const [isRunning,setIsRunning] = useState(false);
const [isBreak,setIsBreak] = useState(false); 
const [message,setMessage] = useState('');
const cheerMessages=[
  "You're doing great!",
  "Keep it up!",
  "Almost there!",
  "You're a star!",
  "Believe in yourself!"
];
const breakMessages=[
  "Take a deep breath!",
  "Relax and recharge!",
  "Enjoy your break!",
  "You're doing amazing!",
  "Keep up the great work!"
];
//messages
useEffect(()=>{
  let messageInterval:NodeJS.Timeout;
  if(isRunning){
    const messages=isBreak ? breakMessages : cheerMessages;
    setMessage(messages[0]);
    let index=1;
    messageInterval=setInterval(()=>{
      setMessage(messages[index]);
      index=(index+1)%messages.length;
    },4000);
    
  }
  else{
      setMessage('');
    }
  return ()=>clearInterval(messageInterval);
},[isRunning,isBreak]);


//timers
useEffect(() => {
  let timer: NodeJS.Timeout;
  if(isRunning && timeLeft>0){
    timer=setInterval(()=>{
      setTimeLeft((prevTime)=>prevTime-1);
    },1000);
  }
  return ()=>clearInterval(timer);
},[isRunning,timeLeft]);

const formatTimer=(seconds:number):string=>{
  const minutes=Math.floor(seconds/60).toString().padStart(2,'0');
  const secondsLeft=(seconds%60).toString().padStart(2,'0');
  return `${minutes}:${secondsLeft}`;
};

const switchMode=(breakMode:boolean)=>{
  setIsBreak(breakMode);
  setIsRunning(false);
  setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
};



const HandleClick = () => {
  if (!isRunning) {
    setIsRunning(true);
  } else {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  }
};

  return (
    <div style={{ position: 'relative' }}>
        <div>
            <button className='closeButton'>
                     Close
            </button>
          </div>

           <div className='home-content'>
               <div className='home-controls'>
                 <button className='imgButton' onClick={() => switchMode(false)}>
                        Work
                   </button>
                  <button className='imgButton' onClick={() => switchMode(true)}>
                       Break
                   </button>

                </div>
          <p className={`message ${isRunning ? 'hidden' : ''}`}>{message}</p>
          <h1 className='homeTimer'>{formatTimer(timeLeft)}</h1>
                  <button className='startButton' onClick={HandleClick}>
                      Start
                   </button>
            </div>
     </div>
  );
}

export default App;
