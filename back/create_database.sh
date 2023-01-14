#!/bin/bash

sqlite3 database.db << EOF

# Create tables
CREATE TABLE prices (date DATE PRIMARY KEY, peer TEXT, price REAL);
