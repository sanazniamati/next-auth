/** @format */
"use server";
import { cookies } from "next/headers";
import { getFetch } from "../utils/fetch";

export async function meAction() {
  const token = cookies().get("token");
  const res = await getFetch("users/me", { Authorization: `Bearer${token?.value}` });
  const data = await res.json();
  console.log(data);
}
