
/* ==========================================
   ONE YEAR OF US — DANIEL & PRECIOUS
   ========================================== */

// Change this temporary entrance word.
const SECRET_WORD = "precious";

const welcome = document.getElementById("welcome");
const story = document.getElementById("story");
const entryForm = document.getElementById("entry-form");
const entryPassword = document.getElementById("entry-password");
const entryError = document.getElementById("entry-error");

function enterStory() {
  welcome.hidden = true;
  story.hidden = false;
  document.body.classList.remove("no-scroll");

  // Trigger the scroll-in animations after the story appears.
  setupRevealAnimations();

  // Hide the video placeholder when the actual video is available.
  setupVideoPlaceholder();

  // Let the visitor begin at the top of the story.
  window.scrollTo({ top: 0, behavior: "smooth" });
}

entryForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (entryPassword.value.trim().toLowerCase() === SECRET_WORD.toLowerCase()) {
    entryError.textContent = "";
    enterStory();
  } else {
    entryError.textContent = "Hmm, that's not our little secret. Try again ♡";
    entryPassword.value = "";
    entryPassword.focus();
  }
});

// LETTERS
const letters = {
  letter1: {
    title: "To the girl who became my person",
    paragraphs: [
      "Dear Precious,",
      "One year ago, we began a chapter that has become such a meaningful part of my life. Looking back, I don't just think about the big moments. I think about the conversations, the laughter, the little things you do, and all the ways we've grown closer.",
      "I love that there is still so much about you for me to discover. I want to keep learning what makes you happy, what matters to you, and how to show up for you in ways that feel real.",
      "Thank you for being part of this first chapter. I'm glad our paths crossed, and I'm grateful for the story we're writing together."
    ]
  },
  letter2: {
    title: "Things I hope you always know",
    paragraphs: [
      "My Precious,",
      "I hope you know that you don't have to be perfect to be loved and appreciated. You can have your quiet days, your complicated feelings, your big dreams, and your little worries. You can keep growing and changing, and I hope we always give each other room to do that.",
      "I hope you know that the little things about you matter. The things you say without thinking, the moments that make you laugh, the parts of yourself you might not even realise are special — those deserve to be appreciated too.",
      "Most of all, I hope my actions keep reminding you that you matter to me. Not only on anniversaries, but on the ordinary days in between."
    ]
  },
  letter3: {
    title: "One year later",
    paragraphs: [
      "Dear Precious,",
      "One year sounds like a simple number until you look back at all the moments inside it. We've had time to learn each other, create memories, figure things out, and discover what being together means to us.",
      "I know one anniversary doesn't mean we've figured everything out. There's still more to learn, more to experience, and more ways for us to grow. I think that's one of the beautiful parts of it.",
      "If I could wish for anything for our next chapter, it would be more honest conversations, more laughter, more kindness when things get difficult, and more memories that make us look back and smile.",
      "Happy first anniversary, Precious. I'm grateful for year one, and I'm looking forward to what we build next."
    ]
  }
};

const letterDialog = document.getElementById("letter-dialog");
const letterTitle = document.getElementById("letter-title");
const letterBody = document.getElementById("letter-body");

document.querySelectorAll("[data-letter]").forEach(function (button) {
  button.addEventListener("click", function () {
    const letter = letters[button.dataset.letter];
    if (!letter) return;

    letterTitle.textContent = letter.title;
    letterBody.replaceChildren();

    letter.paragraphs.forEach(function (paragraph) {
      const p = document.createElement("p");
      p.textContent = paragraph;
      letterBody.appendChild(p);
    });

    letterDialog.showModal();
  });
});

document.getElementById("close-letter").addEventListener("click", function () {
  letterDialog.close();
});

letterDialog.addEventListener("click", function (event) {
  // Close if the visitor clicks the dark area outside the letter.
  if (event.target === letterDialog) {
    letterDialog.close();
  }
});

// SECRET SURPRISE
const surpriseButton = document.getElementById("surprise-button");
const surpriseContent = document.getElementById("surprise-content");

surpriseButton.addEventListener("click", function () {
  surpriseContent.hidden = false;
  surpriseButton.textContent = "Your surprise is open ♡";
  surpriseButton.disabled = true;
  surpriseContent.scrollIntoView({ behavior: "smooth", block: "center" });
});

// BACKGROUND MUSIC
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = musicToggle.querySelector("span");

musicToggle.addEventListener("click", async function () {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Music on";
      musicToggle.setAttribute("aria-label", "Pause background music");
    } catch (error) {
      musicLabel.textContent = "Add our song";
      alert("Add your music file at media/our-song.mp3, then try again.");
    }
  } else {
    music.pause();
    musicLabel.textContent = "Music off";
    musicToggle.setAttribute("aria-label", "Play background music");
  }
});

// VIDEO PLACEHOLDER
function setupVideoPlaceholder() {
  const video = document.getElementById("memory-video");
  const placeholder = document.getElementById("video-placeholder");

  if (!video || !placeholder) return;

  function updatePlaceholder() {
    // A browser can load the video metadata when the file exists.
    if (video.readyState >= 1 && video.duration > 0) {
      placeholder.style.display = "none";
    } else if (video.error) {
      placeholder.style.display = "flex";
    }
  }

  video.addEventListener("loadedmetadata", updatePlaceholder);
  video.addEventListener("error", updatePlaceholder);

  // Trigger an initial check.
  updatePlaceholder();
}

// SCROLL REVEAL ANIMATIONS
let revealObserver;

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (element) {
      element.classList.add("visible");
    });
    return;
  }

  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(function (element) {
    element.classList.remove("visible");
    revealObserver.observe(element);
  });
}

// Start the story animations if the page is restored from browser history.
if (!story.hidden) {
  setupRevealAnimations();
}
