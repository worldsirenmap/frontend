// AIzaSyA-QnvZihfO9FXs0ypWVuIUt-xREYKJamY

export default ({lat, lon}) => {
    return <iframe
        width="100%"
        height="100%"
        style={{border: 0}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={"https://www.google.com/maps/embed/v1/view?key=AIzaSyA-QnvZihfO9FXs0ypWVuIUt-xREYKJamY&zoom=20&maptype=satellite&center=" + lat + "," + lon}>
    </iframe>

}