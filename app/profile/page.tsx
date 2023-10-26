import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar } from "@nextui-org/react";

import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

  const user = await getUser();
  if (!(await isAuthenticated())) {
    redirect("/");
  }

  const profileInfo = await db.query.profiles.findFirst({
    // @ts-ignore
    where: (profiles, { eq }) => eq(profiles.userId, user.id),
  });

  const isStudent = profileInfo?.role === "student";
  if (isStudent) {
    return (
      <div className="container">
        <div className="w-full aspect-[11/3] rounded-xl bg-amber-400" />

        <div className="flex gap-x-3 items-center">
          <Avatar
            isBordered
            src={user.picture ?? ""}
            className="w-20 h-20 text-large -mt-10 ml-5"
          />
          <p>
            {user.given_name} {user.family_name}
          </p>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-semibold">Bio</h2>
          <p className="text-lg max-w-3xl mt-4">{profileInfo?.bio}</p>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-semibold">Projects</h2>
        </div>
      </div>
    );
  }

  return <div className="container">Hi user, {user.email}</div>;
};

export default page;
