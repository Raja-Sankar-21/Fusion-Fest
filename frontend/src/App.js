import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import VendorRegister from './pages/VendorRegister';
import Events from './pages/Events';
import Help from './pages/Help';
import Favourites from './pages/Favourites';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Events/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/vendor/register" element={<VendorRegister/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/favourites" element={<Favourites/>} />
        <Route path="/bookings" element={<Bookings/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
