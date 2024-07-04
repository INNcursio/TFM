// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import CreateBlogPage from './pages/CreateBlogPage';
import BlogDetails from './pages/BlogDetails';
import { useSelector, useDispatch } from 'react-redux';
import {loadUserFromStorage } from './store/authSlice';
import Loader from './components/common/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const isAuthenticated = useSelector(state => state.auth.user !== null);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);



  return (
    <Router>
      <div className="main-content">
        <NavBar isAuthenticated={isAuthenticated} />
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path ="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
