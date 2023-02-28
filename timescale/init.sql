CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

CREATE TABLE metrics (
    id integer NOT NULL,
    time timestamp with time zone NOT NULL,
    name text NOT NULL,
    value DOUBLE PRECISION NULL
);

SELECT create_hypertable('metrics','time');

CREATE INDEX ix_metrics_name_time ON metrics (name, time DESC);

insert into metrics values(1, now(), 'test', 123);
insert into metrics values(2, now(), 'test2', 224);