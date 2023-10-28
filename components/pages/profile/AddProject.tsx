"use client";
import { addNewProject } from "@/actions/addNewProject";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { createId } from "@paralleldrive/cuid2";
import { PlusIcon } from "lucide-react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useMemo, useState } from "react";

const AddProject = ({ authorId }: { authorId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [publicId, setPublicId] = useState<string>("" as any);
  const projectId = useMemo(() => createId(), []);

  return (
    <>
      <Button
        size="sm"
        color="secondary"
        onPress={onOpen}
        startContent={<PlusIcon />}
      >
        New Project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Project
              </ModalHeader>
              <form
                action={async (fd) => {
                  if (!publicId) return alert("Please upload an image");
                  if (!fd.get("name") || !fd.get("brief"))
                    return alert("Please enter all the information");
                  await addNewProject(fd);
                  onClose();
                }}
              >
                <ModalBody>
                  <div className="flex flex-col gap-y-2">
                    {publicId && (
                      <CldImage
                        width="200"
                        height="200"
                        src={publicId}
                        sizes="100vw"
                        alt="project thumbnail"
                        crop="thumb"
                        className="rounded-md"
                      />
                    )}
                    <CldUploadButton
                      className="bg-white text-black p-2 rounded-md border border-gray-300"
                      options={{ publicId: projectId }}
                      uploadPreset="project-image"
                      onUpload={(res) => {
                        setPublicId(
                          (res.info as { public_id: string }).public_id
                        );
                      }}
                    >
                      Upload Project Image
                    </CldUploadButton>
                    <Input
                      variant="bordered"
                      type="text"
                      label="Project Name"
                      name="name"
                    />
                    <Textarea
                      name="brief"
                      variant="bordered"
                      minRows={4}
                      label="Brief"
                    />
                    <input type="hidden" name="id" value={projectId} />
                    <input type="hidden" name="image" value={publicId} />
                    <input type="hidden" name="authorId" value={authorId} />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProject;
