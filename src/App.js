import React from 'react';
import Pricing from './view/pricing/Pricing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './view/pricing/Details';
import movieData from './movie.json';

const App = () => {

  const { movies } = movieData;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pricing />} />
        <Route path='/details/:title' element={<MovieDetails movies={movies} />} />
        <Route path='*' element={<>404 - Page Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

