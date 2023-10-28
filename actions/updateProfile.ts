"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateProfile = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name");
  const bio = formData.get("bio");
  const githubLink = formData.get("githubLink");
  const linkedinLink = formData.get("linkedinLink");
  const profileData = {
    ...(name && { name }),
    ...(typeof bio === "string" && { bio }),
    ...(githubLink && typeof githubLink === "string" && { githubLink }),
    ...(linkedinLink && typeof linkedinLink === "string" && { linkedinLink }),
  };

  if (Object.keys(profileData).length !== 0) {
    await db.update(profiles).set(profileData).where(eq(profiles.id, id));
    revalidatePath("/profile", "layout");
  }
};
