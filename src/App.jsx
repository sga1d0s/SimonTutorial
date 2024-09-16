import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import simon from './assets/sounds/sprite.mp3';
import './App.css'

function App() {

  // declarar referencias al DOM de colores
  const blueRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);
  const redRef = useRef(null);

  // iniciar librería de sonido
  const [play] = useSound(simon, {
    sprite: {
      // declarar 4 sonidos con inicio del sonido y duración
      one: [0, 500],
      two: [1000, 500],
      three: [2000, 500],
      four: [3000, 500],
      herror: [4000, 500],
    }
  })

  // array de objetos para colores, referencias al DOM y sonidos
  const colors = [
    {
      color: '#faf303',
      ref: yellowRef,
      sound: 'one'
    },
    {
      color: '#030afa',
      ref: 'blueRef',
      sound: 'two'
    },
    {
      color: '#fa0e03',
      ref: 'redRef',
      sound: 'three'
    },
    {
      color: '#0afa03',
      ref: 'greenRef'
    }
  ]

  // constantes para cálculos y velocidad inicial
  const minNumber = 0;
  const maxNumber = 0;
  const speedGame = 400;

  // HOOKS DE ESTADO
  // almacena secuentia que genera el juego
  const [sequence, setSequence] = useState([]);
  //
  const [currentGame, setCurrentGame] = useState([]);
  const [isAllowedToPlay, setIsAllowedToPlay] = useState(false);
  const [speed, setSpeed] = useState(speedGame);
  const [turn, setTurn] = useState(0);
  const [pulses, setPulses] = useState(0);
  const [succes, setSuccess] = useState(0);
  const [isGameOn, set] = usestate(false);

  return (
    <>
      <h1>jUEGO SIMON</h1>
    </>
  )
}

export default App
