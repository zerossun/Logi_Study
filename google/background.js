const images =["0.jpg","1.jpg","2.jpg"];

const changeImage = images[Math.floor(Math.random() * images.length)];
console.log(changeImage);

const image = document.createElement("img");
image.src =  `img/${changeImage}`
document.body.appendChild(image);