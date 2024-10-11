import { createClient } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';

export async function blogData() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log("connected to database!");
      return client;
    }
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}
export async function getPosts() {
  try {
    noStore();
    const data = await sql`SELECT * FROM posts`;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Error occured", error);
  }
}
