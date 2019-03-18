/* 
File Storage

Full CRUD file storage for products.
*/
import fs from 'fs';

const storage = {};
const dataDirectory = `${__dirname}/../../data`;

/*
readFilePromise(filename)

Reads file using fs if can be read, rejects if can't

Parameters: path to file
Returns: promise
*/

let readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
};

/*
getAll()

Gets all files in the data folder to be read,
pushes them to new object with IDs for keys

Parameters: None
Returns: Promise
*/

storage.getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(dataDirectory, (err, files) => {
      if (err) reject(err);

      let promises = [];
      while (files.length) {
        let file = files.shift();
        file = `${dataDirectory}/${file}`;

        if (file.match(/\.json/)) promises.push(readFilePromise(file));
      }

      Promise.all(promises)
        .then(contents => {
          let database = contents.reduce((db, data) => {
            let obj = JSON.parse(data.toString());
            db[obj.id] = obj;
            return db;
          }, {});

          resolve(database);
        })
        .catch(console.log);
    });
  });
};

/*
save(data)

Saves a new product to the data folder as a file

Parameters: Product data
Returns: Promise
*/

storage.save = (data) => {
  return new Promise((resolve, reject) => {
    if (!data.id) {
      reject('No ID given.');
    }
    let file = `${dataDirectory}/${data.id}.json`;
    let text = JSON.stringify(data);
    fs.writeFile(file, text, (err) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

/*
delete(id)

Deletes the file in the data folder with a matching ID

Parameters: Product ID
Returns: Promise
*/

storage.delete = (id) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.unlink(file, (err) => {
      if (err) {
        reject(`${id} not found!`);
      }
      resolve(`${id} deleted`);
    });
  });
};

/*
update(id, criteria)

Updates a file in the data folder matching the ID with the passed in criteria

Parameters: Product ID, new product data
Returns: Promise
*/

storage.update = (id, criteria) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err,data) => {
      if (data) {
        let obj = JSON.parse(data.toString());
        let overwritten = JSON.stringify(Object.assign({},obj,criteria));

        fs.writeFile(file, overwritten, (err) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(overwritten));
        });
      }
      else {
        reject(`${data} not found!`);
      }
    });
  });
};

export default storage;