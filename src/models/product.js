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

  static getOne(id) {
    return storage.getOne(id);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

  static updateOne(id, criteria) {
    return storage.update(id, criteria);
  }
}
 
export default Product;