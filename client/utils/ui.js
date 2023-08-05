let popupCount = 0
const CreateInfoEl = (info) => {
    const div = document.createElement('div')
    div.classList.add('popup-info')
    div.innerHTML = `
    <div>
    <img src="${info.images[0]}" alt="${info.current.weather_descriptions[0]}" />
    <p className="location">${info.location.name}</p>
    </div>
    <div>
    <p className="degree-real">${info.current.temperature} &deg;</p>
    <p className="feels-like">Feels: ${info.current.feelslike} &deg;</p>
    </div>
    `
    return div
}

const CreatePopup = () => {
    let popup = document.createElement('p')
    let closeEl = document.createElement('p')
    closeEl.innerText = 'x'
    closeEl.classList.add('close-popup-el')
    closeEl.addEventListener('click', (e) => popup.remove())
    popup.innerText = 'Loading...'
    popup.appendChild(closeEl)
    popup.classList.add('popup')
    popup.setAttribute('id', `popup-${popupCount++}`)
    const setInfo = (error, info) => {
        if (error) {
            console.log(error)
            popup.innerHTML = `<p style="color:red">${error}</p>`
            return
        }
        popup.innerText = ''
        popup.appendChild(closeEl)
        popup.appendChild(CreateInfoEl(info))
    }
    return { popup, setInfo }
}

export { CreateInfoEl, CreatePopup }
