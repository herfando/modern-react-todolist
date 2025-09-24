import { http } from "./client";
import { type User } from "../types/user";

// Method GET all
export async function getAllUsers(): Promise<User[]> {
  const { data } = await http.get<User[]>("/users");
  return data;
}

// Method Get by id
export async function getUserById(id: number): Promise<User> {
  const { data } = await http.get<User>(`/users/${id}`);
  return data;
}
