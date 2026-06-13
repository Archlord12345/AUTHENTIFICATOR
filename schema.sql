-- -----------------------------------------------------------------------------
-- Authentifictor Service - PostgreSQL Schema
-- Optimized for Neon PostgreSQL
-- -----------------------------------------------------------------------------

-- 1. Users Table: Stores unique identity of users
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,               -- Matches Prisma CUID
    "email" TEXT UNIQUE NOT NULL,        -- Identity source
    "name" TEXT,                         -- Full name from OAuth provider
    "avatar" TEXT,                       -- Profile picture URL
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. LoginLog Table: Tracks usage across different client applications
CREATE TABLE IF NOT EXISTS "LoginLog" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,             -- The client application name
    "provider" TEXT NOT NULL,            -- 'google' or 'github'
    "status" TEXT NOT NULL,              -- 'success' or 'failure'
    "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Foreign Key Constraint
    CONSTRAINT "LoginLog_userId_fkey" FOREIGN KEY ("userId") 
        REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Performance Indexes
-- Speed up lookup of users by email
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- Speed up admin dashboard queries (recent logins and stats by app)
CREATE INDEX IF NOT EXISTS "LoginLog_userId_idx" ON "LoginLog"("userId");
CREATE INDEX IF NOT EXISTS "LoginLog_appName_idx" ON "LoginLog"("appName");
CREATE INDEX IF NOT EXISTS "LoginLog_timestamp_idx" ON "LoginLog"("timestamp" DESC);

-- -----------------------------------------------------------------------------
-- Instructions pour Neon Console :
-- 1. Ouvrez l'éditeur SQL dans la console Neon.
-- 2. Copiez et collez ce script pour initialiser manuellement si nécessaire.
-- Note: 'npx prisma db push' s'en occupe normalement automatiquement.
-- -----------------------------------------------------------------------------
