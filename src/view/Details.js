import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Header } from "../layout/Header";

const MovieDetails = ({ movies }) => {
    const { id } = useParams();
    const selectedMovie = movies.find((movie) => movie.id === id);
    if (!selectedMovie) {
        return <div>Movie not found</div>;
    }
    return (
        <div>
            <Header />
            <Typography variant="h6" sx={{ mt: 2, fontSize: 50, fontWeight: 'bold', marginLeft: '150px' }} >
                {selectedMovie.title}
            </Typography>
            <Grid sx={{ display: 'flex' }} container xs={12}>
                <Grid item xs={6}>
                    <img src={selectedMovie.ImageURL} alt={selectedMovie.title} width="600" style={{ marginLeft: '25px', display: 'block', marginTop: 10 }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: 28, fontWeight: 'bold', marginTop: '5px'}} >
                        {selectedMovie.Genre}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: 15, fontWeight: 'bold', marginTop: '65px', marginRight: '20px' }} >
                        {selectedMovie.description}
                    </Typography>
                </Grid>
            </Grid>
        </div >
    );
};
export default MovieDetails;