import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import Menu from "../components/Menu"
import ProfileContainer from "../components/ProfileContainer"
import { useEffect } from "react";
import '../cssFiles/Profile.css'

function Profile(){
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        
        if(isLoggedIn === 'false'){
            navigate('/');
            }
        }, [])

    return (
        <>
        <Menu/>
        <ProfileContainer/>
        <Footer/>
        </>
    )
}

export default Profile
