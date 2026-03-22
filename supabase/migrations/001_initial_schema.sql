-- Aktera MVP Database Schema
-- Run with: supabase db push (or manually in Supabase SQL editor)

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ── Properties (dossiers) ──
create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  address text not null,
  city text not null,
  postal_code text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Documents (one per type per property) ──
create type document_type as enum (
  'epc',
  'bodemattest',
  'kadastrale_legger',
  'elektrische_keuring',
  'eigendomsakte',
  'asbestattest'
);

create type document_status as enum (
  'missing',
  'uploaded',
  'extracting',
  'extracted',
  'verified'
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  type document_type not null,
  status document_status not null default 'missing',
  file_name text,
  file_path text, -- path in Supabase Storage
  uploaded_at timestamptz,
  extracted_at timestamptz,
  created_at timestamptz not null default now(),
  -- Each property should have at most one document per type
  unique(property_id, type)
);

-- ── Extracted Fields ──
create type confidence_level as enum ('high', 'medium', 'low');

create table if not exists extracted_fields (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null references documents(id) on delete cascade,
  field_name text not null,
  field_label text not null,
  field_value text,
  original_value text, -- preserved for audit trail
  confidence confidence_level not null default 'medium',
  verified boolean not null default false,
  updated_at timestamptz not null default now(),
  -- Each document should have at most one field per name
  unique(document_id, field_name)
);

-- ── Generated Contracts ──
create table if not exists contracts (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  type text not null default 'compromis',
  file_path text, -- path in Supabase Storage
  generated_at timestamptz not null default now()
);

-- ── Indexes ──
create index if not exists idx_documents_property on documents(property_id);
create index if not exists idx_fields_document on extracted_fields(document_id);
create index if not exists idx_contracts_property on contracts(property_id);

-- ── Updated_at trigger ──
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
  before update on properties
  for each row execute function update_updated_at();

create trigger extracted_fields_updated_at
  before update on extracted_fields
  for each row execute function update_updated_at();

-- ── Storage buckets (run in Supabase dashboard or via API) ──
-- insert into storage.buckets (id, name, public)
-- values ('documents', 'documents', false),
--        ('contracts', 'contracts', false);
