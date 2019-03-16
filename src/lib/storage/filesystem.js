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

storage.getOne = (id) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err, data) => {
      if (data) {
        let obj = JSON.parse(data.toString());
        resolve(obj);
      }
      else {
        reject(`${id} not found!`);
      }
    });
  });
};

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