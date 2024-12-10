import { useState, useEffect, createContext } from "react"
import { Toaster, toast } from 'sonner';
import axios from "axios"
import { jwtDecode } from "jwt-decode"


export const AuthContext = createContext({});


const AuthProvider = ({children})=> {
    const base_url = import.meta.env.VITE_BASE_URL;
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
    let updateToken = async()=> {
        try {
            const response = await axios.post(`${base_url}api/refresh/`, {refresh: token?.refresh})
            if (response?.status === 200 || response?.status === 201) {
                const decoded = jwtDecode(response?.data?.access);
                // console.log("Decoded", decoded)
                setUser((prev) => ({
                    ...prev,
                    ...decoded,
                }));
                setToken((prev) => ({
                    ...prev,
                    access: response.data.access,
                }));
    
                const updatedToken = { ...token, access: response.data.access };
                const updatedUser = { ...user, ...decoded };

                localStorage.setItem("tokens", JSON.stringify(updatedToken));
                localStorage.setItem("user", JSON.stringify(updatedUser));
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
    }, [token])

    return (
        <AuthContext.Provider value={{
            user, setUser, token, setToken, LOGOUT, isDarkMode
        }}>
            <div>
                <Toaster position="top-center" />
                {children}
            </div>
        </AuthContext.Provider>
    )
}

export default AuthProvider;