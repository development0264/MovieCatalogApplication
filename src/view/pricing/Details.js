import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../layout/Header";

const MovieDetails = ({ movies }) => {
    const { title } = useParams();
    const navigate = useNavigate();

    const selectedMovie = movies.find((movie) => movie.title === title);

    if (!selectedMovie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <Header />

            <Typography variant="h6" sx={{ mt: 2, fontSize: 50, fontWeight: 'bold', marginLeft: '150px' }} >
                {selectedMovie.title}
            </Typography>
            <Grid sx={{ display: 'flex' }} item xs={12}>
                <Grid item xs={6}>
                    <img src={selectedMovie.ImageURL} alt={selectedMovie.title} width="500" style={{ marginLeft: '10px', display: 'block', marginTop: 10 }} />
                </Grid>
                <Grid sx={{ display: 'flex' }} item xs={6}>
                    <Typography variant="h6" align="center" sx={{ mt: 2, fontSize: 28, fontWeight: 'bold', marginTop: '5px', marginLeft: '150px' }} >
                        {selectedMovie.Genre}
                    </Typography>
                </Grid >
                <Grid>
                    <Typography variant="h6" align="center" sx={{ mt: 2, fontSize: 15, fontWeight: 'bold', marginTop: '65px', marginRight: '160px' }} >
                        {selectedMovie.description}
                    </Typography>
                </Grid>
            </Grid>
        </div >
    );
};
export default MovieDetails;