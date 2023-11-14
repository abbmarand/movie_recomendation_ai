require('dotenv').config()
const fs = require('fs').promises
const axios = require('axios')
let moviedata = {}
let tvdata = {}
const themoviedbkey = process.env.API_KEY
async function main (len) {
    for (let i = 1; i < len + 1; i++) {
        console.log(`${i}/${len}`)
        const moviearr = await getMovieList(i)
        const tvarr = await getTVList(i)
        for (const movie of moviearr) {
            moviedata[movie.title] = movie
        }
        for (const tv of tvarr) {
            tvdata[tv.name] = tv
        }
    }
    await fs.writeFile("movie.json", JSON.stringify(moviedata))  // Use fs.promises.writeFile
    await fs.writeFile("tv.json", JSON.stringify(tvdata))  // Use fs.promises.writeFile
}
async function getMovieList (page) {
    const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${themoviedbkey}&page=${page}`)
    return data.data.results
}
async function getTVList (page) {
    const data = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${themoviedbkey}&page=${page}`)
    return data.data.results
}
main(100)