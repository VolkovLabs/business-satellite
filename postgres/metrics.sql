CREATE TABLE metrics (
    id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created timestamp with time zone NOT NULL,
    name text NOT NULL,
    value DOUBLE PRECISION NULL
);

insert into metrics values(1, now(), 'test', 123);