import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Views/Login';
import Home from "./Views/Home";
import Footer from "./Components/Footer";
import ProtectedRoutes from './Components/ProtectedRoutes';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        
        <Route element={<ProtectedRoutes />}>
        <Route path="/inicio" element={<Home />}/>
        </Route>        
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App