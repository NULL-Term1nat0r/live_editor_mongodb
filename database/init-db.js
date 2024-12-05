// init-db.js

// Create a database and add a collection
const db = db.getSiblingDB('documentDB'); // Creates 'my_database' if it doesn't exist
db.createCollection('my_collection'); // Creates a collection 'my_collection'


print('Database and user created successfully');
