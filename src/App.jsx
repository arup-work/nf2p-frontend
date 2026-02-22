import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter } from 'react-router-dom'
import RouteComponent from './Routes/Index'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from './Redux/Thunks/AuthThunks'
import Loader from './Components/Loader/Loader'
import Login from './Pages/Auth/Login'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((state) => state.auth);

  // Run auth check as early as possible
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // If still loading → show loader (covers the whole screen)
  // if (isAuthLoading) {
  //   return <Loader />;
  // }

  // Once loading is done → render the app
 return (
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  );
}

export default App
