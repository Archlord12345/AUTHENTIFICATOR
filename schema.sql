-- -----------------------------------------------------------------------------
-- Authentifictor Service - PostgreSQL Schema (Reset & Recreate)
-- -----------------------------------------------------------------------------

-- WARNING: This will delete all existing data!
DROP TABLE IF EXISTS "LoginLog" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- 1. Users Table
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. LoginLog Table
CREATE TABLE "LoginLog" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "LoginLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Performance Indexes
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "LoginLog_userId_idx" ON "LoginLog"("userId");
CREATE INDEX "LoginLog_appName_idx" ON "LoginLog"("appName");
CREATE INDEX "LoginLog_timestamp_idx" ON "LoginLog"("timestamp" DESC);
