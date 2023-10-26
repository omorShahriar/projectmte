import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const page = () => {
  const { getPermission } = getKindeServerSession();
  const isAdmin = getPermission("admin").isGranted;
  console.log(getPermission("admin"));
  if (!isAdmin) {
    redirect("/");
  }
  return <div>Hi admin</div>;
};

export default page;
