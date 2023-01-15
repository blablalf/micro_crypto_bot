#!/bin/bash

# Get absolute path of the script file and cd to it
script_path="$(dirname "$(realpath "$0")")"
cd $script_path

# Create base and table
sqlite3 $script_path/database.db << EOF
CREATE TABLE prices (date DATE PRIMARY KEY, pair TEXT, price REAL);
