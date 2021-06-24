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
    let titleElem = document.geaElementById('title')
    titleElem.innerHTML = animeatitle
    
   
}
function addAnimeToCard(anime){
    const searchList= document.getElementById('searchList')
    let col = document.createElement('col')
    let card = document.createElement('div')
    let img = document.createElement('img')
    
    img.setAttribute('src',anime.image_url)
    as
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    card.style.border="3px solid white"
    

    card.appendChild(titleAnime)
    searchList.appendChild(card)
}

function addAnimeTolist(anime){
    console.log(anime.mal_id)
       fetch ()
}