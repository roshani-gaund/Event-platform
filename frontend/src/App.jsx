import {  Routes, Route } from "react-router-dom";
import Events from "./Event.jsx";
import Dashboard from "./Dashboard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./AdminLogin.jsx";

function App() {

  return (
   
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={ <Dashboard />} />
      </Routes>
    
  );
}

export default App;
