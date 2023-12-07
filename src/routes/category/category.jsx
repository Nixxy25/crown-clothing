import { useParams, use } from "react-router-dom";

import "./category.scss";

import { CategoriesContext } from "../../context/categories.context";

const Category = () => {
  return (
    <div>
        const { category } = useParams();
        const { categoriesMap} = useContext(CategoriesContext);
        const products = categoriesMap[category];
    </div>
  )
}

export default Category;