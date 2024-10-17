import Category from "../models/categoryModel.js";
import slugify from "slugify";


// creating new Category
export const createCategoryController = async (req, res) => {
      const {name} = req.body;
      
      try {
        if(!name){
            return res.status(401).send({message: "name is missing"});
          }
    
          const existingCategory = await Category.findOne({name});
          if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "This Category Already Exists!"
            })
          }

          const newCategory = await Category.create({
            name: name,
            slug: slugify(name)
          })
          return res.status(201).send({
            success: true,
            message: "New Category created",
            category: newCategory
          })
        
      } catch (error) {
         return res.status(500).send({
            success: false,
            message: "error while creating Category",
            error: error
         })
      }

}

// updating existing category
export const updateCategoryController = async (req, res) => {
     const { name } = req.body;
     const { id } = req.params;

     try {
       if(!name){
        return res.status(401).send({message: "name is missing"})
       }
       if(!id){
        return res.status(401).send({message: "id is missing"})
       }
      
       // if update category already exist
       const existingCategory = await Category.findOne({name});
          if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "This Category Already Exists!"
            })
          }

       const category =await Category.findByIdAndUpdate(id,{name, slug : slugify(name)}, {new: true})
       console.log(category);

       return res.status(200).send({
            success: true,
            message: "update successful",
            category: category
       })    

     } catch (error) {            
        return res.status(500).send({
           success: false,
           message: "An error occured during updating category",
           error: error
        })
     }
}

// get all category controller
export const getAllCategoryController = async(req, res) => {
    try {
      const category = await Category.find({})
      return res.status(200).send({
        success: true,
        message: "all categoories fetched successfull",
        category
      })
    } catch (error) {
      console.log(error);
      
      return res.status(500).send({
        success: false,
        message: "something went wrong while fetchoing all categories",
        error: error
      })
    }
}


// get one category
export const getOneCategoryController = async (req, res)=>{
  try {
    const { slug } = req.params;
    const category = await Category.findOne({slug});
    return res.status(200).send({
      success: true,
      message: "category fetched successfull",
      category: category
    })
    
  } catch (error) {
      return res.status(500).send({
        success: false,
        message: "somethig went wrong while fetchig one catyegory",
        error: error
      })
  }
}

// delete one category
export const deleteCategoryController = async (req, res) => {
     console.log("delete hitted");
     
     const { id } = req.params
     console.log(id);
     
    try {
      if (!id) {
        return res.status(400).send({
          success: false,
          message: "Category ID is required",
        });
      }
      const category = await Category.findByIdAndDelete(id)
      return res.status(200).send({
        success: true,
        message: "deleted category successful",
        category
      })
      
    } catch (error) {
      console.log(error);     
        return res.status(500).send({
          success: false,
          message: "delete operation failed",
          error: error
        })
    }
}