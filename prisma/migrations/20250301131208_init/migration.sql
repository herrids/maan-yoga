-- CreateTable
CREATE TABLE "flows" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pose" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_english" TEXT NOT NULL,
    "name_german" TEXT,
    "name_sanskrit" TEXT,

    CONSTRAINT "Pose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flow_poses" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pose_id" TEXT NOT NULL,
    "breath" TEXT,
    "flow_id" TEXT NOT NULL,
    "equipment" TEXT,
    "position" INTEGER NOT NULL,
    "type" TEXT,
    "text" TEXT,

    CONSTRAINT "flow_poses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flow_poses" ADD CONSTRAINT "flow_poses_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flow_poses" ADD CONSTRAINT "flow_poses_pose_id_fkey" FOREIGN KEY ("pose_id") REFERENCES "Pose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
