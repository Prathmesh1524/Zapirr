-- CreateTable
CREATE TABLE "ZapRunOutBox" (
    "id" TEXT NOT NULL,
    "zaprunid" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutBox_zaprunid_key" ON "ZapRunOutBox"("zaprunid");

-- AddForeignKey
ALTER TABLE "ZapRunOutBox" ADD CONSTRAINT "ZapRunOutBox_zaprunid_fkey" FOREIGN KEY ("zaprunid") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
