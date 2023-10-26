"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const UserBox = ({ user }: { user: KindeUser }) => {
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.picture as string}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem>
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem color={"danger"}>
            <a href="/api/auth/logout">Sign out</a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default UserBox;
