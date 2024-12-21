import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import Login from './pages/Login';
import Medications from './pages/Medications';
import Dashboard from './pages/Dashboard';
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <Router>
      <CssBaseline />

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Navbar */}
        <Navbar />

        {/* Main content area */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Container component="main" sx={{ flex: 1, paddingTop: 3, paddingBottom: 3 }}>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default App;