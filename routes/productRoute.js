import express from 'express'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createProductController, deleteProductController, getAllProductController, getPhotoConteoller, getSingleProductcontroller, updateProductController, filterProductController, productCountController, productListController, productSearchController, similarProductController, productByCategoryController, braintreeTokenController, braintreePaymentController } from '../controllers/productController.js';

const router = express.Router();

// routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get products
router.get('/get-products', getAllProductController)

//get one produt
router.get('/single-product/:slug', getSingleProductcontroller)

// get photo from product
router.get('/product-photo/:pid', getPhotoConteoller);

// delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// filter product
router.post('/filter-product', filterProductController);

// total product count
router.get('/count-product', productCountController);

// get product list by pagination
router.get('/product-list/:page', productListController);

// filter by search
router.get('/product-search/:keyword', productSearchController);

// get similar product
router.get('/product-similar/:pid/:cid', similarProductController);

// get product by category
router.get('/product-category/:slug', productByCategoryController);

// payment routes
// token
router.get('/braintree/token', braintreeTokenController);

// payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController);


export default router;