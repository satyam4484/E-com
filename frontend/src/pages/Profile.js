import { useLocation } from "react-router";

const Profile = ()=>{
    const location = useLocation();
    console.log(location);

    
    return (
        <h1>hello</h1>
    )
}
export default Profile;