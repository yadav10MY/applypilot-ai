# Supabase Database Setup

This directory contains the database schema and migration files for ApplyPilot AI.

## Database Schema

### Tables

1. **profiles** - Extends auth.users with additional user information
   - `id` (UUID, PK) - References auth.users(id)
   - `full_name` (TEXT) - User's full name
   - `avatar_url` (TEXT) - Profile picture URL
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

2. **resume_analyses** - Stores resume analysis results
   - `id` (UUID, PK)
   - `user_id` (UUID, FK) - References auth.users(id)
   - `file_name` (TEXT) - Original filename
   - `ats_score` (INTEGER) - ATS score (0-100)
   - `analysis_data` (JSONB) - Full analysis results
   - `created_at` (TIMESTAMP)

3. **career_roadmaps** - Stores generated career roadmaps
   - `id` (UUID, PK)
   - `user_id` (UUID, FK) - References auth.users(id)
   - `target_role` (TEXT) - Desired job role
   - `current_level` (TEXT) - Current career level
   - `roadmap_data` (JSONB) - Roadmap milestones and recommendations
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

4. **job_applications** - Tracks job applications
   - `id` (UUID, PK)
   - `user_id` (UUID, FK) - References auth.users(id)
   - `job_id` (TEXT) - External job ID
   - `job_title` (TEXT)
   - `company` (TEXT)
   - `status` (TEXT) - applied, interviewing, rejected, accepted
   - `applied_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

5. **saved_jobs** - Stores saved job listings
   - `id` (UUID, PK)
   - `user_id` (UUID, FK) - References auth.users(id)
   - `job_id` (TEXT) - External job ID
   - `job_data` (JSONB) - Full job details
   - `created_at` (TIMESTAMP)

6. **user_skills** - Tracks user skills
   - `id` (UUID, PK)
   - `user_id` (UUID, FK) - References auth.users(id)
   - `skill_name` (TEXT) - Name of the skill
   - `proficiency_level` (TEXT) - beginner, intermediate, advanced, expert
   - `created_at` (TIMESTAMP)

## Setup Instructions

### Option 1: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link to your Supabase project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Run migrations:
   ```bash
   supabase db push
   ```

### Option 2: Manual Setup via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste and run the SQL in the editor

## Row Level Security (RLS)

All tables have Row Level Security enabled. Users can only:
- View their own data
- Insert their own data
- Update their own data
- Delete their own data

This ensures data privacy and security at the database level.

## Automatic Profile Creation

A database trigger automatically creates a profile entry when a new user signs up through Supabase Auth.

## Indexes

Indexes are created on frequently queried columns for optimal performance:
- User ID columns for all tables
- Created_at timestamps for time-based queries
- Status fields for filtering

## TypeScript Types

You can generate TypeScript types from your schema:

```bash
supabase gen types typescript --project-id your-project-ref > src/types/database.types.ts
```

## Backup and Restore

Regular backups are handled automatically by Supabase. For manual backups:

```bash
supabase db dump -f backup.sql
```

To restore:
```bash
supabase db reset --db-url your-db-url
```
