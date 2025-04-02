
export function criarCard(dados) {
    const card = document.createElement("div")
    card.className = "card"

    // Título
    const h2 = document.createElement("h2")
    h2.textContent = dados.data[0].title
    card.appendChild(h2)

    // Descrição
    const p = document.createElement("p")
    p.textContent = dados.data[0].description
    card.appendChild(p)

    // Data de criação
    const spanDate = document.createElement("span")
    spanDate.textContent = `Data: ${new Date(dados.data[0].date_created).toLocaleDateString()}`
    card.appendChild(spanDate)

    // Centro responsável
    const spanCenter = document.createElement("span")
    spanCenter.textContent = `Centro: ${dados.data[0].center}`
    card.appendChild(spanCenter)

    // Criador secundário (se existir)
    if (dados.data[0].secondary_creator) {
        const spanCreator = document.createElement("span")
        spanCreator.textContent = `Criado por: ${dados.data[0].secondary_creator}`
        card.appendChild(spanCreator)
    }

    // Imagem
    const img = document.createElement("img")
    img.src = dados.href
    img.alt = dados.data[0].title
    card.appendChild(img)

    return card
}


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
