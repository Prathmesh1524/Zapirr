/*
  Warnings:

  - Added the required column `meatdata` to the `ZapRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "meatdata" JSONB NOT NULL;
