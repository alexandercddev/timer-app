import { useState, useEffect } from 'react'
import harry from './assets/harry-styles.png'
import love from './assets/harry-styles-love.png'
import './App.css';
import { getRemainingTimeUntil } from './countdown-utils';
import ReactConfetti from 'react-confetti';

const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00'
}

function App({ countdown = new Date('2022-11-25').getTime() }) {  
  const [remainingTime, seTremainingTime] = useState(defaultRemainingTime);
  const [confetti, setConfetti] = useState(false);

  const imgUrl = new URL('./assets/harry-styles.png', import.meta.url).href

  const updateRemainingTime = (countdown) => {
    const init = getRemainingTimeUntil(countdown);
    seTremainingTime(init);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdown);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [])
  
  return (
    <div className="App">
      { (
        (
          remainingTime.days === 0 &&
          remainingTime.hours === 0 &&
          remainingTime.minutes === 0 &&
          remainingTime.seconds <= 0 
        ) || 
        confetti
      ) &&
        <ReactConfetti />
      } 
      <div> 
        <a onClick={() => {
          setConfetti(!confetti)
        }}>
          <img src={imgUrl} className="logo" alt="Harry Styles" />
        </a>
      </div>
      <h1>Harry Styles</h1>
      <div className="card">
        <div className='card-content'>
          <span className='card-title'>
            días
          </span>
          <span className='card-data'>
            {remainingTime.days}
          </span>
        </div>  
        <div className='card-content'>
          <span className='card-title'>
            Horas
          </span>
          <span className='card-data'>
            {remainingTime.hours}
          </span>
        </div>  
        <div className='card-content'>
          <span className='card-title'>
            Minutos
          </span>
          <span className='card-data'>
            {remainingTime.minutes}
          </span>
        </div>  
        <div className='card-content'>
          <span className='card-title'>
            Segundos
          </span>
          <span className='card-data'>
            {remainingTime.seconds}
          </span>
        </div>   
      </div>  
    </div>
  )
}

export default App
