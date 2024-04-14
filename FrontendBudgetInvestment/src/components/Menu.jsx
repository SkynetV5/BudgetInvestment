import { Link,  useNavigate } from "react-router-dom"
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
        sessionStorage.setItem('userId', null);
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
            content = <div id="menu-items">
            <div><Button Click={handleClickMenuList} classed="menu-list"><img id='list' src={menuList}/></Button></div>
            <div><Link to='/dashboard'>DashBoard</Link></div>
            <div><Link>Wydatki</Link></div>
            <div><Link>Przychody</Link></div>
            <div><Link>Oszczędności</Link></div>
            <div><Link>Profil</Link></div>
            <div><Button classed="button-logout" Click={handleClickLogout}>Wyloguj</Button></div>
            </div>
        }
        else{
            content = <Button Click={handleClickMenuList} classed="menu-list"><img id='list' src={menuList}/></Button>
        }
    }
    else{
        content =  <>
        <div><Link to='/dashboard'>DashBoard</Link></div>
        <div><Link>Wydatki</Link></div>
        <div><Link>Przychody</Link></div>
        <div><Link>Oszczędności</Link></div>
        <div><Link>Profil</Link></div>
        <div><Button classed="button-logout" Click={handleClickLogout}>Wyloguj</Button></div>
        </>
       
    }
    return(

        
        <div id="menu">
            {content}
        </div>
    )
}