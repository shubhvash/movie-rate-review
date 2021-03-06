import React from 'react';
import axios from  'axios';
import Feedback from './Feedback.js';
import Navbar from './Navbar.js'
//import './moviePoster.css'
import Review from "./Review.js"

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {movieDetails:{},ratings:{},show:false};
    }

    componentDidMount() {
        axios.get(`/api/movies/ratingandreview/${this.props.match.params.movieId}`)
        .then(response => {
            console.log(response);
            this.setState({
                movieDetails: response.data.movieData, 
                ratings:response.data.ratingsandreviews,
                avgRating: response.data.avgRating
            });
        });
    }


    
    
    render() {
        const image_background = "http://image.tmdb.org/t/p/w780/"+this.state.movieDetails.backdrop_path;
        const image_poster = "http://image.tmdb.org/t/p/w780"+this.state.movieDetails.poster_path;
        var divImage = {
            backgroundImage : 'url(' + image_background + ')'
        };
        console.log(this.state.ratings);
        console.log(image_poster);
        return (
            <>
            {/* <p>{this.state.movieDetails.original_title}</p> */}
            <Navbar/>
            <div className="Movie-Page-Main-Container"  style={divImage}>
                <div className="movie-detail-container">
                    {/* <div className="poster">
                        <img src={movieposter} alt={title}/>
                    </div> */}
                    <div className="poster">
                        <img src={image_poster} alt ="this.state.movieDetails.title"/>
                        {/* <img src={"https://image.tmdb.org/t/p/w780"+this.state.movieDetails.poster_path} alt ="this.state.movieDetails.title"/> */}
                    </div>
                    <div className="description-movie">
                        <p className="title-movie">{this.state.movieDetails.original_title}</p>

                        <div>
                            <p className="plot-heading">PLOT</p>
                            <p>{this.state.movieDetails.overview}</p>
                        </div>

                        <div>
                            <p className="rating-head">RATING</p>
                            <i class="fa fa-star fa_custom fa-2x"></i>
                            <span>{Math.round(this.state.avgRating * 10) / 10}</span>
                        </div>

                        <div>
                            <p className="votes-head">TOTAL VOTES</p>
                            <p>{this.state.movieDetails.vote_count}</p>
                        </div>

                    </div>
                </div>
                <div>
                    <p className="review-header">{this.state.ratings.length>0?"REVIEWS":""}</p>
                </div>
                <div className="feedback-main-conatiner">
                    {this.state.ratings.length>0 && this.state.ratings.map(feedback =>(<Feedback key={feedback.id} feedback={feedback}  />))}
                </div>
                <Review movieId={this.props.match.params.movieId}/>
            </div>
            </>
        );

    }


}

export default MoviePage;