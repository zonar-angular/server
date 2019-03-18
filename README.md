# Product Web Server
This is a basic Express server that utilizes an Angular front-end to add, edit, delete, and update products. Instead of a persistent database, it uses the npm fs package to store local copies of products in the data folder. Reasons for this include ease of use, simple access, and no required database knowledge for the user.

## Start the Server
**BEFORE YOU START**
Make sure you have a dotenv file with the following:
```PORT=3000 STORAGE=filesystem```

Please run `node index.js` OR `nodemon` in order to start the server. If making changes, I suggest `nodemon` so that the server will automatically update.

## API
Supports full CRUD to products. Has get all, post, put, and delete routes. Sends JSON up to front-end based on successful reads or writes of files.

## Models
### Product
ID - a server-side identification of each product
SKU - a 6-8 digit number assigned to a product by the company for stock-keeping purposes and internal operations
Description - a description of the product
Price - price of the product

## Stop the Server
`Ctrl C` to stop the server.

## TO-DO
- Testing
- Create actual SQL or NoSQL DB
- Use middleware for 404, 400, and 204s