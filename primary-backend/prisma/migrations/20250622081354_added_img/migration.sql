/*
  Warnings:

  - Added the required column `image` to the `AvalibleActions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `TriggerType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvalibleActions" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TriggerType" ADD COLUMN     "image" TEXT NOT NULL;
