#smart-brain-api

Postgresql Table Creation:

CREATE TABLE IF NOT EXISTS public.users
(
    id serial primary key,
    name varchar(100) NOT NULL,
    email text UNIQUE NOT NULL,
    entries bigint DEFAULT 0,
    joined timestamp without time zone NOT NULL
)

CREATE TABLE IF NOT EXISTS public.login
(
    id serial primary key,
    hash varchar(100) NOT NULL,
    email text UNIQUE NOT NULL
)