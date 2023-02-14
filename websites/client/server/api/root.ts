import { renders } from "./routers/renders/renders";
import { projects } from "./routers/projects/projects";
import { createTRPCRouter } from "./trpc";
import { stock } from "./routers/stock/stock";
import { ai } from "./routers/ai/ai";
import { media } from "./routers/media/media";
import { transcriptions } from "./routers/transcriptions/transcriptions";
import { keys } from "./routers/keys/keys";

export const appRouter = createTRPCRouter({
  projects,
  renders,
  stock,
  ai,
  media,
  transcriptions,
  keys,
});

export type AppRouter = typeof appRouter;
