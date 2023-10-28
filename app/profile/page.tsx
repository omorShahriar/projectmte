import AddProject from "@/components/pages/profile/AddProject";
import LivePortfolioLink from "@/components/pages/profile/LivePortfolioLink";
import ProjectCard from "@/components/pages/projects/ProjectCard";
import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { Copy, GithubIcon, Linkedin, UserCogIcon } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

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
      profile: {
        with: {
          projects: true,
        },
      },
    },
  });

  const profile = userInfo?.profile;
  const projects = profile?.projects;

  const isStudent = profile?.role === "student";
  if (isStudent) {
    return (
      <div className="container">
        <div className="w-full aspect-[11/3] rounded-xl bg-amber-400" />
        <div className="flex justify-between">
          <div className="flex gap-x-3 items-center">
            <Avatar
              isBordered
              src={userInfo?.image ?? ""}
              className="w-20 h-20 text-large -mt-10 ml-5"
            />
            <p>{userInfo?.name}</p>
          </div>
          <Button
            color="danger"
            radius="sm"
            size="sm"
            startContent={<UserCogIcon />}
            href="/profile/edit"
            as={Link}
            className="mt-2"
          >
            Edit Profile
          </Button>
        </div>
        <div className="flex gap-x-8 mt-8 px-8 items-center">
          {profile.githubLink ? (
            <a
              className="flex items-center gap-x-2 p-2 border rounded-md hover:text-amber-500 hover:border-amber-500 transition-all"
              href={profile.githubLink}
              target="_blank"
            >
              <GithubIcon />
              Github
            </a>
          ) : null}
          {profile.linkedinLink ? (
            <a
              className="flex items-center gap-x-2 p-2 border rounded-md hover:text-amber-500 hover:border-amber-500 transition-all"
              href={profile.linkedinLink}
              target="_blank"
            >
              <Linkedin />
              Linkedin
            </a>
          ) : null}
          <div>
            <LivePortfolioLink id={profile.id} />
          </div>
        </div>
        <Divider className="mt-4" />
        <div className="mt-16">
          <h2 className="text-3xl font-semibold my-4">Bio</h2>
          <p className="text-lg max-w-3xl mt-4">{profile?.bio}</p>
        </div>
        <div className="mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold my-4">Projects</h2>
            <AddProject authorId={profile.id} />
          </div>

          <div className="my-12 grid grid-cols-12 gap-6">
            {projects?.map((project) => (
              // @ts-ignore
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div className="container">Hi user, {user.email}</div>;
};

export default page;
