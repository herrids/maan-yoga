import { prisma } from "@/utils/prisma";

/**
 * Fetches a flow by ID with all related poses
 * @param flowId - The ID of the flow to fetch
 * @returns The flow with poses or null if not found
 */
export async function getFlowById(flowId: string) {
  try {
    // Fetch flow
    const flow = await prisma.flow.findUnique({
      where: {
        id: flowId,
      },
    });

    if (!flow) {
      return null;
    }

    // Fetch flow poses
    const flowPoses = await prisma.flowPose.findMany({
      where: {
        flow_id: flowId,
      },
      include: {
        pose: true,
      },
      orderBy: {
        position: "asc",
      },
    });

    // Map to match the expected format
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
  } catch (error) {
    console.error("Error fetching flow:", error);
    throw new Error("Failed to fetch flow");
  }
}

/**
 * Gets all flows for a specific user
 * @param userEmail - The email of the user
 * @returns Array of flows
 */
export async function getUserFlows(userEmail: string) {
  try {
    return await prisma.flow.findMany({
      where: {
        user_email: userEmail,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching user flows:", error);
    throw new Error("Failed to fetch user flows");
  }
}

// Add more flow-related database functions as needed 