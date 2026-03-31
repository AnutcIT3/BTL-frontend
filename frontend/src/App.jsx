import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu/Nav';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import KhuyenMai from './components/KhuyenMai/Khuyenmai';
import Phim from './components/Phim/Phim';
import './App.css';
import Movie from './components/Movie/Movie';
import UserProfile from './components/Userservices/UserProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import LichChieu from './components/LichChieu/LichChieu';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/Rap-phim" element={
          <>
            <Hero />
            <Movie/>
          </>
        } />
        <Route path="/phim" element={<Phim />} />
        <Route path="/khuyen-mai" element={<KhuyenMai />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/lich-chieu' element={<LichChieu/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;









