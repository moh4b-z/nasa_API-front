


export function criarImgOuVideo(type, url) {
    // Verifica se a URL é do YouTube
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    if (type === 'video') {
        if (isYouTube) {
            const iframe = document.createElement('iframe')
            iframe.src = `https://www.youtube.com/embed/${extrairIDDoVideo(url)}`
            iframe.frameBorder = "0"
            iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            iframe.allowFullscreen = true
            iframe.style.width = "100%"
            iframe.style.height = "auto"
            return iframe
        } else {
            // Se não for do YouTube, criar um elemento de vídeo normal
            const element = document.createElement('video')
            element.src = url
            element.autoplay = true
            element.loop = true
            element.muted = true
            element.style.pointerEvents = 'none'
            element.controls = false;
            element.style.width = "100%"
            element.style.height = "auto"
            return element
        }
    } else if (type === 'image') {
        const element = document.createElement('img')
        element.src = url
        return element
    }

    return null
}

export function extrairIDDoVideo(url) {
    const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})(?:[^\w\s]|$)/
    const match = url.match(regex)
    return match ? match[1] : null
}
