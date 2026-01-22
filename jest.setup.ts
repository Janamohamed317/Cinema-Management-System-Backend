import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

if (process.env.DATABASE_URL?.includes("npg_nrh3K2SDZOjs")) {
  throw new Error(
    "🚨 Tests are running against a non-test database!"
  );
}
