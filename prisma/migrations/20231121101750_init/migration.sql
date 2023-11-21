/*
  Warnings:

  - You are about to drop the column `desc` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `tv` table. All the data in the column will be lost.
  - Added the required column `original_language` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_title` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_air_date` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_language` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_name` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `tv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movie" DROP COLUMN "desc",
DROP COLUMN "name",
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "original_title" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "release_date" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "video" BOOLEAN NOT NULL,
ADD COLUMN     "vote_average" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vote_count" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "movie_id_seq";

-- AlterTable
ALTER TABLE "tv" DROP COLUMN "desc",
ADD COLUMN     "first_air_date" TEXT NOT NULL,
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "origin_country" TEXT[],
ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "original_name" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "vote_average" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vote_count" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "tv_id_seq";
