import {createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
const swal = require('sweetalert2')


const AuthContext = createContext();

export default AuthContext


export const AuthProvider=({children})=>{
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    //{/*we docode the token and get the useId userImage and ...*/}
    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );


	//{/*while we are trying to login user we cans just this to loading...*/}
	const [loading,setLoading]=useState(true)

	//history is helping us to push to another page, or for redirecting*/}
	const history = useHistory();

    const loginUser = async (email, password) => {
    	const response = await fetch("http://127.0.0.1:8000/accounts/api/v1/token/", {
            method: "POST",
            // <form action="http://127.0.0.1:8000/accounts/api/v1/token/" method="POST" >
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json()
        console.log(data);
        // 200 means everythings is ok
        if(response.status === 200){
            console.log("Logged In");
            // set the access and refresh tokens in local storage
            setAuthTokens(data)
            // set the user data ,user data like email , userid image ... in the localstoreage,
            // for user we have to decode the access token ...
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            history.push("/")
             swal.fire({
                 title: "Login Successful",
                 icon: "success",
                 toast: true,
                 timer: 6000,
                 position: 'top-right',
                 timerProgressBar: true,
                 showConfirmButton: false,
             })

        } else {    
            console.log(response.status);
            console.log("there was a server issue");
             swal.fire({
                 title: "Username or passowrd does not exists",
                 icon: "error",
                 toast: true,
                 timer: 6000,
                 position: 'top-right',
                 timerProgressBar: true,
                 showConfirmButton: false,
             })
        }


    }

    const registerUser = async (email, username, password, password2) => {
    	    const response = await fetch("http://127.0.0.1:8000/accounts/api/v1/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            history.push("/login")

                swal.fire({
                    title: "Registration Successful, Login Now",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
             swal.fire({
                 title: "An Error Occured " + response.status,
                 icon: "error",
                 toast: true,
                 timer: 6000,
                 position: 'top-right',
                 timerProgressBar: true,
                 showConfirmButton: false,
             })
        }
    }

    
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history.push("/login")
         swal.fire({
             title: "YOu have been logged out...",
             icon: "success",
             toast: true,
             timer: 6000,
             position: 'top-right',
             timerProgressBar: true,
             showConfirmButton: false,
         })
    }
    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }
    // we wanna check that if the auth token is exist we wanna to deocde it immadatle
    useEffect(() => {
    	// it means actually a user exists or not
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}