CREATE TABLE gold_entries (
 space TEXT NOT NULL,
 id TEXT NOT NULL,
 person INTEGER NOT NULL CHECK (person IN (0,1)),
 delta INTEGER NOT NULL,
 comment TEXT NOT NULL DEFAULT '',
 at INTEGER NOT NULL,
 deleted INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY (space,id)
);
CREATE TABLE gold_members (
 space TEXT NOT NULL,
 person INTEGER NOT NULL CHECK (person IN (0,1)),
 name TEXT NOT NULL,
 PRIMARY KEY (space,person)
);
