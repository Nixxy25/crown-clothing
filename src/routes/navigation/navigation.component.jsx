import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import'./navigation.styles.scss'


const Navigation = () => {
  const { currentUser } = useContext(UserContext);

    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrownLogo className="logo" />
            </Link>
            
            <div className="nav-links-container">
                <Link className="nav-links" to='/shop'>
                    SHOP
                </Link>
                {
                  currentUser ? (
                    <span className="nav-links" onClick={signOutUser}>SIGN OUT</span>
                  ) : ( <Link className="nav-links" to='/auth'>
                    SIGN IN
                 </Link>
                  )
                }
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  };
  
  export default Navigation;