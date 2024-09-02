  import React, { useEffect } from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import axios from 'axios';
  import { useDispatch } from 'react-redux';
  import ErrorPage from './Components/Error';
  import Header from './Components/Header/Header';
  import Footer from './Components/Footer/Footer';
  import Achievements from './Components/Achievements/Achievement';
  import Home from './Components/Home/Home';
  import About from './Components/About/About';
  import Contact from './Components/Contact/Contact';
  import Projects from './Components/Projects/Projects';
  import { setPortfolioData } from './redux/rootslice';
  import Admin from './Components/Admin/Admin';
  import LoginForm from './Components/LoginForm/LoginForm'
  import ProtectedRoute from './Components/LoginForm/ProtectedRoute';
  const App = () => {
    const dispatch = useDispatch();

    const getPortfolioData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`);
        dispatch(setPortfolioData(response.data));
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    useEffect(() => {
      getPortfolioData();
    }, [dispatch]);

    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/achivements" element={<Achievements />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  };

  export default App;
