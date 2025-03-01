import { router } from "../trpc";

import { flowRouter } from "./flow.router";
import { poseRouter } from "./pose.router";

export const appRouter = router({
  flow: flowRouter,
  pose: poseRouter,
});

// Export type definition of the API
export type AppRouter = typeof appRouter;
