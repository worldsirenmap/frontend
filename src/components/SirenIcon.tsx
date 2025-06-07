type SirenIconProps = {
    icon: string
    scale?: number
}

export default ({icon, scale}: SirenIconProps) => {
    const iconSrc = import.meta.env.VITE_WSM_SERVER_URL + "/assets/siren-icons/" + icon + ".svg"
    return <img alt="Icon" height={scale ? 60 * scale : 60} width={scale ? 40 * scale : 40} src={iconSrc}/>
}