-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  profile_photo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Memories table
create table public.memories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  summary text,
  tags text[] default '{}',
  media_urls text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat History table
create table public.chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  session_id text not null,
  message text not null,
  sender text not null check (sender in ('USER', 'AI')),
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Exports table
create table public.blog_exports (
  id uuid default uuid_generate_v4() primary key,
  memory_id uuid references public.memories(id) on delete cascade not null,
  pdf_url text,
  share_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) policies
alter table public.users enable row level security;
alter table public.memories enable row level security;
alter table public.chat_history enable row level security;
alter table public.blog_exports enable row level security;

-- Users policies
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Memories policies
create policy "Users can view own memories" on public.memories
  for select using (auth.uid() = user_id);

create policy "Users can insert own memories" on public.memories
  for insert with check (auth.uid() = user_id);

create policy "Users can update own memories" on public.memories
  for update using (auth.uid() = user_id);

create policy "Users can delete own memories" on public.memories
  for delete using (auth.uid() = user_id);

-- Chat History policies
create policy "Users can view own chat history" on public.chat_history
  for select using (auth.uid() = user_id);

create policy "Users can insert own chat history" on public.chat_history
  for insert with check (auth.uid() = user_id);

-- Blog Exports policies
create policy "Users can view own blog exports" on public.blog_exports
  for select using (
    exists (
      select 1 from public.memories 
      where memories.id = blog_exports.memory_id 
      and memories.user_id = auth.uid()
    )
  );

create policy "Users can insert own blog exports" on public.blog_exports
  for insert with check (
    exists (
      select 1 from public.memories 
      where memories.id = blog_exports.memory_id 
      and memories.user_id = auth.uid()
    )
  );

-- Functions for updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_updated_at before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.memories
  for each row execute procedure public.handle_updated_at();

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email)
  values (new.id, new.raw_user_meta_data->>'name', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes for better performance
create index idx_memories_user_id on public.memories(user_id);
create index idx_memories_created_at on public.memories(created_at desc);
create index idx_chat_history_user_id on public.chat_history(user_id);
create index idx_chat_history_session_id on public.chat_history(session_id);
create index idx_chat_history_timestamp on public.chat_history(timestamp);
create index idx_blog_exports_memory_id on public.blog_exports(memory_id);
