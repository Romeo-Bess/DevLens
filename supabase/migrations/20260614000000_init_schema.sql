-- DevLens initial db schema

-- Enable RLS
create table if open_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists repositories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references open_profiles(id) on delete cascade not null,
  name text not null,
  full_name text not null,
  description text,
  html_url text not null,
  stars integer default 0,
  forks integer default 0,
  language text,
  size_kb integer default 0,
  languages_json jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists repository_analyses (
  id uuid default gen_random_uuid() primary key,
  repository_id uuid references repositories(id) on delete cascade not null,
  status text default 'pending' not null, -- 'pending', 'running', 'completed', 'failed'
  health_score integer,
  complexity_score integer,
  maintainability_score integer,
  documentation_score integer,
  security_score integer,
  scan_duration_ms integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists architecture_nodes (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references repository_analyses(id) on delete cascade not null,
  node_key text not null,
  label text not null,
  type text not null, -- 'frontend', 'backend', 'database', 'external'
  tech text,
  x_pos double precision default 0.0,
  y_pos double precision default 0.0
);

create table if not exists architecture_edges (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references repository_analyses(id) on delete cascade not null,
  source_node text not null,
  target_node text not null,
  label text,
  animated boolean default false
);

create table if not exists technical_debt_reports (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references repository_analyses(id) on delete cascade not null,
  debt_index text default '1.0x',
  lost_days_monthly double precision default 0.0,
  refactoring_targets_json jsonb default '[]'::jsonb,
  complex_files_json jsonb default '[]'::jsonb
);

create table if not exists dependency_reports (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references repository_analyses(id) on delete cascade not null,
  dependencies_list_json jsonb default '[]'::jsonb
);

create table if not exists security_reports (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references repository_analyses(id) on delete cascade not null,
  critical_count integer default 0,
  high_count integer default 0,
  medium_low_count integer default 0,
  secrets_detected boolean default false,
  vulnerabilities_json jsonb default '[]'::jsonb,
  recommendations_json jsonb default '[]'::jsonb
);

create table if not exists documentation_reports (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references repository_analyses(id) on delete cascade not null,
  system_overview text,
  architecture_summary text,
  onboarding_guide text,
  testing_strategy text
);

create table if not exists ai_conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references open_profiles(id) on delete cascade not null,
  repository_id uuid references repositories(id) on delete cascade not null,
  title text default 'New Conversation',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists ai_messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references ai_conversations(id) on delete cascade not null,
  sender text not null, -- 'user', 'assistant'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) setup
alter table open_profiles enable row level security;
alter table repositories enable row level security;
alter table repository_analyses enable row level security;
alter table architecture_nodes enable row level security;
alter table architecture_edges enable row level security;
alter table technical_debt_reports enable row level security;
alter table dependency_reports enable row level security;
alter table security_reports enable row level security;
alter table documentation_reports enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;

-- Setup RLS Policies
create policy "Users can view their own profile" on open_profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on open_profiles for update using (auth.uid() = id);

create policy "Users can view their own repos" on repositories for select using (auth.uid() = user_id);
create policy "Users can insert their own repos" on repositories for insert with check (auth.uid() = user_id);
create policy "Users can update their own repos" on repositories for update using (auth.uid() = user_id);
create policy "Users can delete their own repos" on repositories for delete using (auth.uid() = user_id);

-- Simple triggers to create profile after auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.open_profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger logic is typically registered inside Supabase dashboards or system scripts.
