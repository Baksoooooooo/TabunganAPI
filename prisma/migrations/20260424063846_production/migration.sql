-- CreateTable
CREATE TABLE "Tabungan" (
    "idTabungan" SERIAL NOT NULL,
    "namaTabungan" TEXT NOT NULL,
    "totalTabungan" INTEGER NOT NULL DEFAULT 0,
    "pemilikTabungan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tabungan_pkey" PRIMARY KEY ("idTabungan")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tabungan" ADD CONSTRAINT "Tabungan_pemilikTabungan_fkey" FOREIGN KEY ("pemilikTabungan") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
