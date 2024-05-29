import { Link,  useNavigate } from "react-router-dom"
import { motion , AnimatePresence } from "framer-motion";
import "../cssFiles/Menu.css"
import Button from "./Button"
import { useState, useEffect } from "react";

import menuList from "../assets/more.png";

export default function Menu(){

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuListClicked,setIsMenuListClicked] = useState(false);

    const navigate = useNavigate();
    function handleClickLogout(){
        sessionStorage.setItem('isLoggedIn', 'false');
        sessionStorage.setItem('userId','');
        navigate("/");
    }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    function handleClickMenuList(){
        if(isMenuListClicked){
            setIsMenuListClicked(false);
        }
        else{
            setIsMenuListClicked(true);
        }

    }

    let content = '';
    if(windowWidth <= 1200){
        if(isMenuListClicked){
            content =<motion.div id="menu-items" initial={{opacity: 0 , y: -30}} animate={{opacity:1 , y: 0}} exit={{ opacity:0 , x: -30}} transition={{duration: 0.5, type:'spring', stiffness:200}}>
            <motion.div><Button Click={handleClickMenuList} classed="menu-list"><img id='list' src={menuList}/></Button></motion.div>
            <motion.div whileHover={{scale: 1.1}} animate={{opacity: [0,0.5,1]}}><Link to='/dashboard'>DashBoard</Link></motion.div>
            <motion.div whileHover={{scale: 1.1}} animate={{opacity: [0,0.5,1]}}><Link to='/account'>Konto</Link></motion.div>
            <motion.div whileHover={{scale: 1.1}} animate={{opacity: [0,0.5,1]}}><Link to='/savings'>Oszczędności</Link></motion.div>
            <motion.div whileHover={{scale: 1.1}} animate={{opacity: [0,0.5,1]}}><Link to='/profile'>Profil</Link></motion.div>
            <motion.div animate={{opacity: [0,0.5,1]}}><Button classed="button-logout" Click={handleClickLogout}>Wyloguj</Button></motion.div>
            </motion.div>
        }
        else{
            content = <Button Click={handleClickMenuList} classed="menu-list"><img id='list' src={menuList}/></Button>
        }
    }
    else{
        content =  <>
        <motion.div whileHover={{scale: 1.1}}><Link to='/dashboard'>DashBoard</Link></motion.div>
        <motion.div whileHover={{scale: 1.1}}><Link to='/account'>Konto</Link></motion.div>
        <motion.div whileHover={{scale: 1.1}}><Link to='/savings'>Oszczędności</Link></motion.div>
        <motion.div whileHover={{scale: 1.1}}><Link to='/profile'>Profil</Link></motion.div>
        <motion.div><Button classed="button-logout" Click={handleClickLogout}>Wyloguj</Button></motion.div>
        </>
       
    }
    return(

        
        <motion.div id="menu"  initial={{opacity: 0 , y: -30}} animate={{opacity:1 , y: 0}} exit={{ opacity:0 , x: -30}} transition={{duration: 0.5}}>
            <AnimatePresence>
            {content}
            </AnimatePresence>
        </motion.div>
        
    )
}