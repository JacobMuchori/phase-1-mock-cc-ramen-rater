const menu = document.querySelector("#ramen-menu");
const details = document.querySelector("#ramen-detail");

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM has loaded")


fetchRamen();
formTaskLister();

function fetchRamen(){
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(dataItems)
}

function dataItems(ramenArr){
    ramenArr.forEach(ramen => {
       //This code creates the image
        createImage(ramen);
    })
}

//code to create image
function createImage(ramen){
    const img = document.createElement("img")
    img.src = ramen.image 
    img.alt = ramen.name 
    img.dataset.id = ramen.id 
    menu.append(img)

    img.addEventListener("click", function(e){
        //helper method to get fetch with id request 
        fetchRamenId(e.target.dataset.id);
    })
}

function fetchRamenId(ramenId){
    fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
        dispDetails(ramen)
    })
}

//code to display our fetched details on the browser window
function dispDetails(ramen){
    const img = document.querySelector(".detail-image");
    const h2 = document.querySelector(".name");
    const h3 = document.querySelector(".restaurant");
    const ratingInput = document.querySelector("#rating-display")
    ratingInput.innerHTML = ramen.rating 
    const commentInput = document.querySelector("#comment-display")
    commentInput.innerHTML= ramen.comment
    img.src = ramen.image;
    img.alt = ramen.name; 
    h2.textContent = ramen.name
    h3.textContent = ramen.restaurant 
    const submitForm = document.querySelector("#new-ramen")
    submitForm.dataset.id = ramen.id;
}

function formTaskLister(){

    const submitForm = document.querySelector("#new-ramen")
    submitForm.addEventListener("submit", function(e) {
        e.preventDefault();
        // console.log(e);
        const newName = document.querySelector("#new-name").value
        const newRestaurant = document.querySelector("#new-restaurant").value
        const newImage = document.querySelector("#new-image").value
        const newRating = document.querySelector("#new-rating").value
        const newComment = document.querySelector("#new-comment").value
        // const r = e.target.rating.value    
        const newObj = {
            name: newName,
            restaurant: newRestaurant,
            image: newImage,
            name: newName,
            rating: newRating,
            comment: newComment
        }
        renderNewImage(newObj)
        e.target.reset();
    })
}

//This function creates a new image
function renderNewImage(newObj){
    const img = document.createElement("img")
    img.src = newObj.image;
    img.alt = newObj.name;
    menu.append(img)

    //This function displays the new images details when clicked.
    img.addEventListener("click", function(e){
        const img = document.querySelector(".detail-image");
        const h2 = document.querySelector(".name");
        const h3 = document.querySelector(".restaurant");
        const ratingInput = document.querySelector("#rating-display")
        ratingInput.innerHTML = newObj.rating
        const commentInput = document.querySelector("#comment-display")
        commentInput.innerHTML= newObj.comment
        img.src = newObj.image;
        img.alt = newObj.name;
        h2.textContent = newObj.name;
        h3.textContent = newObj.restaurant;

    })
    
}
})



