import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div style={{ position: 'relative' }}>
        <div>
            <button className='closeButton'>
                     Close
            </button>
          </div>

           <div className='home-content'>
               <div className='home-controls'>
                 <button className='imgButton'>
                        Work
                   </button>
                  <button className='imgButton'>
                       Break
                   </button>

                </div>
          <p>You can do it!</p>
          <h1 className='homeTimer'>25:00</h1>
                  <button className='startButton'>
                      Start
                   </button>
            </div>
     </div>
  );
}

export default App;
