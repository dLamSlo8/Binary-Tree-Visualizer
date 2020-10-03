import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage/MainPage';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="body">
        <Router>
            <Header />
            <MainPage />
            <ContactForm />
        </Router>
    </div>
  );
}

export default App;
