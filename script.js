document.addEventListener("DOMContentLoaded", function () {
  const garden = document.createElement("div");
  garden.className = "garden";
  document.body.appendChild(garden);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let isPaused = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  document.addEventListener("mousemove", createLetter);
  document.addEventListener("touchmove", createLetter);
  window.addEventListener("resize", handleResize);

  document.addEventListener("click", togglePause);

  function createLetter(event) {
    if (!isPaused) {
      const mouseX = event.clientX || event.touches[0].clientX;
      const mouseY = event.clientY || event.touches[0].clientY;

      // Calculate the distance moved since the last letter creation
      const distance = Math.sqrt(
        (mouseX - lastMouseX) ** 2 + (mouseY - lastMouseY) ** 2
      );

      // Set a threshold for the minimum distance to create a new letter
      const distanceThreshold = 80;

      if (distance >= distanceThreshold) {
        const letter = document.createElement("span");
        const randomLetter = getRandomLetter();
        const fontSize = calculateFontSize();

        if (randomLetter === "T") {
          letter.textContent = randomLetter;
          letter.style.color = "#d74b9a";
        } else {
          letter.textContent = randomLetter;
        }

        letter.style.fontSize = fontSize;

        // Position the letter at the mouse/finger coordinates with more spacing
        letter.style.left = mouseX + "px";
        letter.style.top = mouseY + "px";
        letter.style.transform = `translate(-50%, -50%) rotate(${
          Math.random() * 360
        }deg)`; // Center rotation
        garden.appendChild(letter);

        lastMouseX = mouseX;
        lastMouseY = mouseY;

        setTimeout(() => {
          letter.remove();
        }, 8000); // Increase time interval to 8 seconds (or any value you prefer)
      }
    }
  }

  function getRandomLetter() {
    const totalLetters = 26;
    const chanceOfT = 1 / 6;

    const randomValue = Math.random();

    if (randomValue < chanceOfT) {
      return "T";
    } else {
      const nonTProbabilities = (1 - chanceOfT) / (totalLetters - 1);
      let cumulativeProbability = 0;

      for (let i = 0; i < totalLetters; i++) {
        cumulativeProbability += nonTProbabilities;

        if (randomValue <= cumulativeProbability) {
          return String.fromCharCode("A".charCodeAt(0) + i);
        }
      }
    }
  }



    document.addEventListener("click", function () {
        togglePause();
    });
    
    function togglePause() {
        if (!isPaused) {
            const lastLetter = garden.lastChild && garden.lastChild.textContent;
            if (lastLetter === 'T') {
                window.location.href = 'https://www.amazon.com';
            } else {
                window.location.href = 'https://moeebii.github.io/gardenjumble/';
            }
        }
        isPaused = !isPaused;
    }
      


  function handleResize() {
    // Recalculate and update font size on window resize
    const letters = document.querySelectorAll(".garden span");
    letters.forEach((letter) => {
      const fontSize = calculateFontSize();
      letter.style.fontSize = fontSize;
    });
  }

  function calculateFontSize() {
    // Define a base font size, you can adjust this as needed
    const baseFontSize = 30;

    // Calculate the scaling factor based on window dimensions
    const widthScale = window.innerWidth / 1920; // 1920 is the width at which baseFontSize is used
    const heightScale = window.innerHeight / 1080; // 1080 is the height at which baseFontSize is used

    // Use the minimum of the two scales to maintain aspect ratio
    const scaleFactor = Math.min(widthScale, heightScale);

    // Calculate the new font size
    const newSize = baseFontSize * scaleFactor;

    return newSize + "rem";
  }
});
