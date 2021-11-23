import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RedirectToTop = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/');
    });
    return(
        <>Redirecting...</>
    );
}

export default RedirectToTop;