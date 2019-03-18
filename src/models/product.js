/*
Product Model

This class constructs and/or calls methods based on API routes

Methods
save - Saves product as file to data folder
getAll() - Gets all products
deleteOne(id) - Deletes file from data folder based on ID
updateOne(id, criteria) - Updates file from data folder based on ID with criteria
*/

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid';

class Product {
  constructor(config) {
    this.id = uuid();
    this.sku = config && config.sku || '';
    this.description = config && config.description || '';
    this.price = config && config.price || '';
  }

  save() {
    return storage.save(this);
  }

  static getAll() {
    return storage.getAll();
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

  static updateOne(id, criteria) {
    return storage.update(id, criteria);
  }
}
 
export default Product;