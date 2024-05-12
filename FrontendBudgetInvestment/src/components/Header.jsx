import { motion } from "framer-motion"

export default function Header(){
    return(
        <motion.div id="header" initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}}  transition={{duration: 0.8 , type: 'spring', stiffness: 200}}>
            <img src="/budgetInvestment-logo.png"/>
            <h1>Prowadź swoje oszczędności oraz kontroluj wydatki wraz z aplikacją Budget Investment</h1>
        </motion.div>
    )
}