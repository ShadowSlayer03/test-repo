import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    count + 1
  }

  const isEven = count % 2 === 1

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={increment}>
          Count is {count}
        </button>

        {isEven && <p>Count is even</p>}
      </div>

      <p className="read-the-docs">
        You have clicked {count} times
      </p>
    </>
  )
}

export default App
