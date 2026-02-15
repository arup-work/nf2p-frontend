import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter } from 'react-router-dom'
import RouteComponent from './Routes/Index'
import { useDispatch } from 'react-redux'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(initializeAuth());
  })

  return (
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  )
}

export default App
