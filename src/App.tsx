import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Genres from './pages/Genres';
import GenrePage from './pages/GenrePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genre/:id" element={<GenrePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;