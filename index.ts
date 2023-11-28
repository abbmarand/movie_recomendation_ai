import { PrismaClient } from '@prisma/client'
import pgvector from 'pgvector/utils'
import axios from 'axios'
const prisma = new PrismaClient()


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

async function getclosestmoviebyembedding (rawembedding: any) {
    const result = []
    let items: any
    const embedding = pgvector.toSql(rawembedding)
    items = await prisma.$queryRaw`SELECT id, embedding::text FROM movie ORDER BY embedding <-> ${embedding}::vector LIMIT 5`
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

async function getclosesttvbyembedding (rawembedding: any) {
    const result = []
    let items: any
    const embedding = pgvector.toSql(rawembedding)
    items = await prisma.$queryRaw`SELECT id, embedding::text FROM tv ORDER BY embedding <-> ${embedding}::vector LIMIT 5`
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

async function getclosestmoviebyid (sid: any) {
    let search: any
    search = await prisma.movie.findFirst({//doesnt select embedding
        where: {
            id: sid
        }
    })
    console.log(search)
    if (search) {
        const rawembedding = search.embedding
        console.log(rawembedding)
        const result = []
        let items: any
        const embedding = pgvector.toSql(rawembedding)
        items = await prisma.$queryRaw`SELECT id, embedding::text FROM movie ORDER BY embedding <-> ${embedding}::vector LIMIT 5`
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

async function getclosesttvbyid (sid: any) {
    let search: any
    search = await prisma.tv.findFirst({
        where: {
            id: sid
        }
    })
    if (search) {
        const rawembedding = search.embedding
        const result = []
        let items: any
        const embedding = pgvector.toSql(rawembedding)
        items = await prisma.$queryRaw`SELECT id, embedding::text FROM tv ORDER BY embedding <-> ${embedding}::vector LIMIT 5`
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

async function main () {
    const b = await getclosestmoviebyid(787699)//willy wonka
    console.log(b)
}
//getdata(500)
main()