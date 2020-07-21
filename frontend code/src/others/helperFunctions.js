export const dataFetcher = async (userInfo, setUserInfo, setMessage) => {
    try {
        const GetIpAddress = await fetch("https://api6.ipify.org/?format=json")
        const ipAddress = await GetIpAddress.json()
        const GetIpDetails = await fetch(`https://ipapi.co/${ipAddress.ip}/json`)
        const ipDetails = await GetIpDetails.json()
        const { city, region, country_name, longitude, latitude } = ipDetails
        setUserInfo( {...userInfo,
            ip: ipAddress.ip,
            city,
            state: region,
            country: country_name,
            longitude,
            latitude
        } )
    } catch (error) {
        setMessage('Network error! Try again later.')
    }
     
}