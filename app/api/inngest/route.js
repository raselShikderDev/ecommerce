import { serve } from "inngest/next";
import { inngest, SyncUserCreation, SyncUserDeletation, SyncUserUpdation } from "@/confiig/inngest";
inngest
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    SyncUserDeletation,
    SyncUserUpdation,
    SyncUserCreation,
  ],
});

