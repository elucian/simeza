try {
  console.log('Executing galery-load.js');

  // Array to store the image URLs
  var imageUrls = [];

  // Loop through the image numbers from 1 to 4
  for (var i = 1; i <= 4; i++) {
    // Construct the image URL
    var imageUrl = "galery/picture" + i + ".jpg";
    imageUrls.push(imageUrl);
  }

  // Shuffle the array of image URLs
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  imageUrls = shuffleArray(imageUrls);
  console.log(imageUrls);

  // Use the shuffled array of image URLs in your carousel
  var carouselContainer = document.querySelector(".swiper-wrapper");
  for (var i = 0; i < imageUrls.length; i++) {
    var slide = document.createElement("div");
    slide.classList.add("swiper-slide", "ci");
    var img = document.createElement("img");
    img.classList.add("ci");
    img.src = imageUrls[i];
    img.setAttribute("oncontextmenu", "return false;");
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    slide.appendChild(img);
    carouselContainer.appendChild(slide);
    console.log('Adding slide:', imageUrls[i]);
  }

  // Initialize the Swiper carousel
  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  console.log('Swiper initialized');
} catch (error) {
  console.error('Error in galery-load.js:', error);
}