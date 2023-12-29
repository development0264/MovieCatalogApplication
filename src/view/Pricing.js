import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { CardMedia, Pagination, TextField } from '@mui/material';
import movieData from '../movie.json';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../layout/Header';
import { SideBar } from '../components/SideBar/SideBar';

const { movies } = movieData;

const defaultTheme = createTheme();
export default function Pricing() {
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [genresFilter, setGenresFilter] = useState('');
  const [releaseYearsFilter, setReleaseYearsFilter] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchMovie, setSearchMovie] = useState('');
  const [newFinalMovieValue, setFinalNewMovieValue] = useState({});
  const handleMovieDetails = (card) => {
    navigate(`/details/${card.id}`);
  };

  useEffect(() => {
    let filtered = movies;
    if (newFinalMovieValue.genre) {
      filtered = filtered.filter((movie) => movie.Genre === String(newFinalMovieValue.genre));
    }
    if (newFinalMovieValue.releaseYear) {
      filtered = filtered.filter((movie) => movie.releaseYear === String(newFinalMovieValue.releaseYear));
    }
    if (searchMovie) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchMovie)
      );
    }
    setFilteredMovies(filtered);
  },[newFinalMovieValue,searchMovie])

  const handleSearch = (e) => {
    const seachData = e.target.value.toLowerCase();
    setSearchMovie(seachData);
    setPage(1);
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
      <Header OpenSidebar={setDrawerOpen} filteredData={filteredMovies.length} />
      <SideBar drawerOpen={isDrawerOpen} onClose={setDrawerOpen}
        genresFilter={genresFilter} releaseYearsFilter={releaseYearsFilter}
        setGenresFilter={setGenresFilter} setReleaseYearsFilter={setReleaseYearsFilter}
        setFinalNewMovieValue={setFinalNewMovieValue} 
        setFilteredMovies={setFilteredMovies}/>
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
        <Grid item md={12}>
          <TextField
            label="Search"
            variant="outlined"
            margin="normal"
            size='small'
            value={searchMovie}
            onChange={handleSearch}
            sx={{ marginTop: 0, marginBottom: 3, width: 250, marginLeft: 75 }}
          />
        </Grid>
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
                      titleTypographyProps={{ align: 'center', fontWeight: 'bold', fontSize: 20, }}
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
                      <Typography component="h2" variant="h5" color="text.primary" align='center'>
                        {movie.releaseYear}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="contained" onClick={() => handleMovieDetails(movie)} sx={{ color: 'white', backgroundColor: '#2a52be' }}>
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
                variant="contained"
                color="primary"
              />
            </Box>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}