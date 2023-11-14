const axios = require('axios')
const fs = require('fs')
const jsonRegex = /<script type="application\/ld\+json">(.*?)<\/script>/s
async function getMovieNames (page) {
    try {
        const response = await axios.get(`https://www.rottentomatoes.com/browse/movies_in_theaters/?page=${page}`)
        console.log(`https://www.rottentomatoes.com/browse/movies_in_theaters/?page=${page}`)
        const htmlContent = response.data
        const match = htmlContent.match(jsonRegex)

        if (match && match[1]) {
            const jsonString = match[1]
            const jsonData = JSON.parse(jsonString)

            return { "succ": true, "data": jsonData }
        } else {
            return { "succ": false }
        }
    } catch (error) {
        console.error('An error occurred:', error)
        return { "succ": false }
    }
}
async function getMoviedata (url) {//five_nights_at_freddys
    try {
        const response = await axios.get(`${url}`)
        const htmlContent = response.data
        const match = htmlContent.match(jsonRegex)

        if (match && match[1]) {
            const jsonString = match[1]
            const jsonData = JSON.parse(jsonString)
            return { "succ": true, "data": jsonData }
        } else {
            return { "succ": false }
        }
    } catch (error) {
        console.error('An error occurred:', error)
        return { "succ": false }
    }
}
async function scrapeAll () {
    for (let i = 1; 0 < 1000000; i++) {
        const filewritedata = new Map()
        const data = await getMovieNames(`${i}`)
        if (data.succ) {
            const movies = data.data.itemListElement.itemListElement
            for (const movie of movies) {
                const moviedata = await getMoviedata(movie.url)
                filewritedata.set(`${moviedata.data.name}`, moviedata.data)
                //console.log(`got data for movie ${moviedata.data.name}`)
            }
        } else {
            const existingdata = fs.readFileSync(`moviedata.json`)
            const merged = new Map([...filewritedata, ...existingdata])
            fs.writeFileSync(`moviedata.json`, merged)
            return
        }
    }
}
scrapeAll()
//getMoviedata(`five_nights_at_freddys`)