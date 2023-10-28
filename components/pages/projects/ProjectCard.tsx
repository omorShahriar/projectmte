"use client";
import { Button, Card, CardBody, Divider, CardFooter } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  image: string | null;
  description: string;
  authorId: string;
  createdAt: Date;
}

const ProjectCard = ({ project }: { project: ProjectCardProps }) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 col-span-6"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <CldImage
              width="200"
              height="200"
              src={project?.image ?? "/project-image-placeholder.png"}
              sizes="100vw"
              alt={project.name}
              crop="thumb"
              className="rounded-md shadow-sm"
            />
          </div>

          <div className="flex flex-col col-span-6 h-full md:col-span-8">
            <h3 className="font-semibold text-lg text-foreground/90">
              {project.name}
            </h3>
            <Divider className="my-2" />
            <p className=" font-light flex-1 "> {project.description} </p>

            <div className="flex justify-end mt-2">
              <Button
                href={`/projects/${project.id}`}
                as={Link}
                size="sm"
                variant="faded"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
