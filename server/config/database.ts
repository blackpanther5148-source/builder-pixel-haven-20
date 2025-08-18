import { Pool } from 'pg';

// Database connection configuration using your Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_yLr5gvd1hQlB@ep-noisy-haze-abo2cy0v-pooler.eu-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to Neon database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('🔌 Database pool closed');
    process.exit(0);
  });
});

export { pool };
