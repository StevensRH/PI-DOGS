import "./Landing.module.css"
import style from "./Landing.module.css"
import { Link } from 'react-router-dom';
function Landing (){
    return(
        
        <div className={style.landing}>
           <h1>BIENVENIDO</h1>

     <Link to="/home" className={style.link}>INGRESAR</Link>
        </div>
        )
}
export default Landing;