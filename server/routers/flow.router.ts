import { z } from "zod";

import { publicProcedure, router } from "../trpc";

import { prisma } from "@/utils/prisma";

// Flow pose schema for validation
const flowPoseSchema = z.object({
  id: z.string().optional(),
  pose_id: z.string(),
  position: z.number().optional(),
  breath: z.string().nullable().optional(),
  equipment: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
});

// Flow router with all operations
export const flowRouter = router({
  getUserFlows: publicProcedure
    .input(z.object({ userEmail: z.string().email() }))
    .query(async ({ input }) => {
      const flows = await prisma.flow.findMany({
        where: {
          user_email: input.userEmail,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return flows;
    }),

  getFlow: publicProcedure
    .input(z.object({ flowId: z.string() }))
    .query(async ({ input }) => {
      const flow = await prisma.flow.findUnique({
        where: {
          id: input.flowId,
        },
      });

      if (!flow) {
        throw new Error("Flow not found");
      }

      const flowPoses = await prisma.flowPose.findMany({
        where: {
          flow_id: input.flowId,
        },
        include: {
          pose: true,
        },
        orderBy: {
          position: "asc",
        },
      });

      // Map to match the previous response format
      const posesWithInfo = flowPoses.map((flowPose) => ({
        ...flowPose,
        name_english: flowPose.pose.name_english,
        name_german: flowPose.pose.name_german,
        name_sanskrit: flowPose.pose.name_sanskrit,
      }));

      return {
        ...flow,
        poses: posesWithInfo,
      };
    }),

  createFlow: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().nullable().optional(),
        user_email: z.string().email(),
        poses: z.array(flowPoseSchema).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { ...flowData } = input;

      return prisma.flow.create({
        data: flowData,
      });
    }),

  updateFlow: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().nullable().optional(),
        user_email: z.string().email().optional(),
        poses: z.array(flowPoseSchema).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { ...flowData } = input;

      if (flowData.id) {
        return await prisma.flow.update({
          where: {
            id: flowData.id,
          },
          data: flowData,
        });
      } else {
        throw new Error("Flow ID is required");
      }
    }),

  /* saveFlow: publicProcedure.input(flowSchema).mutation(async ({ input }) => {
    const { poses, ...flowData } = input;

    if (flowData.id) {
      // Update existing flow
      const updatedFlow = await prisma.flow.update({
        where: {
          id: flowData.id,
        },
        data: {
          name: flowData.name,
          description: flowData.description,
          user_email: flowData.user_email,
        },
      });

      // Delete existing flow poses
      await prisma.flowPose.deleteMany({
        where: {
          flow_id: flowData.id,
        },
      });

      // Create new flow poses
      await prisma.flowPose.createMany({
        data: poses.map((pose, index) => ({
          pose_id: pose.pose_id,
          flow_id: updatedFlow.id,
          position: index,
          breath: pose.breath || null,
          equipment: pose.equipment || null,
          type: pose.type || null,
          text: pose.text || null,
        })),
      });

      return updatedFlow.id;
    } else {
      // Create new flow
      const newFlow = await prisma.flow.create({
        data: {
          name: flowData.name,
          description: flowData.description,
          user_email: flowData.user_email,
        },
      });

      // Create flow poses separately
      await prisma.flowPose.createMany({
        data: poses.map((pose, index) => ({
          pose_id: pose.pose_id,
          flow_id: newFlow.id,
          position: index,
          breath: pose.breath || null,
          equipment: pose.equipment || null,
          type: pose.type || null,
          text: pose.text || null,
        })),
      });

      return newFlow.id;
    }
  }), */

  deleteFlow: publicProcedure
    .input(z.object({ flowId: z.string() }))
    .mutation(async ({ input }) => {
      // This will cascade delete flow poses due to the relation in the schema
      await prisma.flow.delete({
        where: {
          id: input.flowId,
        },
      });

      return { success: true };
    }),
});
