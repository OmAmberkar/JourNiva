import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 animate-bounce'>
        Animate Bounce

      </div>
        
    </>
  )
}

export default App
