import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser, getPermission } = getKindeServerSession();
  const isAdmin = getPermission("admin").isGranted;
  const user = getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication " + user);
  try {
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email as string));

    if (dbUser.length == 0) {
      const userPromise = db.insert(users).values({
        id: user.id as string,
        name: `${user.given_name} ${user.family_name}`,
        email: user.email as string,
        image: user.picture,
        createdAt: new Date(),
      });
      const isMteMail =
        /@stud\.kuet\.ac\.bd$/.test(user.email as string) &&
        /\d{2}31\d{3}/.test(user.email as string);

      const profilePromise = db.insert(profiles).values({
        userId: user.id as string,
        role: isMteMail ? "student" : "user",
      });

      await Promise.all([userPromise, profilePromise]);
    }
    if (!dbUser[0].image) {
      await db
        .update(users)
        .set({ image: user.picture })
        .where(eq(users.email, user.email as string));
    }
    if (isAdmin) {
      return NextResponse.redirect(`${process.env.PROJECT_URL}/admin`);
    }
    return NextResponse.redirect(process.env.PROJECT_URL as string);
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(process.env.PROJECT_URL as string);
  }
}
