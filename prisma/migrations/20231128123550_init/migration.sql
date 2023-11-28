/*
  Warnings:

  - You are about to drop the `moovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ttv` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "moovie";

-- DropTable
DROP TABLE "ttv";

-- CreateTable
CREATE TABLE "tv" (
    "id" INTEGER NOT NULL,
    "embedding" vector(384),
    "first_air_date" TEXT NOT NULL,
    "genre_ids" INTEGER[],
    "name" TEXT NOT NULL,
    "origin_country" TEXT[],
    "original_language" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "embedding" vector(384),
    "id" INTEGER NOT NULL,
    "genre_ids" INTEGER[],
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "embedding" vector(4),

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iiitem" (
    "id" SERIAL NOT NULL,
    "embedding" vector(20),

    CONSTRAINT "iiitem_pkey" PRIMARY KEY ("id")
);
