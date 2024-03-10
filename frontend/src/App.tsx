import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
import Navbar from './components/Navbar'
import {Form} from './pages/Form'
function App() {

  return (
    <>
    <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App