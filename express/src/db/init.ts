import pool from "./pool";

const createQuery = `
Create table users (
  id int primary key generated always as identity,
  username varchar(255) not null unique,
  password varchar(255) not null
);
`;

async function main() {
  console.log("Beginnig initialization process");
  try {
    await pool.query(createQuery);
    console.log("Table created");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Process complete");
  }
}

main();
