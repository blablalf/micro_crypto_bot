#!/bin/bash

# Get absolute path of the script file
script_path="$(dirname "$(realpath "$0")")"

# Change current dir to this path
cd $script_path

# Create the database if the file doesn't exist
if ! [ -f $script_path/database.db ]; then
    bash $script_path/create_database.sh
fi

# Define the peer we are looking for
peer="ETH-USD"

# Get the price of ETH/USDT
price=$(curl -s https://api.coinbase.com/v2/prices/$peer/spot | jq -r '.data.amount')

# Get the current date
date=$(date '+%Y-%m-%d %T')

# Insert the price and date into the database
sqlite3 $script_path/database.db << EOF
INSERT INTO prices (date, price, peer) VALUES ('$date', $price, '$peer');
EOF

databaseContent=$(sqlite3 -batch database.db "SELECT * FROM prices;")

echo "databaseContent = $databaseContent"