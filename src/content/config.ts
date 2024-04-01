import { defineCollection, z } from "astro:content";

const wedding = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      date: z.string().optional(),
      images: z.array(image()),
      thumb: image(),
    }),
});
const about = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      info: z.string(),
    }),
});

export const collections = {
  wedding: wedding,
  about: about,
};
