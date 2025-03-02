-- DropForeignKey
ALTER TABLE "FlowPose" DROP CONSTRAINT "FlowPose_pose_id_fkey";

-- AlterTable
ALTER TABLE "FlowPose" ALTER COLUMN "pose_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FlowPose" ADD CONSTRAINT "FlowPose_pose_id_fkey" FOREIGN KEY ("pose_id") REFERENCES "Pose"("id") ON DELETE SET NULL ON UPDATE CASCADE;
