import fs from 'fs';

const storage = {};
const dataDirectory = `${__dirname}/../../data`;

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

storage.getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(dataDirectory, (err, files) => {
      if (err) {
        reject(err);
      }
      let promises = [];
      while (files.length) {
        let file = files.shift();
        file = `${dataDirectory}/${file}`;
        if (file.match(/\.json/)) {
          promises.push(readFilePromise(file));
        }
      }
      Promise.all(promises).then(contents => {
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

storage.save = (data) => {
  return new Promise((resolve, reject) => {
    if (!data.sku) {
      reject('No SKU given.');
    }
    let file = `${dataDirectory}/${data.sku}.json`;
    let text = JSON.stringify(data);
    fs.writeFile(file, text, (err) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

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

export default storage;