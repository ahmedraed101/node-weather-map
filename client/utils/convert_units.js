const epsg3857toEpsg4326 = (pos) => {
    let x = pos[0]
    let y = pos[1]
    x = (x * 180) / 20037508.34
    y = (y * 180) / 20037508.34
    y = (Math.atan(Math.pow(Math.E, y * (Math.PI / 180))) * 360) / Math.PI - 90
    return [x.toPrecision(9), y.toPrecision(9)]
}

export default epsg3857toEpsg4326
