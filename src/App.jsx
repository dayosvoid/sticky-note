import { useSelector } from 'react-redux'
import './App.css'
import CreateNote from './component/CreateNote'
import NotePage from './page/NotePage'
import { showModel } from './redux/CreateModel'
import { useState } from 'react'
import { IoSunnySharp } from 'react-icons/io5'
import { FaMoon } from 'react-icons/fa'

function App() {
  const [theme,setTheme] = useState("light")
  const {isOpen} = useSelector(state => state.modal)

  const handleToggle = ()=>{
    setTheme((prev)=>(prev === "light" ? "dark" : "light"))
    console.log(theme)
  }
  return (
    <div id={theme} className='relative sticky'>
      <NotePage/>
      {isOpen && <CreateNote/>}
      <button onClick={()=>{handleToggle()}} className='fixed bottom-6 right-6 z-50 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95'>
        {theme === "light" ?<FaMoon size={24}/>: <IoSunnySharp size={24} /> }
      </button>
    </div>
  )
}

export default App
