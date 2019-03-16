import express from 'express';
import Product from '../models/product';

const router = express.Router();

const sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(JSON.stringify(data));
  res.end();
};

router.get('/products', (req, res) => {
  Product.getAll().then(
    data => sendJSON(res, data))
    .catch(err => {
      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.write(JSON.stringify(err));
      res.end();
    });
});

router.get('/products/:id', (req,res) => {
  Product.getOne(req.params.id)
  .then(data => { sendJSON(res, data) })
  .catch(err => {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.write(JSON.stringify(err));
    res.end();
  });
});

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

router.delete('/products/:id', (req, res) => {
  Product.deleteOne(req.params.id)
    .then(success => {
      res.statusCode = 204;
      res.statusMessage = 'OK';
      res.end();
    })
    .catch(console.error);
});

router.put('/products/:id', (req,res) => {
  Product.updateOne(req.params.id, req.body)
  .then(data => {
    sendJSON(res,data)
  })
  .catch(err => {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.write(JSON.stringify(err));
    res.end();
  });
});

export default router;