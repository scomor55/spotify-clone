import React, { useState , useEffect} from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    const [isCodeUsed, setIsCodeUsed] = useState(false); 

   // console.log(refreshToken)

    useEffect(() => {
     
        if (!code || isCodeUsed) return;

        axios.post('http://localhost:3001/login', { code })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                setIsCodeUsed(true);
                window.history.pushState({},null,"/")
            })
            .catch((error) => {
             //   window.location = "/"
            });
    }, [code,isCodeUsed]);

    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post('http://localhost:3001/refresh', { refreshToken })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            })
            .catch((error) => {
               // window.location = "/"
            });
        },(expiresIn - 60) * 1000)

        return () => clearInterval(interval)

    }, [refreshToken,expiresIn])

    return accessToken; 
}
