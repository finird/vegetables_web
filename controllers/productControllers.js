const path = require('path');
const fs = require('fs');

const Product = require('../models/Product');
const { handleError, handleSuccess } = require('../helper/handle');
const ResizeImage = require('../helper/resizeImage');
const ImageSizes = require('../constant/imageSize');
const APIFeatures = require('../utils/APIfeatures');

const productsImagePath = 'public/products';
const productsImage = 'products';

exports.getAll = async (req, res) => {
  const products = await Product.find();
  // let filter = {};
  // if (req.params.product) filter = { product: req.params.product };

  // const features = new APIFeatures(Product.find(filter), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  return handleSuccess(res, {
    data: products
  });
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return handleSuccess(res, {
      data: product
    });
  } catch (e) {
    handleError(res, {
      requestAt: new Date().toISOString(),
      status: 'fail',
      message: 'No product found'
    });
  }
};

exports.createProduct = async (req, res) => {
  console.log(req.body);
  const product = new Product(req.body);
  product.ratingsQuantity = new Date();
  product.storageTime = new Date();
  product.save(function(error) {
    if (error) {
      return handleError(res, {
        message: error.message
      });
    }
    return handleSuccess(res, {
      data: product
    });
  });
};

exports.uploadImage = async (req, res) => {
  const imagePath = path.join(productsImagePath);
  if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath);
  }

  const fileUpload = new ResizeImage(
    imagePath,
    ImageSizes.FullHD,
    req.file.mimetype
  );
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!req.file) {
    return handleSuccess(res, { message: 'Please provide an image' });
  }
  try {
    const filename = await fileUpload.save(req.file.buffer);
    product.images.push(`${productsImage}/${filename}`);
    product.save(err => {
      if (err) {
        return handleError(res, {
          message: err.message
        });
      }
      return handleSuccess(res, {
        filename: `${imagePath}/${filename}`
      });
    });
  } catch (error) {
    return handleError(res, {
      message: error.message
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
          message: err.message
        });
      }
      try {
        fs.unlinkSync(`public/products/${filename}`);
        console.log('File removed');
      } catch (e) {
        console.log(e);
      }
      return handleSuccess(res, {
        data: product
      });
    });
  } else {
    return handleError(res, {
      message: 'Product not found'
    });
  }
};
