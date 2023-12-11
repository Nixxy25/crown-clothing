import { Outlet } from "react-router-dom";
import Category from "../../components/categories/categories.component";


const Home = () => {
  return (
    <div>
        <Outlet/>
        <Category  />
    </div>
  
  )
}

export default Home;
