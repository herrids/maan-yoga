import { router } from "../trpc";

import { flowRouter } from "./flow.router";
import { flowPoseRouter } from "./flowPose.router";
import { poseRouter } from "./pose.router";
export const appRouter = router({
  flow: flowRouter,
  flowPose: flowPoseRouter,
  pose: poseRouter,
});

// Export type definition of the API
export type AppRouter = typeof appRouter;
