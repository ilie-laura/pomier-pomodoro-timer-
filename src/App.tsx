import React from 'react';
import { useRef } from 'react'; 
import './App.css';
import { useState,useEffect } from 'react';
import pauseImg from './assets/pause.png';
import playImg from './assets/play.png';
import resetImg from './assets/reset.svg';
import workImg from './assets/work.png';
import workImgClick from './assets/work-clicked.png';
import breakImg from './assets/break.png';
import breakImgClick from './assets/break-clicked.png';
import closeButton from './assets/close.svg';
import IdleGif from './assets/idle.gif';
import WorkGif from './assets/work.gif';
import BreakGif from './assets/break.gif';
import music from './assets/feels.mp3';
import musicBg from './assets/sakura.mp3'
import cd from './assets/cd.png'
import cd_exit from './assets/cd_x.png'



function App() {

const finishMusic=new Audio(music);
const [timeLeft,setTimeLeft] = useState(25*60);
const [isRunning,setIsRunning] = useState(false);
const [isBreak,setIsBreak] = useState(false); 
const [message,setMessage] = useState('');
const [breakButton,setBreakButton] = useState(breakImg);
const [workButton,setWorkButton] = useState(workImg);
const [gifImage,setGifImage] = useState(IdleGif);
const [image,setImage]=useState(playImg);

const audioRef = useRef<HTMLAudioElement>(null);
  const playMusic = () => {
    audioRef.current?.play();
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
  };
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
useEffect(() => {
  let messageInterval: NodeJS.Timeout;
  if (isRunning) {
    const messages = isBreak ? breakMessages : cheerMessages;
    setMessage(messages[0]);
    let index = 1;
    messageInterval = setInterval(() => {
      setMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 4000);
  } else {
    setMessage('');
  }
  return () => clearInterval(messageInterval);
}, [isRunning, isBreak]);


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
  setBreakButton(breakMode ? breakImgClick : breakImg);
  setWorkButton(breakMode ? workImg : workImgClick);
  setGifImage(IdleGif);
};
//initial work activated
useEffect(() => {
 switchMode(false);
}, []);

//audio


 useEffect(() => {
    if (timeLeft === 0 && isRunning) {
        finishMusic.play().catch(err => {
            console.error("Audio play failed:", err);
        });
        setIsRunning(false); // Optional: auto-stop the timer
        setImage(playImg);   // Reset to play button
        setGifImage(IdleGif); // Reset to idle gif
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
}, [timeLeft]);

const HandleClick = () => {
  if (!isRunning) {
    setIsRunning(true);
    setGifImage(isBreak ? BreakGif : WorkGif);
    setImage(resetImg);
  } else {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setGifImage(IdleGif);
    setImage(playImg);
  }
};
  const handleCloseClick = () => {
  if (window.electronAPI?.closeApp) {
    window.electronAPI.closeApp();
  } else {
    console.warn("Electron API not available");
  }
}
const containerClass = `home-container ${isRunning ? 'bg-border' : ''}`;
  return (
    <div className={containerClass} style={{ position: 'relative' }}>
        <audio ref={audioRef} loop>
        <source src={musicBg} type="audio/mpeg" />
      </audio>
      <div>

        <button className='closeButton' onClick={handleCloseClick}>
          <img src={closeButton} alt="Close" />
        </button>

      </div>
      <div className='music-controls'>
        <button className='playMusic' onClick={playMusic}>
          <img src={cd} alt="Play Music" />
        </button>
        <button className='pauseMusic' onClick={pauseMusic}>
          <img src={cd_exit} alt="Pause Music" />
        </button>
      </div>
           <div className='home-content'>
               <div className='home-controls'>
                 <button className='imgButton' onClick={() => switchMode(false)}>
                       <img src={workButton} alt="Work" />
                   </button>
                  <button className='imgButton' onClick={() => switchMode(true)}>
                       <img src={breakButton} alt="Break" />
                   </button>

                </div>
          <p className='message-text'>{message}</p>
          <h1 className='home-timer'>{formatTimer(timeLeft)}</h1>
          <img src={gifImage} className='gif-image' alt="Timer Status"/>
                  <button className='startButton' onClick={HandleClick}>
                    <img src={image} alt="Button-icon" />
                   </button>
            </div>
     </div>
  );
}

export default App;
