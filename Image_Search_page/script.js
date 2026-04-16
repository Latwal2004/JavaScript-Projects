const accessKey = `GghkK6J2VAvYVgxODeakUUyb2KRBb_4VFPxCX8qqgrQ`;

const formElement = document.querySelector("form");
const inputElement = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.getElementById('showMoreBtn');

let inputData = "";
let page = 1;

async function searchImages(){
inputData = inputElement.value.trim();
if(!inputData)
    {
        alert("Please Enter something for results.....!");
        return;
    }
 try{
        showMoreBtn.textContent = 'Loading...'

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
        const response  = await fetch(url);
        const data = await response.json();


        const results = data.results;
        if(page === 1){
            searchResults.innerHTML = "";
        }

        results.forEach((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result")

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description || "Image";

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description || "View Image";

        imageWrapper.append(image,imageLink)
        searchResults.append(imageWrapper);
    });

        page++;
        showMoreBtn.style.display = 'block';
        showMoreBtn.textContent = 'Show More';
    }
    catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
}
formElement.addEventListener("submit",(event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMoreBtn.addEventListener(('click'),() =>{
    searchImages()
})