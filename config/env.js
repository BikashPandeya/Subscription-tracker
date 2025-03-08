import { config } from "dotenv";

// Load environment variables based on the current NODE_ENV value
// If NODE_ENV is not set, it defaults to "development"
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

/**
 * Extract environment variables from process.env
 * 
 * - PORT: The port number the server will run on.
 * - NODE_ENV: The current environment (e.g., "development", "production", "test").
 * - DB_URI: The database connection string.
 */
export const { PORT, NODE_ENV, DB_URI ,JWT_SECRET , JWT_EXPIRES_IN , ARCJET_KEY , ARCJET_ENV } = process.env;
