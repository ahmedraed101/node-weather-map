import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj'
import Overlay from 'ol/Overlay.js'
import getWeatherData from './utils/api_call'
import epsg3857toEpsg4326 from './utils/convert_units'
import { CreateInfoEl, CreatePopup } from './utils/ui'

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'map',
    view: new View({
        center: fromLonLat([31.024562, 31.382233]),
        zoom: 6,
    }),
})

map.addEventListener('click', (e) => {
    // console.log(epsg3857toEpsg4326(e.coordinate))
    const [lat, lon] = epsg3857toEpsg4326(e.coordinate)
    const { popup: popupEl, setInfo } = CreatePopup()
    const popup = new Overlay({
        element: popupEl,
    })
    popup.setPosition(e.coordinate)
    map.addOverlay(popup)
    getWeatherData(lat, lon, setInfo)
})
