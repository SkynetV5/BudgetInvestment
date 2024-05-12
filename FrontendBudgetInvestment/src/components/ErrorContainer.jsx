import { motion } from "framer-motion"


export default function ErrorContainer({children}){
    return(
        <motion.div id="error-container" initial={{opacity: 0 , y: -30}} animate={{opacity:1 , y: 0}} transition={{duration: 0.3, type: 'spring', stiffness: 500}}>
            <h1>Błąd!</h1>
            {children}
        </motion.div>
    )
}