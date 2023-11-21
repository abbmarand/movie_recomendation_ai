import { PrismaClient } from '@prisma/client'
import pgvector from 'pgvector/utils'
import axios from 'axios'
const prisma = new PrismaClient()
async function embedMovie (page: Number) {
    const data = await axios.post(`http://127.0.0.1:5000/getmovie`, {
        "number": page
    })
    const embedding = pgvector.toSql(data.data.data)
    const existing = await prisma.movie.findFirst({
        where: {
            id: data.data.id,
        },
    })
    if (existing) {
        const id = existing.id
        await prisma.movie.update({
            where: {
                id: id
            },
            data: {
                genre_ids: { set: data.data.genre_ids },
                original_language: data.data.original_language,
                original_title: data.data.original_title,
                overview: data.data.overview,
                popularity: data.data.popularity,
                poster_path: data.data.poster_path,
                release_date: data.data.release_date,
                title: data.data.title,
                video: data.data.video,
                vote_average: data.data.vote_average,
                vote_count: data.data.vote_count,
                id: data.data.id,
            }
        })
        await prisma.$executeRaw`INSERT INTO movie (id, embedding) VALUES (${data.data.id}, ${embedding}::vector)`
    } else {
        await prisma.movie.create({
            data: {
                genre_ids: { set: data.data.genre_ids },
                original_language: data.data.original_language,
                original_title: data.data.original_title,
                overview: data.data.overview,
                popularity: data.data.popularity,
                poster_path: data.data.poster_path,
                release_date: data.data.release_date,
                title: data.data.title,
                video: data.data.video,
                vote_average: data.data.vote_average,
                vote_count: data.data.vote_count,
                id: data.data.id,
            }
        })
        await prisma.$executeRaw`INSERT INTO movie (id, embedding) VALUES (${data.data.id}, ${embedding}::vector)`
    }


}
async function embedTv (page: Number) {
    const data = await axios.post(`http://127.0.0.1:5000/gettv`, {
        "number": page
    })
    for (const data of data.data) {
        const embedding = pgvector.toSql(data.data.data)
        const existing = await prisma.tv.findFirst({
            where: {
                id: data.data.id,
            },
        })

        if (existing) {
            const id = existing.id
            await prisma.tv.update({
                where: {
                    id: id
                },
                data: {
                    first_air_date: data.data.first_air_date,
                    genre_ids: { set: data.data.genre_ids },
                    name: data.data.name,
                    origin_country: { set: data.data.origin_country },
                    original_language: data.data.original_language,
                    original_name: data.data.original_name,
                    overview: data.data.overview,
                    popularity: data.data.popularity,
                    poster_path: data.data.poster_path,
                    vote_average: data.data.vote_average,
                    vote_count: data.data.vote_count,
                    id: data.data.id,
                }
            })
            await prisma.$executeRaw`INSERT INTO tv (id, embedding) VALUES (${data.data.id}, ${embedding}::vector)`
        } else {
            console.log(data.data)
            await prisma.tv.create({
                data: {
                    first_air_date: data.data.first_air_date,
                    genre_ids: { set: data.data.genre_ids },
                    name: data.data.name,
                    origin_country: { set: data.data.origin_country },
                    original_language: data.data.original_language,
                    original_name: data.data.original_name,
                    overview: data.data.overview,
                    popularity: data.data.popularity,
                    poster_path: data.data.poster_path,
                    vote_average: data.data.vote_average,
                    vote_count: data.data.vote_count,
                    id: data.data.id,
                }
            })
            await prisma.$executeRaw`INSERT INTO tv (id, embedding) VALUES (${data.data.id}, ${embedding}::vector)`
        }
    }

}
embedTv(2)