import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {


    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // a snippet code run on the based of specific condition
    useEffect(() => {
        // if [] , run once when the row loads, and dont run it again
        // if variable , run once when row loads and runs everytime variable changes
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // here we get basseUrl/fetchUrl=>requests haru
            setMovies(request.data.results);
            console.log(request)
            return request;
            



        }
       
        fetchData();
    }, [fetchUrl]);
    // here fetchUrl is outside the block 
    // whenever use useEffect and we use any variable that is being pulled out have to include here inside [] 
    // because it is being dependent on that variable it is a dependency if u dodnt include then it would not rerender 


    const opts ={
        height: "390",
        width:"100%",
        playerVars :{
            autoplay:1,

        },
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name || movie?.original_title || movie?.title || "")
            .then(url =>{
                // in order to get the video id we do this
                // https://www.youtube.com/watch?v=-cMqr9HpZ-Y&t=7029s&ab_channel=CleverProgrammer
                const urlParams = new URLSearchParams(new URL(url).search);
                // this down code gives after v 
                // urlParams.get('t') then this gives  7029s&ab_channel=CleverProgrammer from url
                setTrailerUrl(urlParams.get('v'));

            })
            .catch(error => console.log(error));
        }
    }
    return (
        <div className="row">
            {/* title */}
            <h1 className="row_title">{title}</h1>

            {/* container bunch of images */}
            <div className="row_posters">
                {/* several row posters */}
                {movies.map(movie => (
                    // in react if u r working with huge data we need to pass a uniqu key so that if anything changes then then it uses that key 
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}


        </div>
    );
}
export default Row;