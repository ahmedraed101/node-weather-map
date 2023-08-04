let popupCount = 0
const CreateInfoEl = (info) => {
    const div = document.createElement('div')
    div.classList.add('popup-info')
    div.innerHTML = `
    <p className="degree-real"> Temp/ ${info.current.degree} degrees</p>
    <p className="feels-like">Feels/ ${info.current.feels_like} degrees</p>
    <a href="/images.html" className="images-link" target="_blank">${info.location} imgs> </a>
    `
    return div
}

const CreatePopup = () => {
    let popup = document.createElement('p')
    popup.innerText = 'Loading...'
    popup.classList.add('popup')
    popup.setAttribute('id', `popup-${popupCount++}`)
    const setInfo = (error, info) => {
        if (error) {
            console.log(error)
            popup.innerHTML = `<p style="color:red">${error}</p>`
            return
        }
        popup.innerText = ''
        popup.appendChild(CreateInfoEl(info))
    }
    return { popup, setInfo }
}

export { CreateInfoEl, CreatePopup }
