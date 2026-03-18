import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import Hero from './components/Hero'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import './App.css'


function App() {
  return (
    <>
    <NavMenu/>
    <Hero/>
    <MovieList/>
    <Footer/>
    </>
  )
}

export default App







// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import NavMenu from './components/NavMenu'
// import './App.css'
// import Hero from './components/Hero'
// import MovieList from './components/MovieList'
// import Footer from './components/Footer'
// import KhuyenMai from './components/KhuyenMai'

// function App() {
//   return (
//     <>
//     <NavMenu/>
//     <Hero/>
//     <MovieList/>
//     <Footer/>
//     <Route path="/khuyen-mai" element={<KhuyenMai />} />
//     </>
//   )
// }

// export default App
