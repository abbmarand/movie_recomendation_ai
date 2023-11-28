-- CreateTable
CREATE TABLE "tv" (
    "id" INTEGER NOT NULL,
    "embedding" vector(384),
    "first_air_date" TEXT,
    "genre_ids" INTEGER[],
    "name" TEXT,
    "origin_country" TEXT[],
    "original_language" TEXT,
    "original_name" TEXT,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,

    CONSTRAINT "tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "embedding" vector(384),
    "id" INTEGER NOT NULL,
    "genre_ids" INTEGER[],
    "original_language" TEXT,
    "original_title" TEXT,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "release_date" TEXT,
    "title" TEXT,
    "video" BOOLEAN,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,

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

-- CreateTable
CREATE TABLE "testt" (
    "id" SERIAL NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "testt_pkey" PRIMARY KEY ("id")
);
