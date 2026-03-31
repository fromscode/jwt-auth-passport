import pool from "./pool";

async function createUser(username: string, hashedPass: string) {
  return (
    await pool.query(
      "Insert into users(username, password) values ($1, $2) returning id",
      [username, hashedPass],
    )
  ).rows[0].id;
}

async function getUserByID(id: number) {
  return (await pool.query("Select * from users where id = $1", [id])).rows[0];
}

async function getUserByUsername(username: string) {
  return (
    await pool.query("Select * from users where username = $1", [username])
  ).rows[0];
}

export default {
  createUser,
  getUserByID,
  getUserByUsername,
};
