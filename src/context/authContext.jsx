import { useState, useEffect, createContext } from "react"
import { Toaster, toast } from 'sonner';
import axios from "axios"
import { jwtDecode } from "jwt-decode"


export const AuthContext = createContext({});


const AuthProvider = ({children})=> {
    const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem("user")) ?? null);
    const [token, setToken] = useState(()=> JSON.parse(localStorage.getItem("tokens")) ?? null);
    const [isDarkMode, setIsDarkMode] = useState(() =>
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event) => {
            setIsDarkMode(event.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const LOGOUT = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("tokens")
        toast.success("Logged Out Successfully")
    }
    console.log(token)

    let updateToken = async()=> {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/refresh/", {refresh: token?.refresh})
            if (response?.status === 200 || response?.status === 201) {
                const decoded = jwtDecode(response?.data?.access);
                console.log(response?.data)
                setToken((prev) => ({
                    ...prev,
                    access: response?.data?.access,
                }));
                setUser(decoded)
                localStorage.setItem("tokens", JSON.stringify(response?.data))
                localStorage.setItem("user", JSON.stringify(decoded));
            }
            else {
                LOGOUT()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        let threeMinutes = 1000 * 60 * 3
        let interval = setInterval(()=> {
            if (token){
                updateToken()
            }
        }, threeMinutes)

        return() => clearInterval(interval)
    },[token])

    return (
        <AuthContext.Provider value={{
            user, setUser, token, setToken, LOGOUT, isDarkMode
        }}>
            <div>
                {children}
                <Toaster position="top-center"
                toastOptions={{
                    // style: { color: 'white', background: 'black', border: "none" },
                }} />
            </div>
        </AuthContext.Provider>
    )
}

export default AuthProvider;