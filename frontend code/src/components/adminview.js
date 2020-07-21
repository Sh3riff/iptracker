import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BodyX, Card } from "../others/Style"
import Map from "./map";

const Adminview = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [registeredUsers, setRegisteredUsers] = useState([])

    const fresher = () => window.location.reload(false);

    useEffect(() => {
        (async () => {
          try {
              if(registeredUsers.length !== 0) return;
              const value =  await fetch(`/list`);
              const refinedValue = await value.json();
              setRegisteredUsers(refinedValue.message)
              setIsLoading(false)
          } catch (error) {
              return console.log(error)
          }
        })()
      }, []);

    if(isLoading) return( <h1>loading...</h1> );

    return (
        <BodyX>
            <div>
                <h1>{registeredUsers.length} USERS CAPTURED</h1>
            </div>
            {registeredUsers.map(user => 
                <Card key={uuidv4()}>
                    <div className="info">
                        <p>USER: {`${user.username}`}</p>
                        <p>IP Address: {`${user.ip}`}</p>
                        <p>CITY: {`${user.city}`}</p>
                        <p>STATE: {`${user.state}`}</p>
                        <p>COUNTRY: {`${user.country}`}</p>
                        <p>LONGITUDE: {`${user.longitude}`}</p>
                        <p>LATITUDE: {`${user.latitude}`}</p>
                        <p>Date: {`${user.Date.slice(0, 10)}`}</p>
                        <p>Time: {`${user.Date.slice(11, 19)}`}</p>
                    </div>
                    <div className="map">
                        <Map lat={parseFloat(user.latitude)} lng={parseFloat(user.longitude)} />
                    </div>
                </Card>                
            )}          
        </BodyX>
    )
}

export default Adminview
