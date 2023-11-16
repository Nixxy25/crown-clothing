import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

import'./navigation.styles.scss'

const Navigation = () => {
    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrownLogo className="logo" />
            </Link>0
            
            <div className="nav-links-container">
                <Link className="nav-links" to='/shop'>
                    SHOP
                </Link>
                
                <Link className="nav-links" to='/auth'>
                   SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  };
  
  export default Navigation;