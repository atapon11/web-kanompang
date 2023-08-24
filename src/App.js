import React from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom'; 
import Shop from './components/Shop';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
   
      </Routes>
    </BrowserRouter>
  );
}


export default App;
