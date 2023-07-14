import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainApp from './pages/MainApp';


const App = () => {
    return (

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/app" element={<MainApp />} />
            </Routes>

    );
};


export default App;
