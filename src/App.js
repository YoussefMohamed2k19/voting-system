import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Form from "./Components/Form";
function App() {

  return (
    <div>
      <div className="container mt-3">
        <Routes>
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
} 

export default App;