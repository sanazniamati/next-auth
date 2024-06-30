/** @format */
"use client";
import Link from "next/link";
import { Nav } from "./style";
import { useAuthContext } from "@/context/AuthContext";

export default function Menu() {
  const { values } = useAuthContext();
  const { user } = values;
  console.log(user);

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
      {user && Object.keys(user).length > 0 ? (
        <>
          <p>{user["name"]}</p>
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
