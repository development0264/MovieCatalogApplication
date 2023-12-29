import { Box, Button, Drawer, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import movieData from '../../movie.json';

export const SideBar = ({ drawerOpen, onClose,setFinalNewMovieValue,setFilteredMovies }) => {

    const { movies } = movieData;

    const [newMovieValue, setNewMovieValue] = useState({
        genre: '',
        releaseYear: '',
    });

    const handleFilter = () => {
        setFinalNewMovieValue(newMovieValue)
        onClose();
    };
    const handleResetFilters = () => {
        setNewMovieValue('');
        setFilteredMovies(movies);
    };

    return (
        <div>
            <Drawer anchor="left" open={drawerOpen} onClose={onClose} PaperProps={{ sx: { width: 300 } }}>
                <Box
                    sx={{ width: 250, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    role="presentation"
                >
                    <Typography variant="h10" sx={{ marginLeft: -16, fontSize: 15 }}>Filter by Genre :</Typography>
                    <Select
                        value={newMovieValue.genre === '' ? 'All Genres' : newMovieValue.genre}
                        onChange={(e) => setNewMovieValue({...newMovieValue, genre: e.target.value})}
                        sx={{ width: 250, height: 35, marginTop: 1, marginRight: -2 }}
                    >
                        <MenuItem value="">All Genres</MenuItem>
                        <MenuItem value="Animation">Animation</MenuItem>
                        <MenuItem value="Racing">Racing</MenuItem>
                        <MenuItem value="Action">Action</MenuItem>
                        <MenuItem value="Adventure">Adventure</MenuItem>
                        <MenuItem value="Horror">Horror</MenuItem>
                        <MenuItem value="Suspense">Suspense</MenuItem>
                    </Select>
                    <Typography variant="h6" sx={{ marginLeft: -10, fontSize: 15, marginTop: 2 }}>Filter by Release Year :</Typography>
                    <Select
                        value={newMovieValue.releaseYear === '' ? 'All Genres' : newMovieValue.releaseYear}
                        onChange={(e) =>
                            setNewMovieValue({...newMovieValue, releaseYear: e.target.value})
                        }
                        sx={{ width: 250, height: 35, marginTop: 1, marginRight: -2 }}
                    >
                        <MenuItem value="">All Years</MenuItem>
                        <MenuItem value="2015">2015</MenuItem>
                        <MenuItem value="2018">2018</MenuItem>
                        <MenuItem value="2019">2019</MenuItem>
                        <MenuItem value="2020">2020</MenuItem>
                        <MenuItem value="2022">2022</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={handleFilter} sx={{ marginTop: 2, width: '45%', marginRight: 12.7, height: 35, color: 'white', backgroundColor: '#2a52be' }}  >
                        Apply
                    </Button>
                    <Button variant="contained" onClick={handleResetFilters} sx={{ marginTop: -4.4, width: '45%', marginLeft: 17, height: 35, color: 'white', backgroundColor: '#2a52be' }}>
                        Reset
                    </Button>
                </Box>
            </Drawer>
        </div>
    )
}
