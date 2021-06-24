function onLoad(){
    document.getElementById('searchButton').addEventListener('click',searchAnime)
}
//----------     เริ่มค้นหาจากapi  ----------------------//
function searchAnime(event)
{
    opensearch()
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
//----------  หลังจากดึงข้อมูลเสร็จก็เอามาใส่ในการ์ด     ----------------------//
function addAnimeToCard(anime){
    const searchList= document.getElementById('searchList')
    let card = document.createElement('div')
    card.classList.add("searchcard")
    let img = document.createElement('img')
    img.style.height="300px"
    img.setAttribute('src',anime.image_url)
    img.addEventListener('dblclick',function(){
        addToFavAnime()
    })
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`

    card.appendChild(titleAnime)
    searchList.appendChild(card)
    
}

//---------- ใช้ตกลง      ----------------------//
function addToFavAnime(){
    let answer = confirm('Are you sure')
    console.log(answer)
    if(answer==true){
        console.log('gogo')
        addSearchToDB(anime)
        closesearch()
    }
                     
}
//----------   ปิดหน้าข้อมูลค้นหา    ----------------------//
function closesearch(){
    document.getElementById('searchList').style.display='none'      
}
function opensearch(){
    document.getElementById('searchList').style.display='flex'
    
        
}
document.getElementById('myListnav').addEventListener('click',function(){
    function showMyList(){
        outputmylist.innerHTML = ''
        fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110344`)
        .then((response) =>{
            return response.json()
        }).then(data =>{
            mylist(data)
        })
    }
})


//----------  เพิ่มข้อมูลเข้าdata     ----------------------//
function addAnimeToData(anime) {
    
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {

        console.log(data)
        output.innerHTML=''
        showMyList()
        
        
    })
}






























