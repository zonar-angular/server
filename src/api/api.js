/*
Routing module

Utilizes Express routing. Sends JSON data up to be served on front-end.
Four main routes: Get All, Post, Delete, Update
*/

import express from 'express';
import Product from '../models/product';
import { sendJSON } from '../functions/sendJSON';
import { send404 } from '../functions/send404';

const router = express.Router();

/*
get(url, callback)

Once all files read, returns all products from read files up or 404s

Parameters: url, callback
Returns: All products
*/

router.get('/products', (req, res) => {
  Product.getAll().then(
    data => sendJSON(res, data))
    .catch(err => {
      send404(res);
    });
});

/*
post(url, callback)

Once new product saved to file, returns it or if data bad returns 400

Parameters: url, callback
Returns: New product
*/

router.post('/products', (req, res) => {
  if(Object.keys(req.body).length === 0) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  } else {
    let product = new Product(req.body);
    product.save()
      .then(data => sendJSON(res, data))
      .catch(console.error);
  }
});

/*
delete(url, callback)

Once product file deleted, returns 204. Returns 404 if product doesn't

Parameters: url, callback
Returns: Nothing
*/

router.delete('/products/:id', (req, res) => {
  Product.deleteOne(req.params.id)
    .then(success => {
      res.statusCode = 204;
      res.statusMessage = 'OK';
      res.end();
    })
    .catch(err => {
      send404(res);
    });
});

/*
put(url, callback)

Once product file updated, sends updated product. If product doesn't exist, send 404

Parameters: url, callback
Returns: Updated product
*/

router.put('/products/:id', (req,res) => {
  Product.updateOne(req.params.id, req.body)
  .then(data => {
    sendJSON(res,data)
  })
  .catch(err => {
    send404(res);
  });
});

export default router;