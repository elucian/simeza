try {
    console.log('Executing galery-load.js');
  
    // Array to store the image URLs
    var imageUrls = [];
  
    // Load the first 10 images eagerly
    for (var i = 1; i <= 10; i++) {
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
  
    // Add the first 10 images eagerly
    for (var i = 0; i < 10; i++) {
      var slide = document.createElement("div");
      slide.classList.add("swiper-slide", "ci");
  
      // Create the image element
      var img = document.createElement("img");
      img.classList.add("ci", "lazyload");
      img.setAttribute("data-src", imageUrls[i]);
      img.setAttribute("oncontextmenu", "return false;");
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      slide.appendChild(img);
  
      // Create the image name element
      var imageNameElement = document.createElement("div");
      imageNameElement.classList.add("image-name");
      imageNameElement.textContent = imageUrls[i].split("/")[1];
      slide.appendChild(imageNameElement);
  
      carouselContainer.appendChild(slide);
      console.log('Adding slide:', imageUrls[i]);
    }
  
    // Add the remaining images using lazy loading
    for (var j = 10; j < 230; j++) {
      var slide = document.createElement("div");
      slide.classList.add("swiper-slide", "ci");
  
      // Create the image element
      var img = document.createElement("img");
      img.classList.add("ci", "lazyload");
      img.setAttribute("data-src", "galery/picture" + (j + 1) + ".jpg");
      img.setAttribute("oncontextmenu", "return false;");
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      slide.appendChild(img);
  
      // Create the image name element
      var imageNameElement = document.createElement("div");
      imageNameElement.classList.add("image-name");
      imageNameElement.textContent = "galery/picture" + (j + 1) + ".jpg";
      slide.appendChild(imageNameElement);
  
      carouselContainer.appendChild(slide);
      console.log('Adding lazy-loaded slide:', "galery/picture" + (j + 1) + ".jpg");
    }
  
    // Initialize the Swiper carousel
    var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1, // Set the number of main bullets to 1
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
    console.log('Swiper initialized');
  } catch (error) {
    console.error('Error in galery-load.js:', error);
  }