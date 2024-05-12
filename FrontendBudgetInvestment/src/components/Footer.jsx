import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer(){
    return(
        <motion.div id="footer" initial={{opacity: 0 , y: -90}} animate={{opacity:1 , y: 0}} transition={{duration: 0.6}}>
            <div id="box">
                <Link><p>Pomoc</p></Link>
                <Link><p>Praca</p></Link>
                <Link><p>Kontakt</p></Link>
                <Link><p>Regulamin</p></Link>
                <Link><p>Informacje</p></Link>
            </div>
            <p>© 2024 BudgetInvestment By SkynetV5</p>
        </motion.div>
    )
}