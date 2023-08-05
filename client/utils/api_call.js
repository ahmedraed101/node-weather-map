const getWeatherData = async (lon, lat, callback) => {
    const response = await fetch(
        `https://node-weahter-map.onrender.com/api/weather?lat=${lat}&lon=${lon}`
    )
    const data = await response.json()
    if (data.error) {
        callback(data.error)
        return
    }
    callback(undefined, data)
}

export default getWeatherData
