import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { CardMedia, Drawer, Pagination } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import movieData from './../../movie.json';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Header } from '../../layout/Header';

const { movies } = movieData;

const defaultTheme = createTheme();
export default function Pricing() {
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [genresFilter, setGenresFilter] = useState('');
  const [releaseYearsFilter, setReleaseYearsFilter] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleMovieDetails = (card) => {
    navigate(`/details/${card.title}`);
  };

  const handleFilter = () => {
    let filtered = movies;
    if (genresFilter) {
      filtered = filtered.filter((movie) => movie.Genre === String(genresFilter));
    }
    if (releaseYearsFilter) {
      filtered = filtered.filter((movie) => movie.releaseYear === String(releaseYearsFilter));
    }
    setFilteredMovies(filtered);
    setDrawerOpen(false);
  };
  const handleResetFilters = () => {
    setGenresFilter('');
    setReleaseYearsFilter('');
    setFilteredMovies(movies);
    setDrawerOpen(false);
  };

  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMovies = filteredMovies.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Header OpenSidebar={setDrawerOpen} />
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 300 } }}>
        <Box
          sx={{ width: 250, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          role="presentation"
        >
          <Typography variant="h10" sx={{ marginLeft: -16, fontSize: 15 }}>Filter by Genre :</Typography>
          <Select
            value={genresFilter === '' ? 'All Genres' : genresFilter}
            onChange={(e) => setGenresFilter(e.target.value === 'All Genres' ? '' : e.target.value)}
            sx={{ width: 250, height: 35, marginTop: 1, marginRight: -2 }}
          >
            <MenuItem value="All Genres">All Genres</MenuItem>
            <MenuItem value="Animation">Animation</MenuItem>
            <MenuItem value="Racing">Racing</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Suspense">Suspense</MenuItem>
          </Select>
          <Typography variant="h6" sx={{ marginLeft: -10, fontSize: 15, marginTop: 2 }}>Filter by Release Year :</Typography>
          <Select
            value={releaseYearsFilter === '' ? 'All Years' : releaseYearsFilter}
            onChange={(e) =>
              setReleaseYearsFilter(e.target.value === 'All Years' ? '' : e.target.value)
            }
            sx={{ width: 250, height: 35, marginTop: 1, marginRight: -2 }}
          >
            <MenuItem value="All Years">All Years</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </Select>
          <Button variant="outlined" onClick={handleFilter} sx={{ marginTop: 2, width: '45%', marginRight: 12.7, height: 35, color: 'white', backgroundColor: '#2a52be' }}  >
            Apply
          </Button>
          <Button variant="outlined" onClick={handleResetFilters} sx={{ marginTop: -4.4, width: '45%', marginLeft: 17, height: 35, color: 'white', backgroundColor: '#2a52be' }}>
            Reset
          </Button>
        </Box>
      </Drawer>
      <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          marginTop={-7}
          fontSize={40}
        >
          Movies List
        </Typography>
        {filteredMovies.length === 0 ? (
          <Typography variant="h5" align="center" color="text.secondary">
            No movies found.
          </Typography>
        ) : (
          <div>
            <Grid container spacing={5} alignItems="flex-end">
              {displayedMovies.map((movie) => (
                <Grid
                  item
                  key={movie.title}
                  xs={12}
                  sm={movie.title === 'Enterprise' ? 12 : 6}
                  md={4}
                >
                  <Card>
                    <CardHeader
                      title={movie.title}
                      titleTypographyProps={{ align: 'center', fontWeight: 'bold', fontSize: 30 }}
                      action={movie.title === 'Pro' ? <StarIcon /> : null}
                      subheaderTypographyProps={{
                        align: 'center',
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardMedia
                      component="img"
                      height="140"
                      image={movie.ImageURL}
                      alt={movie.title}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          mb: 2,
                        }}
                      >
                        <Typography component="h2" variant="h5" color="text.primary">
                          {movie.Genre}
                        </Typography>
                      </Box>
                      <Typography component="h2" variant="h5" color="text.primary" align='center'>
                        {movie.shortDesc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant={movie.buttonVariant} onClick={() => handleMovieDetails(movie)} sx={{ color: 'white', backgroundColor: '#2a52be' }}>
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                color="primary"
              />
            </Box>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}