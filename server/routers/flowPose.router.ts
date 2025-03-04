import { z } from "zod";

import { publicProcedure, router } from "../trpc";

import { prisma } from "@/utils/prisma";

// Pose router with all operations
export const flowPoseRouter = router({
  getAllFlowPoses: publicProcedure
    .input(z.object({ flow_id: z.string() }))
    .query(async ({ input }) => {
      return prisma.flowPose.findMany({
        where: { flow_id: input.flow_id },
      });
    }),
  createFlowPose: publicProcedure
    .input(
      z.object({
        flow_id: z.string(),
        pose_id: z.string().nullable().optional(),
        breath: z.string().nullable().optional(),
        equipment: z.string().nullable().optional(),
        text: z.string().nullable().optional(),
        position: z.number(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const createdFlowPose = await prisma.flowPose.create({
        data: {
          flow_id: input.flow_id,
          pose_id: input.pose_id,
          breath: input.breath,
          equipment: input.equipment,
          text: input.text,
          position: input.position,
          type: input.type,
        },
      });

      if (createdFlowPose.pose_id) {
        const pose = await prisma.pose.findUnique({
          where: { id: createdFlowPose.pose_id },
        });

        return { ...createdFlowPose, pose };
      } else {
        return createdFlowPose;
      }
    }),

  updateFlowPose: publicProcedure
    .input(
      z.object({
        id: z.string(),
        pose_id: z.string().nullable().optional(),
        breath: z.string().nullable().optional(),
        equipment: z.string().nullable().optional(),
        text: z.string().nullable().optional(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      //first update the flowpose then fetch it including pose object
      const updatedFlowPose = await prisma.flowPose.update({
        where: { id },
        data,
      });

      if (updatedFlowPose.pose_id) {
        const pose = await prisma.pose.findUnique({
          where: { id: updatedFlowPose.pose_id },
        });

        return { ...updatedFlowPose, pose };
      } else {
        return updatedFlowPose;
      }
    }),
  deleteFlowPose: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.flowPose.delete({
        where: { id: input.id },
      });
    }),
});
