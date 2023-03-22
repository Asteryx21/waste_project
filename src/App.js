import React, {useState} from 'react';
import Map from './Map';
import Modal from "./Modal";
import Home from "./Home";
import {Route, Routes} from 'react-router-dom';

export default function App() {

  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Map'
        element={<Map onOpen={handleOpen} setSelectedCountry={setSelectedCountry} />}
        />
      </Routes>
      <Modal show={show} onClose={handleClose} selectedCountry={selectedCountry} />
    </>
  )
}
