import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import { useThemeStore } from './store/useThemeStore'
import Navbar from './component/Navbar'
import SignIn from './pages/SignIn'
import { useTodoStore } from './store/useTodoStore'
import { Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
const App = () => {
  const { checkAuth, user, isAuth } = useTodoStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <div className=''>
      <Routes>
        <Route path='/' index element={isAuth ? <Dashboard /> : <Navigate to={"/signup"} replace />} />
        <Route path='/signup' element={isAuth ? <Navigate to={"/"} replace /> : <SignUp />} />
        <Route path='/signin' element={isAuth ? <Navigate to={"/"} replace /> : <SignIn />} />
        <Route path='/profile' element={isAuth ? <Profile /> : <SignIn />} />
        <Route path='/logout' />
        <Route path='*' element={<NotFound />} />
        {/* <Route path='/update/:id' /> */}
        {/* <Route path='/delete/:id' /> */}
        {/* <Route path='/resetpassword/:token' /> */}
      </Routes>

    </div>
  )
}

export default App