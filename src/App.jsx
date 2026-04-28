import { useSelector } from 'react-redux'
import './App.css'
import CreateNote from './component/CreateNote'
import NotePage from './page/NotePage'
import { showModel } from './redux/CreateModel'

function App() {
  const {isOpen} = useSelector(state => state.modal)
  return (
    <>
      <NotePage/>
      {isOpen && <CreateNote/>}
    </>
  )
}

export default App
