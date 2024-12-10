import { z } from "zod";

export const contextSchema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
  id: z.string(),
  accountId: z.string(),
  summonerLevel: z.number(),
  profileIconId: z.number().optional(),
  revisionDate: z.string().optional(),
});

export type PuuidContextProps = z.infer<typeof contextSchema>;
