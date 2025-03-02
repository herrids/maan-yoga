import { z } from "zod";

import { publicProcedure, router } from "../trpc";

import { prisma } from "@/utils/prisma";

// Pose router with all operations
export const poseRouter = router({
  getAllPoses: publicProcedure.query(async () => {
    return prisma.pose.findMany({
      orderBy: {
        name_english: "asc",
      },
    });
  }),

  getPose: publicProcedure
    .input(z.object({ poseId: z.string() }))
    .query(async ({ input }) => {
      const pose = await prisma.pose.findUnique({
        where: {
          id: input.poseId,
        },
      });

      if (!pose) {
        throw new Error("Pose not found");
      }

      return pose;
    }),

  createPose: publicProcedure
    .input(
      z.object({
        name_english: z.string(),
        name_german: z.string().nullable().optional(),
        name_sanskrit: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.pose.create({
        data: input,
      });
    }),

  updatePose: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name_english: z.string(),
        name_german: z.string().nullable().optional(),
        name_sanskrit: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      return prisma.pose.update({
        where: { id },
        data,
      });
    }),

  deletePose: publicProcedure
    .input(z.object({ poseId: z.string() }))
    .mutation(async ({ input }) => {
      // Check if the pose is used in any flows
      const usedInFlows = await prisma.flowPose.findFirst({
        where: {
          pose_id: input.poseId,
        },
      });

      if (usedInFlows) {
        throw new Error("Cannot delete pose as it is used in flows");
      }

      await prisma.pose.delete({
        where: {
          id: input.poseId,
        },
      });

      return { success: true };
    }),
});
