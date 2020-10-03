

let menu = $("#triggle"),
leftMenu= $(".leftMenu"),
rightMenu= $(".rightMenu"),
menu_Items =$(".nav-item li")

menu.click(function(){
    let width = leftMenu.outerWidth(); 
    
    if(menu.attr("class")=="open")
    {
        menu.removeClass("open").addClass("close");
        leftMenu.animate({"left":`0px`},1000);
        rightMenu.animate({"left":`${width}`},1000);
        for(let i=1 ;i<=menu_Items.length;i++)
        {
            $(`.item${i}`).animate({"opacity":"1","paddingTop":"25px"},i*100+1000)
        }
    }
    else{
        menu.removeClass("close").addClass("open");
        leftMenu.animate({"left":`-${width}`},1000);
        rightMenu.animate({"left":`0px`},1000, function(){
            menu_Items.animate({"opacity":"0","paddingTop":"500px"},1000)
        });
        
    }
})

let allMovies=[];
let moviesContainer = document.getElementById("movies-container");
let imgPath="https://image.tmdb.org/t/p/w500";
let category = "now_playing";
let page = document.querySelectorAll(".page")


async function getMovies(category ,page="1"){
    let MoviesResponse= await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=${page}`)
    MoviesResponse = await MoviesResponse.json();
    allMovies=MoviesResponse.results;
    displayMovies();
}

function displayMovies(){
    let omnia ="";
    for(let i=0 ; i< allMovies.length ;i++)
    {
        omnia+=`<div class="col-md-4 mb-4">
        <div class="movie-item">
        <img src="${imgPath+allMovies[i].poster_path}" class"img-fluid">
        <div class="layer">
        <h3>${allMovies[i].title}</h3>
        <p>${allMovies[i].overview}</p>
        <p> rate ${allMovies[i].vote_average}</p>
        <p>${allMovies[i].relase_date}</p>
        </div>
        </div>
        </div>`
    }
    moviesContainer.innerHTML=omnia;
}

let menu_items =document.querySelectorAll(".nav-item a");
for(let i=0 ;i< menu_items.length ;i++)
{
    menu_items[i].addEventListener("click" , function(){
        category = this.getAttribute("movieTitle");
        getMovies(category)
    })
}

//search///
//search by word//

let searchByWord = document.getElementById("searchByWord");
let search = document.getElementById("search");
let searchResultContainer = document.getElementById("searchResult");
let searchResult =[];
searchByWord.addEventListener("keyup" , function(){
    searchWord(searchByWord.value);
})
async function searchWord(query)
{
    if(query == "")
    {
        searchResultContainer.innerHTML="";
        return false;
    }

    let MoviesResponse =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${query}&page=1&include_adult=false`)
    MoviesResponse = await MoviesResponse.json();
    searchResult = MoviesResponse.results;
    displayResult();
}

function displayResult()
{
    let temp="";
    for(let i=0;i<searchResult.length;i++)
    {
        temp+=`<div class="col-md-4 mb-4">
        <div class="movie-item">
            <img src="${imgPath+searchResult[i].poster_path}" class="img-fluid">
            <div class="layer">
                <h3>${searchResult[i].title}</h3>
                <p>${searchResult[i].overview}</p>
                <p>Rate${searchResult[i].vote_average}</p>
                <p>${searchResult[i].release_date}</p>
            </div>
        </div>
    </div>`
    }
    searchResultContainer.innerHTML=temp;
}

                //search by word//

search.addEventListener("keyup" , function(){
    searchMovies (search.value);
})

function searchMovies(word)
{
    let Result="";
    if(word=="")
    {
        return false 
    }
    for(let i=0;i<allMovies.length;i++)
    {
        if(allMovies[i].title.toLowerCase().includes(word.toLowerCase())==true)
        {
            Result+=`<div class="col-md-4">
            <div class="movie-item">
                <img src="${imgPath+allMovies[i].poster_path}" class="img-fluid">
                <div class="layer">
                    <h3>${allMovies[i].title}</h3>
                    <p>${allMovies[i].overview}</p>
                    <p>Rate${allMovies[i].vote_average}</p>
                    <p>${allMovies[i].release_date}</p>
                </div>
            </div>
        </div>`;
        }
    }
    searchResultContainer.innerHTML=Result;

}

for(let i=0;i<page.length;i++)
{
    page[i].addEventListener("click",function(){
        console.log(this.innerText)
        getMovies(category,this.innerText)
    })
}
getMovies(category);

 