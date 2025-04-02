const API_KEY = "mlbaWubHYWl4A3phtsnhRlwL8mPBSi5tWnFBBurP"

export async function getSpaceImageDay() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data
}

export async function getListaDeElementos(IWant, tipe) {
    const url = `https://images-api.nasa.gov/search?q=${IWant}&media_type=${tipe}`
    
    const response = await fetch(url)
    const data = await response.json()

    return data.collection.items
}
export async function getRandomSpaceImage(IWant) {
    const data = await getListaDeElementos(IWant, "image")

    const images = data
    if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length)
        return images[randomIndex].links[0].href
    }
    return null // Caso não encontre imagens
}
