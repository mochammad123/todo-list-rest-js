-- Jalankan manual jika database sudah ada sebelum kolom email ditambahkan:
-- docker exec -it todo-postgres psql -U postgres -d todo_db -f /path/migrate-add-email.sql

ALTER TABLE users ADD COLUMN IF NOT EXISTS email CITEXT;

UPDATE users
SET email = username || '@placeholder.local'
WHERE email IS NULL;

ALTER TABLE users ALTER COLUMN email SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email);
