"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addNewProject = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name");
  const image = formData.get("image");
  const description = formData.get("brief");
  const authorId = formData.get("authorId");

  const projectData: NewProject = {
    id,
    name: name as string,
    image: image as string,
    description: description as string,
    authorId: authorId as string,
    createdAt: new Date(),
  };
  type NewProject = typeof projects.$inferInsert;

  await db.insert(projects).values(projectData);
  revalidatePath("/profile", "page");
};
