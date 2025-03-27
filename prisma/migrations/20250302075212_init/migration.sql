/*
  Warnings:

  - Made the column `type` on table `FlowPose` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FlowPose" ALTER COLUMN "type" SET NOT NULL;
