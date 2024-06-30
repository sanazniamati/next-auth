/** @format */
"use client";
import Link from "next/link";
import { Nav } from "./style";
import { useAuthContext } from "@/context/AuthContext";
import { logoutAction } from "@/actions/logOut";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const { values, func } = useAuthContext();
  const { user } = values;
  const { logoutUser } = func;

  const handleLogOut = async () => {
    await logoutAction();
    logoutUser();
    router.push("/");
  };

  return (
    <Nav>
      <ul className="menu">
        <li className="menuItem">
          <Link className="menuLink" href="/">
            خانه
          </Link>
        </li>
        <li className="menuItem">
          <Link className="menuLink" href="#">
            مبلمان
          </Link>
        </li>
        <li className="menuItem">
          <Link className="menuLink" href="/about">
            درباره ما
          </Link>
        </li>
      </ul>
      {/* //TODO */}
      {user && Object.keys(user).length > 0 ? (
        <>
          <p>{user["name"]}</p>
          <Link className="menuLink signIn" href="#" onClick={handleLogOut}>
            خروج
          </Link>
        </>
      ) : (
        <>
          <div className="login-register">
            <Link className="menuLink signIn" href="/auth/login">
              ورود
            </Link>
            <Link className="menuLink signUp" href="/auth/register">
              ثبت نام
            </Link>
          </div>
        </>
      )}
    </Nav>
  );
}
