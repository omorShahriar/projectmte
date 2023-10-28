import EditProfile from "@/components/pages/profile/EditProfile";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export interface Profile {
  id: string;
  name: string;
  bio: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  coverPhoto: string | null;
}

const page = async () => {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

  const user = await getUser();
  if (!(await isAuthenticated())) {
    redirect("/");
  }

  const userInfo = await db.query.users.findFirst({
    // @ts-ignore
    where: (users, { eq }) => eq(users.id, user.id),
    with: {
      profile: true,
    },
  });
  if (userInfo != undefined) {
    const profile = {
      id: userInfo.profile.id,
      name: userInfo.name,
      bio: userInfo.profile.bio,
      githubLink: userInfo.profile.githubLink,
      linkedinLink: userInfo.profile.linkedinLink,
      coverPhoto: userInfo.profile.coverPhoto,
    };
    return (
      <div className="container">
        <EditProfile profile={profile} />
      </div>
    );
  }
};

export default page;
