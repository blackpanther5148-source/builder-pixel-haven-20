import { Pool } from "pg";

// Database connection configuration using local PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

// Graceful shutdown
process.on("SIGINT", () => {
  pool.end(() => {
    console.log("🔌 Database pool closed");
    process.exit(0);
  });
});

export { pool };
