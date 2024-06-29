/** @format */

import { getFetch } from "../../utils/fetch";

export async function getUserByEmail(email: string) {
  try {
    const users = await getFetch("/users");
    const userWithEmail = users.find((user) => user.email === email);

    // console.log(user);

    return userWithEmail;
  } catch {
    return null;
  }
}
