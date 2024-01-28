import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React, useEffect } from 'react';
import Intro from "./intro";
import Login from "./login";
import Signup from "./signup";
import AddProduct from './add';
import UpdateProduct from "./update";
import ViewProducts from './view';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    document.title = 'Browsify';
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/view" element={<ViewProducts />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:productNumber" element={<UpdateProduct />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;