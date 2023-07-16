const accessKey = "8h27rluv5s0HK17g3mwb2IBakFDZzVUcvIcgoFGvHv4"

const form = document.querySelector("form")
const searchInput = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMoreButton = document.getElementById("show-more-button")
const instruction = document.getElementById("instruction");

let page,inputData = "";

async function searchImages(){
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const fetchedData = await response.json();
    if(page == 1){
        searchResults.innerHTML = " ";
    }
    processData(fetchedData);
}

function processData(array){
    const results  = array.results;

    if(results.length == 0){
        instruction.innerHTML = "Sorry we can't found the result";
        instruction.style.display = "block";
    }
    results.map((res)=>{
        const imagWraper = document.createElement("div")
        imagWraper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = res.urls.small;
        image.alt = res.alt_description;
        const imageLink = document.createElement("a")
        imageLink.href = res.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = res.alt_description;
        
        imagWraper.appendChild(image);
        imagWraper.appendChild(imageLink);
        searchResults.appendChild(imagWraper);
        
    })

    page++;
    
    if(page > 1 && results.length > 0){
        showMoreButton.style.display = "block";
    }

}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    instruction.style.display = "none";
    page = 1; 
    searchImages();
})

showMoreButton.addEventListener("click",()=>{
    searchImages();
})