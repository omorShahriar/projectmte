import ProjectCard from "@/components/pages/projects/ProjectCard";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { Avatar, Divider } from "@nextui-org/react";
import { GithubIcon, Linkedin } from "lucide-react";

export const revalidate = 3600;

export const generateStaticParams = async () => {
  const params = await db.select({ id: profiles.id }).from(profiles);
  return params;
};

const page = async ({ params }: { params: { id: string } }) => {
  const profile = await db.query.profiles.findFirst({
    // @ts-ignore
    where: (profiles, { eq }) => eq(profiles.id, params.id),
    with: {
      projects: true,
    },
  });
  const userInfo = await db.query.users.findFirst({
    // @ts-ignore
    where: (users, { eq }) => eq(users.id, profile.userId),
  });

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
        </div>
        <Divider className="mt-4" />
        <div className="mt-16">
          <h2 className="text-3xl font-semibold my-4">Bio</h2>
          <p className="text-lg max-w-3xl mt-4">{profile?.bio}</p>
        </div>
        <div className="mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold my-4">Projects</h2>
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
  return "Not Found";
};

export default page;
