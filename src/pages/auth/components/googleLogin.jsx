import { useEffect } from 'react'

const GoogleLogin = () => {
    useEffect(()=> {
        if (!google) {
            google.accounts.id.initialize({
                client_id: google_auth_id,
                callback: handleSignInWithGoogle,
            });
            google.accounts.id.renderButton(
                document.getElementById('loginDiv'),
                { theme: 'outline', size: 'large', text: 'continue_with', shape: 'circle' }
            );
        }else {
            console.log("Please check your Internet connections")
        }
        return <div id="loginDiv" className='login-options flex flex-col gap-3 font-medium'></div>
    }, [])
}

export default GoogleLogin;