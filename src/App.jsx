
import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import simon from './assets/sounds/sprite.mp3';
import './App.css'

function App() {

  // declarar referencias al DOM de colores
  const yellowRef = useRef(null);
  const blueRef = useRef(null);
  const redRef = useRef(null);
  const greenRef = useRef(null);

  // iniciar librería de sonido
  const [play] = useSound(simon, {
    sprite: {
      // declarar 4 sonidos con inicio del sonido y duración
      one: [0, 500],
      two: [1000, 500],
      three: [2000, 500],
      four: [3000, 500],
      error: [4000, 500],
    }
  })

  // declaramos el array de objetos con sus colores, referencias al DOM, y sonidos
  const colors = [
    {
      color: '#FAF303',
      ref: yellowRef,
      sound: 'one'
    },
    {
      color: '#030AFA',
      ref: blueRef,
      sound: 'two'
    },
    {
      color: '#FA0E03',
      ref: redRef,
      sound: 'three'
    },
    {
      color: '#0AFA03',
      ref: greenRef,
      sound: 'four'
    },
  ];
  // constantes para cálculos y velocidad inicial
  const minNumber = 0;
  const maxNumber = 3;
  const speedGame = 400;

  // HOOKS DE ESTADO
  // almacena secuentia que genera el juego
  const [sequence, setSequence] = useState([]);
  // almacena la secuencia que va ejecutando el jugador
  const [currentGame, setCurrentGame] = useState([]);
  // bool para permir pulsar tecla o no
  const [isAllowedToPlay, setIsAllowedToPlay] = useState(false);
  // almacena los cambios progresivos de velocidad
  const [speed, setSpeed] = useState(speedGame);
  // almacena numero de turno que se está jugando
  const [turn, setTurn] = useState(0);
  // almacena el número de pulsaciones
  const [pulses, setPulses] = useState(0);
  // almacena el número de aciertos
  const [success, setSuccess] = useState(0);
  // si el juego debe iniciarse o no
  const [isGameOn, setIsGameOn] = useState(false);

  // setear el estado a true y genera random number
  const initGame = () => {
    randomNumber();
    setIsGameOn(true);
  }

  // generar número random
  const randomNumber = () => {
    setIsAllowedToPlay(false);
    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    // seteamos en sequence el número random
    setSequence([...sequence, randomNumber]);
    // sumamos 1 al turno
    setTurn(turn + 1);
  }

  const handleClick = (index) => {
    if (isAllowedToPlay) {
      // ejecutamos play de id de colors[index]
      play({ id: colors[index].sound })
      // modificamos el estilo
      colors[index].ref.current.style.opacity = (1);
      colors[index].ref.current.style.scale = (0.9);

      setTimeout(() => {
        colors[index].ref.current.style.opacity = (0.5);
        colors[index].ref.current.style.scale = (1);
        setCurrentGame([...currentGame, index]);
        setPulses(pulses + 1);
      }, speed / 2);
    }
  }

  useEffect(() => {
    if (pulses > 0) {
      if (Number(sequence[pulses - 1]) === Number(currentGame[pulses - 1])) {
        setSuccess(success + 1)
      } else {
        const index = sequence[pulses - 1]
        if (index) colors[index].ref.current.style.opacity = (1);
        play({ id: 'error' })
        setTimeout(() => {
          if (index) colors[index].ref.current.style.opacity = (0.5);
          setIsGameOn(false);
        }, speed * 2);
      }
    }
  }, [pulses])

    // useEffect ISGAMEON
  useEffect(() => {
    if (!isGameOn) {
      setSequence([]);
      setCurrentGame([]);
      setIsAllowedToPlay(false);
      setSpeed(speedGame);
      setSuccess(0);
      setPulses(0);
      setTurn(0);
    }

  }, [isGameOn])

  // useEffect SUCCESS
  useEffect(() => {
    if (success === sequence.length && success > 0) {
      setTimeout(() => {
        setSuccess(0);
        setPulses(0);
        setCurrentGame([]);
        randomNumber();
      }, 500);
    }
  }, [success])

  // useEffect SEQUENCE
  useEffect(() => {
    if (!isAllowedToPlay) {
      sequence.map((item, index) => {
        setTimeout(() => {
          play({ id: colors[item].sound })
          colors[item].ref.current.style.opacity = (1);
          setTimeout(() => {
            colors[item].ref.current.style.opacity = (0.5);
          }, speed / 2);
        }, speed * index);
      })
    }
    // seteamos a true para poder clickar
    setIsAllowedToPlay(true)
  }, [sequence])


  return (
    <>
      {
        isGameOn
          ?
          <>
            {/* mostramos si GAMEON es true */}
            <div className='header'>
              <h1>Turn</h1>
            </div>
            <div className='container'>
              {/* recorrer el array y crear div por color */}
              {colors.map((item, index) => {
                return (
                  <div
                    key={index}
                    ref={item.ref}
                    className={`pad pad-${index}`}
                    style={{ backgroundColor: `${item.color}`, opacity: 0.6 }}
                    onClick={() => handleClick(index)}
                  >
                  </div>
                )
              })}
            </div>
          </>
          :
          <>
            {/* mostramos si GAMEON es false */}
            <div className='header'>
              <h1>SUPER SIMON</h1>
            </div>
            <button onClick={initGame}>START</button>
          </>
      }
    </>
  )
}

export default App
