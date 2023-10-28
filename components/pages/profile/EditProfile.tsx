"use client";
import toast from "react-hot-toast";
import { updateProfile } from "@/actions/updateProfile";
import { Profile } from "@/app/profile/edit/page";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
export interface ExistingData {
  name: string;
  bio: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  [key: string]: string | null; // add index signature
}
const EditProfile = ({ profile }: { profile: Profile }) => {
  const notifyUpdate = () => toast("profile updated successfully");

  return (
    <div>
      <div className="max-w-lg">
        <h2 className="mt-4 text-3xl">Edit Info</h2>
        <Divider className="mt-2" />
      </div>

      <form
        action={async (fd) => {
          const existingData: ExistingData = {
            name: profile?.name,
            bio: profile?.bio,
            githubLink: profile?.githubLink,
            linkedinLink: profile?.linkedinLink,
          };
          const fields = Object.keys(existingData);
          const updatedFields = fields.filter((field) => {
            if (fd.get(field) !== existingData[field]) {
              return field;
            }
            return false;
          });
          const formdata = new FormData();
          formdata.append("id", profile.id);
          updatedFields.forEach((field) => {
            const value = fd.get(field);
            if (value !== null) {
              formdata.append(field, value);
            }
          });
          await updateProfile(formdata);
          notifyUpdate();
        }}
        className="mt-12"
      >
        <div className="flex flex-col gap-y-3">
          <Input
            isClearable
            type="text"
            label="Name"
            name="name"
            variant="bordered"
            placeholder="Enter your name"
            defaultValue={profile?.name}
            className="max-w-xs"
          />
          <Textarea
            variant="bordered"
            label="Bio"
            name="bio"
            maxRows={4}
            labelPlacement="inside"
            placeholder="Enter your Bio"
            defaultValue={profile?.bio ?? ""}
            className="max-w-md"
          />
          <Input
            isClearable
            type="text"
            label="Github Link"
            name="githubLink"
            variant="bordered"
            placeholder="Enter your Github Link"
            defaultValue={profile?.githubLink ?? ""}
            className="max-w-xs"
          />
          <Input
            isClearable
            type="text"
            label="LinkedIn Link"
            name="linkedinLink"
            variant="bordered"
            placeholder="Enter your LinkedIn Link"
            defaultValue={profile?.linkedinLink ?? ""}
            className="max-w-xs"
          />
        </div>
        <div className="mt-6 flex gap-x-6 items-center">
          <Button color="danger" className="" type="submit">
            Save
          </Button>
          <Button href="/profile" as={Link} color="primary">
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
