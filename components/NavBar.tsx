import Link from "next/link";
import UserBox from "./UserBox";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const navLinks = [
  { title: `Projects`, path: `/projects` },
  { title: `Events`, path: `/events` },
  { title: `Gallery`, path: `/gallery` },
  { title: `Contact`, path: `/contact` },
];

const NavBar = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="sticky top-0 left-0">
      <div className="container flex justify-between items-center py-6">
        <div className=" font-semibold text-4xl ">
          <Link href="/">MTE</Link>
        </div>
        <ul className="flex gap-x-4 items-center">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-4 items-center">
          <ThemeSwitcher />

          {(await isAuthenticated()) ? (
            <>
              <UserBox user={user} />
            </>
          ) : (
            <LoginLink orgCode="org_9ab7163dae6">Sign in</LoginLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
