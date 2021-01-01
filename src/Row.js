import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl }) {


    const [movies, setMovies] = useState([]);
    // a snippet code run on the based of specific condition
    useEffect(() => {
        // if [] , run once when the row loads, and dont run it again
        // if variable , run once when row loads and runs everytime variable changes
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // here we get basseUrl/fetchUrl=>requests haru
            setMovies(request.data.results);
            return request;



        }
        fetchData();
    }, [fetchUrl]);
    // here fetchUrl is outside the block 
    // whenever use useEffect and we use any variable that is being pulled out have to include here inside [] 
    // because it is being dependent on that variable it is a dependency if u dodnt include then it would not rerender 

    return (
        <div className="row">
            {/* title */}
            <h1>{title}</h1>

            {/* container bunch of images */}
            <div className="row_posters">
                {/* several row posters */}
                {movies.map(movie => (
                    // in react if u r working with huge data we need to pass a uniqu key so that if anything changes then then it uses that key 
                    <img
                        className= "row_poster"
                        src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                ))}

            </div>



        </div>
    )
}
export default Row