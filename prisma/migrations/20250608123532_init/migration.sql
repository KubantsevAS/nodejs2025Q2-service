-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fav" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Fav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavToArtist" (
    "favId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavToArtist_pkey" PRIMARY KEY ("favId","artistId")
);

-- CreateTable
CREATE TABLE "FavToAlbum" (
    "favId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavToAlbum_pkey" PRIMARY KEY ("favId","albumId")
);

-- CreateTable
CREATE TABLE "FavToTrack" (
    "favId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavToTrack_pkey" PRIMARY KEY ("favId","trackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavToArtist" ADD CONSTRAINT "FavToArtist_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Fav"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavToArtist" ADD CONSTRAINT "FavToArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavToAlbum" ADD CONSTRAINT "FavToAlbum_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Fav"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavToAlbum" ADD CONSTRAINT "FavToAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavToTrack" ADD CONSTRAINT "FavToTrack_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Fav"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavToTrack" ADD CONSTRAINT "FavToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
