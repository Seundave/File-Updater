import { useState } from 'react'
import MainPage from './components/mainPage/MainPage'
import UploadList from './components/uploadList/uploadList'
// import Solution from './components/solution-UI/solution'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainPage/>
    <UploadList/>
     {/* <Solution/> */}
     
    </>
  )
}

export default App
