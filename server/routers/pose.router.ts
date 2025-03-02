import { z } from "zod";

import { publicProcedure, router } from "../trpc";

import { prisma } from "@/utils/prisma";

// Pose router with all operations
export const poseRouter = router({
  getAllPoses: publicProcedure.query(async () => {
    return prisma.pose.findMany({
      orderBy: {
        id: "asc",
      },
    });
  })
});
