/*
  Warnings:

  - You are about to drop the `flow_poses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "flow_poses" DROP CONSTRAINT "flow_poses_flow_id_fkey";

-- DropForeignKey
ALTER TABLE "flow_poses" DROP CONSTRAINT "flow_poses_pose_id_fkey";

-- DropTable
DROP TABLE "flow_poses";

-- DropTable
DROP TABLE "flows";

-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowPose" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pose_id" TEXT NOT NULL,
    "breath" TEXT,
    "flow_id" TEXT NOT NULL,
    "equipment" TEXT,
    "position" INTEGER NOT NULL,
    "type" TEXT,
    "text" TEXT,

    CONSTRAINT "FlowPose_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlowPose" ADD CONSTRAINT "FlowPose_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowPose" ADD CONSTRAINT "FlowPose_pose_id_fkey" FOREIGN KEY ("pose_id") REFERENCES "Pose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
