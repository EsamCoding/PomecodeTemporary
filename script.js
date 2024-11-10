const staticText = "CURRENTLY GROWING IN A GARDEN";
const typingText = "...";
let typingIndex = 0;
const typingSpeed = 300;

function typeText() {
  // Display the static part of the text
  document.getElementById("typing-text").innerHTML = staticText;

  // Add the repeating dots
  document.getElementById("typing-text").innerHTML += typingText.substring(0, typingIndex);

  // Increment or reset typing index for the dots
  typingIndex = (typingIndex + 1) % (typingText.length + 1);

  // Repeat the typing effect for dots only
  setTimeout(typeText, typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeText);
