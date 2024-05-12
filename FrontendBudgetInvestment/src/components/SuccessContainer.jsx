import { motion, AnimatePresence } from "framer-motion"

export default function SuccessContainer({children}){
    return(
            <motion.div id="success-container" initial={{opacity: 0 , y: -30}} animate={{opacity:1 , y: 0}} exit={{opacity:0, y:-30}} transition={{duration: 0.5}}>
                <h1>Sukces!</h1>
                {children}
            </motion.div>
        
    )
}