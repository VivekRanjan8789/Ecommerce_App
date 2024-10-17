import Product from "../models/productModel.js"
import Category from "../models/categoryModel.js";
import slugify from "slugify";
import fs from 'fs'

export const createProductController = async (req, res) => {
    console.log("product create hitted");
    
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        
        switch (true) {
            case !name:
                return res.status(501).send({error: "name is required"})
            case !description:
                return res.status(501).send({error: "description is required"})
            case !price:
                return res.status(501).send({error: "price is required"})
            case !category:
                return res.status(501).send({error: "category is required"})
            case !quantity:
                return res.status(501).send({error: "quantity is required"})
            case !shipping:
                return res.status(501).send({error: "shipping is required"})
           case !photo && photo.size > 100000:
                return res.status(501).send({error: "photo is required less than 1 MB"})
        }
        
        const product = new Product({ ...req.fields, slug: slugify(name)})
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product: product
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error from creating product",
            error: error
        })
    }
}

// get all product
export const getAllProductController = async (req,res) =>{
     try {
        const products = await Product.find({}).select("-photo").populate('category').sort({createdAt:-1});
        return res.status(200).send({
            success: true,
            TotalProducts: products.length,
            message: "All Products fetched",
            products
        })
        
     } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error from getAll product",
            error: error
        })
     }
}

// get single product controller
export const getSingleProductcontroller = async (req, res) => {
    const { slug } = req.params
     try {
        const product = await Product.findOne({slug}).select("-photo").populate('category')
        console.log(product);       
        return res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            product
        })
        
     } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error from get One product",
            error: error
        })
     }
}


// get single photo only
export const getPhotoConteoller = async(req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findById(pid).select('photo');        
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType);
            res.status(200).send(product.photo.data)
        }
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error from fetching photo",
            error: error
        })
    }
}

//delete - product
export const deleteProductController = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findByIdAndDelete(pid).select('-photo');        
        return res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            products: product
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error from deleting product",
            error: error
        })
    }
}

// update product
export const updateProductController = async(req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files
        
        switch (true) {
            case !name:
                return res.status(200).send({error: "name is required"})
            case !description:
                return res.status(200).send({error: "description is required"})
            case !price:
                return res.status(200).send({error: "price is required"})
            case !category:
                return res.status(200).send({error: "category is required"})
            case !quantity:
                return res.status(200).send({error: "quantity is required"})
            case !shipping:
                return res.status(200).send({error: "shipping is required"})
           case !photo || photo.size > 100000:
                return res.status(200).send({error: "photo0 is required less than 1 MB"})
        }
        
        const product = await Product.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)}, {new: true});
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product updated Successfully test",
            product: product
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error from updating product",
            error: error
        })
    }
}


// filter product on basis of category and price range
export const filterProductController = async (req, res) => {
    try {
        console.log("filter product hitted on server side");
        
        const { categoriesChecked, radio} = req.body;   // here checked is the array of categories that the we filtering
        console.log(categoriesChecked, radio);
        
        let arg = {};
        if(categoriesChecked.length>0) arg.category = categoriesChecked;
        if(radio.length) arg.price = {$gte: Number(radio[0]), $lte: Number(radio[1])};
        console.log(radio[0], radio[1]);
        
        const products = await Product.find(arg);
        return res.status(200).send({
            success: true,
            message: "filtered succcessfully",
            products
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        })               
    }
}

// get all products counts
export const productCountController = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();
        return res.status(200).send({
            success: true,
            total
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error in product count",
            error
        })       
    }
}

// get list of product by loading
export const productListController = async(req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page? req.params.page : 1;
        const products = await Product.find({})
          .select("-photo")
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            products
        })

        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error in product count",
            error
        }) 
    }
}

// product search controller
export const productSearchController = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        console.log("keyword id: ", keyword);
        
        const products = await Product.find({
            $or : [
                {name: {$regex : keyword, $options: "i"}},
                {description: {$regex : keyword, $options: "i"}}
            ]
        }).select('-photo');
        return res.status(200).send({
            success: true,
            products
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error in search filter",
            error
        })
    }
}

// similar product
export const similarProductController = async(req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await Product.find({
            category: cid,
            _id: {$ne:pid}
        }).select('-photo').limit(3).populate("category")
        return res.status(200).send({
            success: true,
            products
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while fetching similar product",
            error
        })
    }
}

// get product by category
export const productByCategoryController = async (req, res) => {
    try {
        console.log("product by category hitted");
        
        const category = await Category.findOne({slug: req.params.slug})        
        const products = await Product.find({
            category: category
        }).populate('category').select('-photo')
        return res.status(200).send({
            success: true,
            category,
            products
        });      
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while fetching product by category",
            error
        })
    }
}