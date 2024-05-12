import { motion } from "framer-motion"

export default function Button({children, classed, Click}){

    let x = 0;
    let scale = 1.2;
    let type = 'spring';
    let stiffness = 300;
    if( classed === 'menu-list'){
        scale = 1.0;
        stiffness: 0;
    }
    return (
        <motion.button className={classed} onClick={Click} style={{x: x}} whileHover={{scale: scale}} transition={{ type: type,stiffness: stiffness}} >{children}</motion.button>
    )
}