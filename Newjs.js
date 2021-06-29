var show_content = document.getElementById('outputmylist');
console.log(show_content.innerHTML);

function onLoad() {
    document.getElementById('searchButton').addEventListener('click', searchAnime)
    showMyList()
    closemylist()
}
//----------     เริ่มค้นหาจากapi  ----------------------//
function searchAnime(event) {
    opensearch()
    let query = document.getElementById('searchInput').value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`,)
        .then((response) => {
            return response.json()
        }).then((data) => {
            data.results.map((element) => {
                // console.log(element)
                addAnimeToCard(element)
            })
        }).catch((err) => {
            console.warn(err.message)
        })
}
//----------  หลังจากดึงข้อมูลเสร็จก็เอามาใส่ในการ์ด     ----------------------//
function addAnimeToCard(anime) {
    
    const searchList = document.getElementById('searchList')
    let card = document.createElement('div')
    card.classList.add("searchcard")
    let img = document.createElement('img')
    img.style.height = "300px"
    img.setAttribute('src', anime.image_url)
    img.addEventListener('dblclick', function () {
        addToFavAnime(anime)
    })
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`

    card.appendChild(titleAnime)
    searchList.appendChild(card)
    

}
//---------------------เเสดงlist------------------------------------//
function showcontentAdd(anime) {
    const searchList = document.getElementById('output2')
    let card = document.createElement('div')
    card.classList.add("searchcard")
    let img = document.createElement('img')
    img.style.height = "300px"
    img.setAttribute('src', anime.image_url)

    let detailbtn = document.createElement('button')
    detailbtn.innerHTML = 'Detail'
    detailbtn.style="margin-left: 5px;background-color: #858585;"
    detailbtn.addEventListener('click', function () {
        alert(anime.title +"\nDetail : "+ anime.synopsis)
    })
    let deletebtn = document.createElement('button')
    deletebtn.innerHTML = 'Delete'
    deletebtn.addEventListener('click', function () {
        delAnime(anime)
    })

    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`

    card.appendChild(titleAnime)
    card.appendChild(detailbtn)
    card.appendChild(deletebtn)
    searchList.appendChild(card)
    
}
//---------- ใช้ตกลงเพิ่ม      ----------------------//
function addToFavAnime(anime) {
    let answer = confirm('Do you want to add '+anime.title+' to my list')
    console.log(answer)
    if (answer == true) {
        console.log('gogo')
        closesearch()
        openmylist()
        addAnimeToData(anime)
    }

}

//---------- ใช้ตกลงลบ      ----------------------//
function delAnime(anime) {
    let answer = confirm('Do you want to delete '+anime.title+' from my list')
    console.log(answer)
    if (answer == true) {
        
    }

}

//----------   เปิดปิดหน้าต่างต่างๆ   ----------------------//

function closesearch() {
    document.getElementById('searchList').style.display = 'none'
}
function opensearch() {
    document.getElementById('searchList').style.display = 'flex'
}
function closemylist() {
    document.getElementById('output2').style.display = 'none'
}
function openmylist() {
    document.getElementById('output2').style.display = 'flex'
}

document.getElementById('myListnav').addEventListener('click', function () {
    closesearch()
    openmylist()
    

})
document.getElementById('homeNav').addEventListener('click', function () {
    closesearch()
    closemylist()

})

function showMyList() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/632110344', {
        method: 'get'
    })
        .then((response) => {
            return response.json()
        }).then(data => {
            data.map((val) => {
                showcontentAdd(val)
                
            });
        })
}



//----------  เพิ่มข้อมูลเข้าdata     ----------------------//
function addAnimeToData(anime) {
    const data = {
        "id": "632110344",
        "movie": {
            "url": anime.url,
            "image_url": anime.image_url,
            "title": anime.title,
            "synopsis": anime.synopsis,
            "type": anime.type,
            "episodes": anime.episodes,
            "score": anime.score,
            "rated": anime.reted
        }
    }

    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        showMyList();
    })
}






























