/**
 * Ryan Wong
 * Date: May 3, 2024
 *
 * This is the javascript file for the travel page of my website. This will allow
 * users to recommend cities and places for me to visit and click through a variety
 * of the pictures that I have taken.
 */

(function () {
  'use strict';

  /**
   * Initializes the application by setting up event listeners for handling
   * input in the recommendation box.
   */
  function init() {
    setupInputListener();
    setupCarouselListener();
  }

  /**
   * Sorts the list of the recommended cities by the number of recommendations
   * each city has received. Cities are sorted in descending order.
   *
   * @param {HTMLElement} recList - The unordered list element of city recommendations.
   * @param {HTMLElement[]} arrayItems - An array of list item elements that represent the recommended cities.
   */

  const sortListByNumRecs = (recList, arrayItems) => {
    arrayItems.sort((a, b) => {
      const countA = parseInt(
        a.getElementsByClassName('city-count')[0].textContent.replace('+', ''),
        10
      );
      const countB = parseInt(
        b.getElementsByClassName('city-count')[0].textContent.replace('+', ''),
        10
      );
      return countB - countA;
    });

    recList.innerHTML = '';
    arrayItems.forEach((item) => recList.appendChild(item));
  };

  /**
   * Sets up an event listener on the 'rec-input' input box to handle the 'Enter' keypress event.
   * When the 'Enter' key is pressed, the function checks if the input is not empty, then creates a new
   * recommendation or updates an existing one based on the city name provided by the user.
   * It also handles the sorting of the list based on the number of recommendations per city.
   * Handles cases where users only input the city name and not the country etc.
   */
  function setupInputListener() {
    const input = document.getElementById('rec-input');
    const recList = document.getElementById('rec-list');
    const listItems = recList.getElementsByTagName('li');

    input.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        const recCity = input.value;
        if (recCity.trim().length > 0) {
          const recCityName = recCity
            .replace(/,/g, '')
            .split(' ')[0]
            .toLowerCase();

          const newListItem = document.createElement('li');
          const newCityRec = document.createElement('p');
          newCityRec.classList.add('city-rec');

          const newCityCount = document.createElement('p');
          newCityCount.classList.add('city-count');

          newCityRec.className = 'city-rec';
          newCityCount.className = 'city-count';

          for (let i = 0; i < listItems.length; i++) {
            const parentNode = listItems[i];
            const listCityNode =
              parentNode.getElementsByClassName('city-rec')[0];
            const listCity = listCityNode.textContent
              .replace(/,/g, '')
              .split(' ')[0];

            const numVotesNode =
              parentNode.getElementsByClassName('city-count')[0];
            const numVotes = parseInt(
              numVotesNode.textContent.replace('+', ''),
              10
            );

            if (recCityName === listCity.toLowerCase()) {
              let newCityCount = numVotes + 1;
              const newCount = document.createElement('p');
              newCount.classList.add('city-count');
              newCount.textContent = `+${newCityCount}`;
              parentNode.replaceChild(newCount, numVotesNode);
              input.value = '';

              sortListByNumRecs(recList, Array.from(listItems));

              return;
            }
          }
          newCityRec.textContent = recCity.trim();
          newListItem.appendChild(newCityRec);
          newCityCount.textContent = '+1';
          newListItem.appendChild(newCityCount);
          recList.appendChild(newListItem);

          input.value = '';
        }
      }
    });
  }

  /**
   * Changes the image of the container to the next image.
   * @param {HTML Element} carousel - The carousel element containing the slides.
   * @param {HTML Element} imagesContainer - The container element holding all of the images.
   * @param {number} slideWidth - The width of each image in the carousel.
   */
  function nextImage(carousel, imagesContainer, slideWidth) {
    let currentSlide = parseInt(carousel.dataset.currentSlide);
    const totalImages = imagesContainer.children.length;
    currentSlide = (currentSlide + 1) % totalImages;
    imagesContainer.style.transform =
      'translateX(' + -slideWidth * currentSlide + 'px)';
    carousel.dataset.currentSlide = currentSlide;
  }

  /**
   * Changes the image of the container to the previous image.
   * @param {HTML Element} carousel - The carousel element containing the slides.
   * @param {HTML Element} imagesContainer - The container element holding all of the images.
   * @param {number} slideWidth - The width of each image in the carousel.
   */
  function previousImage(carousel, imagesContainer, slideWidth) {
    let currentSlide = parseInt(carousel.dataset.currentSlide);
    const totalImages = imagesContainer.children.length;
    if (currentSlide === 0) {
      currentSlide = totalImages - 1;
    } else {
      currentSlide--;
    }
    imagesContainer.style.transform =
      'translateX(' + -slideWidth * currentSlide + 'px)';
    carousel.dataset.currentSlide = currentSlide;
  }

  /**
   * Sets up an event listener on each button of the carousels. Allows the buttons
   * the carousels to work for its own set of images.
   */
  function setupCarouselListener() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach((carousel) => {
      const imagesContainer = carousel.querySelector('.carousel-images');
      const images = imagesContainer.getElementsByTagName('img');
      const slideWidth = images[0].clientWidth;

      carousel.dataset.currentSlide = 0;

      const nextButton = carousel.querySelector('.next');
      const previousButton = carousel.querySelector('.previous');

      nextButton.addEventListener('click', () => {
        nextImage(carousel, imagesContainer, slideWidth);
      });

      previousButton.addEventListener('click', () => {
        previousImage(carousel, imagesContainer, slideWidth);
      });
    });
  }

  init();
})();
