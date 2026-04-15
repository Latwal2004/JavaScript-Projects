const apiKey = '81892ad5b69f40f3bffa538b709a8774';
const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("searchBtn");

async function fetchRandomNews()
{
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=20&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
         // Check API status
        if (data.status !== "ok") {
            console.error("API Error:", data);
            return [];
        }
       return data.articles || []; //  always return array
    }
    catch(error){
        console.error("Error in fetching random news",error)
        return [];
    }
}
//article filter 
searchBtn.addEventListener("click",async () =>{
    const query = searchField.value.trim();
    if(query !== "")  
        {
            try{
                const articles = await fetchNewsQuery(query);
                displayBlogs(articles);
            }
            catch(error)
            {
                console.log("Error fetching news by query",error);
            }
        }
})

//triggering the search button on enter
searchField.addEventListener("keydown",(e) =>{
    if(e.key  ===  'Enter'){
        searchBtn.click();
    }
});
async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
     if (data.status !== "ok") {
            console.error("API Error:", data);
            return [];
        }
       return data.articles || []; //  always return array
    }
    catch(error){
        console.error("Error in fetching random news",error)
        return [];
    }
}

function displayBlogs(articles){
blogContainer.innerHTML = "";
// Ensure articles is valid and an array; avoids crashes if API returns null, undefined, or incorrect data
    if (!articles || !Array.isArray(articles)) {
        console.error("Invalid articles data:", articles);
        return;
    }


const validArticles = articles.filter(article => article.urlToImage);
validArticles.forEach((article) =>{

    //creating the div container that keeps the whole data.
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');

//image inside the card
    const img = document.createElement('img');

    //or is udes to hanlde the error.
    img.src = article.urlToImage || "https://via.placeholder.com/300";
    img.alt = article.title || "No Image";

//Heading of card
    const title = document.createElement("h2");
    const articleTitle = article.title || "No title available";
    const truncatedTitle = articleTitle.length > 30
    ? articleTitle.slice(0,30) + "...."
    :articleTitle;
    title.textContent = truncatedTitle;

//description ie.para in card
    const description =  document.createElement("p");
    const articleDesc = article.description || "No Description Available";
    const truncatedDesc = articleDesc.length > 200 ? articleDesc.slice(0,200) + "...."
    :articleDesc;
    description.textContent = truncatedDesc;
    //appending the img heading and description to blog card div 
    blogCard.append(img,title,description);
    
//If anyOne clicks on post it redirect to a new url in new tab
    blogCard.addEventListener('click', () =>{
        window.open(article.url,"_blank")
    })
    //appending the blogcard div to blogContainer
    blogContainer.appendChild(blogCard);

})
}

//Iffe to call  a function.
(async () =>{
    try{
       const articles =  await fetchRandomNews();
        displayBlogs(articles);
    }
    catch(error)
    {
        console.error('Error fetching random news',error);
    }

}) ()