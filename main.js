'use script'


const API_KEY = "mlbaWubHYWl4A3phtsnhRlwL8mPBSi5tWnFBBurP"




async function getSpaceImageDay() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data
}

async function BackgroundImageDay() {
    const imageUrl = await getRandomSpaceImage()
    document.documentElement.style.setProperty("--fundo", `url(${imageUrl})`)
}

// BackgroundImageDay()

async function getRandomSpaceImage() {
    const url = "https://images-api.nasa.gov/search?q=supernova&media_type=image";
    const response = await fetch(url)
    const data = await response.json()

    const images = data.collection.items
    if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length)
        return images[randomIndex].links[0].href // URL da imagem aleatória
    }
    return null // Caso não encontre imagens
}

async function BackgroundImageRandom() {
    const imageUrl = await getRandomSpaceImage()
    if (imageUrl) {
        document.documentElement.style.setProperty("--fundo", `url(${imageUrl})`)
    }
}

BackgroundImageRandom()



