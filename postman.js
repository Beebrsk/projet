function searchAnime(event)
{
    let query = document.getElementById('searchInput').value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`,)
    .then ((response) =>{
        return response.json()
    }).then((data) => {
        data.results.map((element) =>{
            console.log(element)
            addAnimeToCard(element)
        })
    }).catch((err) => {
        console.warn(err.message)
    })
}
function onLoad(){
    document.getElementById('searchButton').addEventListener('click',searchAnime)
}

function addAnimeToData(anime) {
    let imageElem = document.getElementById('image')
    imageElem.setAttribute('src',anime.image_url)
    let titleElem = document.getElementById('title')
    titleElem.innerHTML = anime.title
}

function addAnimeToCard(anime){
    const searchList= document.getElementById('searchList')
    let row = document.createElement('row')
    let card = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    img.addEventListener('dblclick',addToFavAnime())
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`

    card.appendChild(titleAnime)
    searchList.appendChild(card)
}


function addToFavAnime(){
    
}