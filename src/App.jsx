import { useState } from 'react'
import MainPage from './components/mainPage/MainPage'
// import Solution from './components/solution-UI/solution'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainPage/>
     {/* <Solution/> */}
     
    </>
  )
}

export default App
