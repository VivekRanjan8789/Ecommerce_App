import express from 'express'
import { createCategoryController, deleteCategoryController, getAllCategoryController, getOneCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// create-category routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update-cateogry routes
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)

// get all category
router.get("/get-category", getAllCategoryController)

// get one category on basis of slug
router.get("/single-category/:slug", getOneCategoryController);

//delete cateory on basis of id
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)

export default router