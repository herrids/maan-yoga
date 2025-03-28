import * as trpcNext from "@trpc/server/adapters/next";

import { appRouter } from "@/server/routers";

// export API handler
// @link https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
