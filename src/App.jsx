import { useState } from 'react'
import './App.css'
import Climate from './Climate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
      <Climate />
    </div>
    </>
  )
}

export default App
