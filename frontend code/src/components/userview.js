import React, { useState, useEffect } from 'react';
import { dataFetcher } from "../others/helperFunctions";
import { UserViewX } from "../others/Style"

const Userview = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        ip: '',
        city: '',
        state: '',
        country: '',
        latitude: '',
        longitude: '',

    })
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    
    const updateUsername = (e) => {
        setUserInfo( {...userInfo, username: e.target.value} )
        setMessage("")
    };
    
    const handleSubmit = async (e) =>{
        try {
            e.preventDefault();
            console.log(userInfo)
            const submitter =  await fetch("/user", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const response = await submitter.json()
            setMessage(response.message)
            setUserInfo( {...userInfo, username: ""} )
        } catch (error) {
            setMessage("Network error, try again")       
        }
    };
    

    useEffect(() => {
        dataFetcher( userInfo, setUserInfo, setMessage )
        setIsLoading(false)
    }, [])

    if (isLoading) return ( <h1>Page loading</h1> )
    return (
        <UserViewX>
            <h1>Welcome, kindly input your username</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userInfo.username} onChange={ (e) => updateUsername(e)} placeholder="username" required/>
                <input type="submit" value="SUBMIT"/>
            </form>
            <h3>{message}</h3>
            
        </UserViewX>
    )
}

export default Userview
