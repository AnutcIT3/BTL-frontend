import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu/Nav';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import KhuyenMai from './pages/KhuyenMai/Khuyenmai';
import Phim from './pages/Phim/Phim';
import './App.css';
import Movie from './pages/Movie/Movie';
import UserProfile from './pages/Userservices/UserProfile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import LichChieu from './pages/LichChieu/LichChieu';
import TicketDetail from './pages/TicketDetailPage/TicketDetailPage';
import PromotionSection from './pages/PromotionSelection/PromotionSelection';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Movie/>
          </>
        } />
        <Route path="/phim" element={<Phim />} />
        <Route path="/khuyen-mai" element={<KhuyenMai/>} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/lich-chieu' element={<LichChieu/>}/>
        <Route path='/gia-ve' element={<TicketDetail/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;









