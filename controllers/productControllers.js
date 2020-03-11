const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const { handleError, handleSuccess } = require('../helper/handle');
const ResizeImage = require('../helper/resizeImage');
const productsImagePath = 'public/products';
exports.getAll = async (req, res) => {
  const products = await Product.find();
  return handleSuccess(res, {
    products
  });
};
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.ratingsQuantity = new Date();
  product.storageTime = new Date();
  product.save(function(error) {
    if (error) {
      return handleError(res, {
        message: error
      });
    }
    return handleSuccess(res, {
      product
    });
  });
};

exports.uploadImage = async (req, res) => {
  const imagePath = path.join(productsImagePath);
  if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath);
  }
  const fileUpload = new ResizeImage(imagePath, {
    width: 250,
    height: 250
  });
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!req.file) {
    return handleSuccess(res, { message: 'Please provide an image' });
  }
  try {
    const filename = await fileUpload.save(req.file.buffer);
    product.images.push(`${imagePath}/${filename}`);
    console.log(filename);
    product.save(err => {
      console.log(err);
      if (err) {
        return handleError(res, {
          message: err
        });
      }
      return handleSuccess(res, {
        filename: `${imagePath}/${filename}`
      });
    });
  } catch (error) {
    return handleError(res, {
      message: error
    });
  }
};
exports.deleteImage = async (req, res) => {
  const { id, filename } = req.params;
  const product = await Product.findById(id);
  if (product) {
    product.images = product.images.filter(image => {
      return image.split('/')[2] !== filename;
    });
    product.save(err => {
      if (err) {
        return handleError(res, {
          message: err
        });
      }
      try {
        fs.unlinkSync(`public/products/${filename}`);
        console.log('File removed');
      } catch (e) {
        console.log(e);
      }
      return handleSuccess(res, {
        product
      });
    });
  } else {
    return handleError(res, {
      message: 'Product not found'
    });
  }
};
