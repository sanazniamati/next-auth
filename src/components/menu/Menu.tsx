/** @format */

import Link from "next/link";
import { Nav } from "./style";

export default function Menu() {
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
      <div className="login-register">
        <Link className="menuLink signIn" href="/auth/login">
          ورود
        </Link>
        <Link className="menuLink signUp" href="/auth/register">
          ثبت نام
        </Link>
      </div>
    </Nav>
  );
}
