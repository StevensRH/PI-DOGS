import {Link} from "react-router-dom"
import style from "./navBar.module.css"

function NavBar(){
    return(
        <div className={style.main}>
            <Link to="/home">HOME</Link>
            <Link to="/"></Link>
        </div>
    )
}

export default NavBar;