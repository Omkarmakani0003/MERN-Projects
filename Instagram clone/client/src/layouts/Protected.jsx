import { Outlet,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux"
import Loader from "../components/loader";

function Protected(){

    const {isLoading,isAuthenticated} = useSelector((state)=>state.auth)

    if(isLoading){
        return (
            <>
               <Loader />
            </>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}

export default Protected
