import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import pgvector from 'pgvector/utils'
import axios from 'axios'
import express from 'express'
import cors from 'cors'
const newsapi = process.env.NEWS
const rapid = process.env.RAPID
const prisma = new PrismaClient()
const app = express()
const port = 4000
let totalrequests: number = 0
app.use(express.json())
app.use(cors())
app.listen(port, () => {
    console.log(`server online on port ${port}`)
})

app.use((req, res, next) => {
    totalrequests++
    console.log(`${new Date()} (${totalrequests}) (${req.url})`)
    next()
})


async function embedMovie (page: Number) {
    try {
        const data = await axios.post(`http://127.0.0.1:5000/getmovie`, {
            "number": page
        })
        const resbody = data.data.result
        for (const data of resbody) {
            const id = data.id

            const embedding = pgvector.toSql(data.embedding)
            const existing = await prisma.movie.findFirst({
                where: {
                    id: data.id,
                },
            })
            if (existing) {
                await prisma.$executeRaw`INSERT INTO movie (id, embedding) VALUES (${data.id}, ${embedding}::vector) ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding`

                await prisma.movie.update({
                    where: {
                        id: id
                    },
                    data: {
                        genre_ids: { set: data.genre_ids },
                        original_language: data.original_language,
                        original_title: data.original_title,
                        overview: data.overview,
                        popularity: data.popularity,
                        poster_path: data.poster_path,
                        release_date: data.release_date,
                        title: data.title,
                        video: data.video,
                        vote_average: data.vote_average,
                        vote_count: data.vote_count,
                        id: data.id,
                    }
                })

            } else {

                await prisma.$executeRaw`INSERT INTO movie (id, embedding) VALUES (${data.id}, ${embedding}::vector)`
                await prisma.movie.update({
                    where: {
                        id: id
                    },
                    data: {
                        genre_ids: { set: data.genre_ids },
                        original_language: data.original_language,
                        original_title: data.original_title,
                        overview: data.overview,
                        popularity: data.popularity,
                        poster_path: data.poster_path,
                        release_date: data.release_date,
                        title: data.title,
                        video: data.video,
                        vote_average: data.vote_average,
                        vote_count: data.vote_count,
                        id: data.id,
                    }
                })
            }
        }
        return
    } catch (error) {
        console.log(error)
    }
}

async function embedTv (page: Number) {
    try {
        const data = await axios.post(`http://127.0.0.1:5000/gettv`, {
            "number": page
        })
        const resbody = data.data.result
        for (const data of resbody) {
            const id = data.id

            const embedding = pgvector.toSql(data.embedding)
            const existing = await prisma.tv.findFirst({
                where: {
                    id: data.id,
                },
            })
            if (existing) {
                await prisma.$executeRaw`INSERT INTO tv (id, embedding) VALUES (${data.id}, ${embedding}::vector) ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding`

                await prisma.tv.update({
                    where: {
                        id: id
                    },
                    data: {
                        first_air_date: data.first_air_date,
                        genre_ids: { set: data.genre_ids },
                        name: data.name,
                        origin_country: { set: data.origin_country },
                        original_language: data.original_language,
                        original_name: data.original_name,
                        overview: data.overview,
                        popularity: data.popularity,
                        poster_path: data.poster_path,
                        vote_average: data.vote_average,
                        vote_count: data.vote_count,
                        id: data.id,
                    }

                })
            } else {
                await prisma.$executeRaw`INSERT INTO tv (id, embedding) VALUES (${data.id}, ${embedding}::vector)`
                await prisma.tv.update({
                    where: {
                        id: id
                    },
                    data: {
                        first_air_date: data.first_air_date,
                        genre_ids: { set: data.genre_ids },
                        name: data.name,
                        origin_country: { set: data.origin_country },
                        original_language: data.original_language,
                        original_name: data.original_name,
                        overview: data.overview,
                        popularity: data.popularity,
                        poster_path: data.poster_path,
                        vote_average: data.vote_average,
                        vote_count: data.vote_count,
                        id: data.id,
                    }
                })

            }
        } return
    } catch (error) {
        console.log(error)
    }


}

async function getclosestmoviebyembedding (rawembedding: any, limit: any) {
    const result = []
    let items: any
    const embedding = pgvector.toSql(rawembedding)
    items = await prisma.$queryRaw`SELECT id, embedding::text FROM movie ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
    for (const item of items) {
        const closestdata = await prisma.movie.findFirst({
            where: {
                id: item.id
            },
        })
        result.push(closestdata)
    }
    return result
}

async function getclosesttvbyembedding (rawembedding: any, limit: any) {
    const result = []
    let items: any
    const embedding = pgvector.toSql(rawembedding)
    items = await prisma.$queryRaw`SELECT id, embedding::text FROM tv ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
    for (const item of items) {
        const closestdata = await prisma.tv.findFirst({
            where: {
                id: item.id
            },
        })
        result.push(closestdata)
    }

    return result
}

async function getclosestmoviebyid (sid: any, limit: any) {
    let search: any
    search = await prisma.$queryRaw`SELECT id, embedding::text FROM movie WHERE id = ${sid}`
    if (!search[0]) {
        search = await prisma.$queryRaw`SELECT id, embedding::text FROM tv WHERE id = ${sid}`
    }
    if (search) {
        const rawembedding = JSON.parse(search[0].embedding)
        const result = []
        let items: any
        const embedding = pgvector.toSql(rawembedding)
        items = await prisma.$queryRaw`SELECT id, embedding::text FROM movie ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
        for (const item of items) {
            const closestdata = await prisma.movie.findFirst({
                where: {
                    id: item.id
                },
            })
            result.push(closestdata)
        }
        return result
    } else {
        return []
    }
}

async function getclosesttvbyid (sid: any, limit: any) {
    let search: any
    search = await prisma.$queryRaw`SELECT id, embedding::text FROM tv WHERE id = ${sid}`
    if (!search[0]) {
        search = await prisma.$queryRaw`SELECT id, embedding::text FROM movie WHERE id = ${sid}`
    }
    if (search) {
        const rawembedding = JSON.parse(search[0].embedding)
        const result = []
        let items: any
        const embedding = pgvector.toSql(rawembedding)
        items = await prisma.$queryRaw`SELECT id, embedding::text FROM tv ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
        for (const item of items) {
            const closestdata = await prisma.tv.findFirst({
                where: {
                    id: item.id
                },
            })
            result.push(closestdata)
        }
        return result
    } else {
        return []
    }
}

async function getclosestmoviebyidfromtv (sid: any, limit: any) {
    let search: any
    search = await prisma.$queryRaw`SELECT id, embedding::text FROM tv WHERE id = ${sid}`
    if (!search[0]) {
        search = await prisma.$queryRaw`SELECT id, embedding::text FROM movie WHERE id = ${sid}`
    }
    if (search) {
        const rawembedding = JSON.parse(search[0].embedding)
        const result = []
        let items: any
        const embedding = pgvector.toSql(rawembedding)
        items = await prisma.$queryRaw`SELECT id, embedding::text FROM movie ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
        for (const item of items) {
            const closestdata = await prisma.movie.findFirst({
                where: {
                    id: item.id
                },
            })
            result.push(closestdata)
        }
        return result
    } else {
        return []
    }
}


async function getclosesttvbyidfrommovie (sid: any, limit: any) {
    let search: any
    search = await prisma.$queryRaw`SELECT id, embedding::text FROM movie WHERE id = ${sid}`
    if (!search[0]) {
        search = await prisma.$queryRaw`SELECT id, embedding::text FROM tv WHERE id = ${sid}`
    }
    if (search) {
        const rawembedding = JSON.parse(search[0].embedding)
        const result = []
        let items: any
        const embedding = pgvector.toSql(rawembedding)
        items = await prisma.$queryRaw`SELECT id, embedding::text FROM tv ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
        for (const item of items) {
            const closestdata = await prisma.tv.findFirst({
                where: {
                    id: item.id
                },
            })
            result.push(closestdata)
        }
        return result
    } else {
        return []
    }
}

//update the database WARNING: will erase everything and take aprox 1 hour to get new data
async function getdata (pages: any) {
    const rows = await prisma.item.count()
    console.log(`deleting: ${rows}`)
    await prisma.tv.deleteMany()
    await prisma.movie.deleteMany()
    for (let i = 1; i < pages; i++) {

        let start = Date.now()
        await embedMovie(i)
        await embedTv(i)
        let end = Date.now()
        console.log(`done page: ${i} in ${((end - start) / 1000).toFixed(3)} seconds`)
    }
}

//
async function getclosest (embedding: any, limit: any) {
    try {
        const tv = await getclosesttvbyembedding(embedding[0], limit)
        const mov = await getclosestmoviebyembedding(embedding[0], limit)
        return { tv, mov }
    } catch (error) {
        console.log(error)
        return { tv: {}, mov: {} }
    }

}

//browse, not used
app.get('/browse', async (req: any, res: any) => {
    try {
        var avg = parseFloat(req.query.avg)
        var count = parseInt(req.query.count)
        const movies = await prisma.movie.findMany({
            where: { vote_average: { gt: avg }, vote_count: { gt: count } },
            orderBy: { popularity: "desc" },
            take: 10
        })
        res.send(movies)
    } catch (e) {
        console.log(e)
        res.send("error")
    }

})


//find closest embeddings for movies/tv by id of a movie/tv
app.get('/getclosestbyid', async (req: any, res: any) => {
    try {
        var id = req.query.id
        const movies = await getclosestmoviebyid(id, 4)
        res.send({ movies })
    } catch (e) {
        res.error({ e })
        console.log(e)
    }

})

//generate an embedding from the python server by description and get the 5 closest ones
app.post('/generateandget', async (req: any, res: any) => {
    try {
        const desc = req.body.desc
        const limit = req.body.limit
        const embedding = await axios.post(`http://127.0.0.1:5000/gen`, { desc })
        const rec = await getclosest(embedding.data.result, limit)
        res.send({ rec })
    } catch (e) {
        res.error({ e })
        console.log(e)
    }

})


app.post('/getbyid', async (req: any, res: any) => {
    try {
        const id = req.body.id
        const limit = req.body.limit
        const type = req.body.type
        let movies
        let tv
        if (type !== "tv") {
            tv = await getclosesttvbyidfrommovie(id, limit)
            movies = await getclosestmoviebyid(id, limit)
        } else {
            movies = await getclosestmoviebyidfromtv(id, limit)
            tv = await getclosesttvbyid(id, limit)
        }

        res.send({ movies, tv })
    } catch (e) {
        res.error({ e })
        console.log(e)
    }

})


//used to get news for recomendations based on them
app.post('/news', async (req: any, res: any) => {
    try {
        const result = []
        const country = req.body.country
        const lang = req.body.lang
        const ans = await axios.get(`https://newsdata.io/api/1/news?apikey=${newsapi}&language=${lang}`)
        for (let i = 0; i < ans.data.results.length; i++) {
            let article = ans.data.results[i]
            if (article.language === "swedish" || article.language === "german" || article.language === "hindi") {
                const trans = await translate(lang, article.description) // translate the description as the embeddings model isn't multi lingual
                article.trans = trans
                result.push(article)
            } else {
                result.push(article)
            }

        }


        res.send({ articles: result })

    } catch (e) {
        res.error({ e })
        console.log(e)
    }

})

//used to translate movie descriptions as the AI model is only for english
async function translate (lang: string, text: string) {
    try {
        const options = {
            method: 'GET',
            url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
            params: {
                langpair: `${lang}|en`,//input language to english
                q: text,
                mt: '1',
                onlyprivate: '0',
                de: 'a@b.c'
            },
            headers: {
                'X-RapidAPI-Key': rapid,
                'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
            }
        }
        const response = await axios.request(options)
        return response.data.responseData.translatedText
    } catch (e) {
        console.log(e)
    }
}

//used when clicking a movie/series in the UI
app.get('/view', async (req: any, res: any) => {
    try {
        const id = parseInt(req.query.id)
        let selected
        selected = await prisma.movie.findFirst({ where: { id: id } })
        if (!selected) {
            selected = await prisma.tv.findFirst({ where: { id: id } })
        }
        res.send({ selected })
    } catch (e) {
        res.error({ e })
        console.log(e)
    }

})