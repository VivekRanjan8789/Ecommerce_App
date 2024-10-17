import { useState, useEffect } from "react";
import axios from "axios";

export default function  useCategory() {
    const [categories, setCategories] = useState([]);

        // get categories
        const getAllCategories = async () => {
            try {
                const { data } = await axios.get(
                `${process.env.REACT_APP_API}/category/get-category`
                );
                setCategories(data?.category);
                console.log("all categories are", categories);
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {
            getAllCategories();
        }, []);

        return categories;
}