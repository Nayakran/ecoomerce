import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Cart from "./pages/Cart/Cart"
import { Suspense,lazy } from 'react';

const Home = lazy(()=>import ('./pages/Home/Home'));
const Cart = lazy(()=>import ('./pages/Cart/Cart'));


function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading.....</div>}>
    <Routes>
      <Route path="/cart" element={<Cart/>} />
      <Route path="/" element={<Home />} />
    </Routes>
    </Suspense>
  </BrowserRouter>
  );
}

export default App;
