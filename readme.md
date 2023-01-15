Unuseful /!\
Just a warm up in *bash*, *js* (*express*, *react*) that correspond to a project that check an exchange pair price (*Coinbase* currently) from a bash script (*bash* language was mandated but in the project spec but in a normal time it should not be used. The *js* backend should directly request Coinbase).

So once the bash script get the value, it is stored into a sqlite3 database.
Then the backend can query this database and return the requested values.

The react front just call the backend when it should.