/* =========================================
   ONE YEAR OF US
   Daniel × Precious
========================================= */


/* =========================================
   SECRET WORD
========================================= */

const SECRET_WORD = "precious";


const gate = document.getElementById("gate");
const website = document.getElementById("website");

const secretInput = document.getElementById("secretInput");
const enterButton = document.getElementById("enterButton");
const gateError = document.getElementById("gateError");


function enterWebsite() {

    const enteredWord =
        secretInput.value.trim().toLowerCase();

    if (enteredWord === SECRET_WORD) {

        gate.classList.add("hidden");

        setTimeout(() => {
            website.classList.remove("hidden");
            window.scrollTo(0, 0);
        }, 700);

    } else {

        gateError.classList.add("show");

        secretInput.value = "";

        setTimeout(() => {
            gateError.classList.remove("show");
        }, 2500);

    }
}


enterButton.addEventListener("click", enterWebsite);


secretInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        enterWebsite();
    }

});


/* =========================================
   MUSIC
========================================= */

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

let musicPlaying = false;


musicButton.addEventListener("click", async () => {

    if (!musicPlaying) {

        try {

            await backgroundMusic.play();

            musicPlaying = true;

            musicButton.innerHTML =
                '<span class="music-icon">♫</span> Playing';

        } catch (error) {

            alert(
                "Add our-song.mp3 inside the media folder first."
            );

        }

    } else {

        backgroundMusic.pause();

        musicPlaying = false;

        musicButton.innerHTML =
            '<span class="music-icon">♪</span> Our song';

    }

});


/* =========================================
   CINEMATIC VIDEO POPUP
========================================= */

const videoCards = document.querySelectorAll(".video-card");
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeVideo = document.getElementById("closeVideo");

videoCards.forEach((card) => {
    const preview = card.querySelector("video");
    const playButton = card.querySelector(".video-play");

    // Prevent videos from playing inside the gallery.
    preview.controls = false;
    preview.pause();
    preview.removeAttribute("autoplay");

    // Clicking the card or its play button opens the popup.
    card.addEventListener("click", async () => {
        const videoPath = preview.getAttribute("src");

        if (!videoPath) {
            alert("This video has no file path.");
            return;
        }

        // Stop any video already playing in the popup.
        modalVideo.pause();
        modalVideo.removeAttribute("src");

        modalVideo.src = videoPath;
        modalVideo.controls = true;
        modalVideo.playsInline = true;

        videoModal.classList.add("show");
        document.body.style.overflow = "hidden";

        modalVideo.load();

        try {
            await modalVideo.play();
        } catch (error) {
            console.error("Video playback error:", error);

            alert(
                "This video could not play. Check its file path " +
                "and make sure it is encoded in a browser-supported format."
            );
        }
    });

    if (playButton) {
        playButton.setAttribute("aria-label", "Play video");
    }
});

function closeVideoPopup() {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();

    videoModal.classList.remove("show");
    document.body.style.overflow = "";
}

closeVideo.addEventListener("click", closeVideoPopup);

videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
        closeVideoPopup();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeVideoPopup();
    }
});



/* =========================================
   LETTERS
========================================= */

const letters = {

    one: {

        title: "For the girl I chose.",

        content: `
            <p>
                Precious,
            </p>

            <p>
                One year ago, I don't think either of us could
                have known exactly where this would take us.
                But somehow, here we are.
            </p>

            <p>
                Thank you for every conversation, every laugh,
                every random moment and every memory we've made.
            </p>

            <p>
                You became someone incredibly important to me,
                and I'm grateful for the story we've created.
            </p>

            <p>
                Happy one year.
            </p>
        `

    },

    two: {

        title: "For everything we've become.",

        content: `
            <p>
                Looking back at everything we've experienced,
                it's the little things that stand out the most.
            </p>

            <p>
                The conversations that went on longer than
                they were supposed to. The random jokes.
                The moments that probably didn't seem important
                at the time.
            </p>

            <p>
                Somehow, those became some of my favourite memories.
            </p>

            <p>
                That's what I love about our story.
                It feels like a collection of ordinary moments
                that somehow became extraordinary.
            </p>
        `

    },

    three: {

        title: "For the year ahead.",

        content: `
            <p>
                One year is a beautiful milestone,
                but I don't want it to be the end of anything.
            </p>

            <p>
                I want more memories.
                More laughter.
                More random conversations.
                More moments we'll look back on one day.
            </p>

            <p>
                Whatever the next chapter brings,
                I hope we continue growing, learning
                and choosing each other.
            </p>

            <p>
                Here's to chapter two.
            </p>
        `

    }

};


const letterModal =
    document.getElementById("letterModal");

const letterTitle =
    document.getElementById("letterTitle");

const letterContent =
    document.getElementById("letterContent");

const closeModal =
    document.getElementById("closeModal");


document.querySelectorAll(".letter-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const letter =
                letters[card.dataset.letter];

            letterTitle.textContent =
                letter.title;

            letterContent.innerHTML =
                letter.content;

            letterModal.classList.add("show");

        });

    });


closeModal.addEventListener("click", () => {

    letterModal.classList.remove("show");

});


letterModal.addEventListener("click", (event) => {

    if (event.target === letterModal) {
        letterModal.classList.remove("show");
    }

});


/* =========================================
   SECRET SURPRISE
========================================= */

const surpriseButton =
    document.getElementById("surpriseButton");

const surpriseMessage =
    document.getElementById("surpriseMessage");


surpriseButton.addEventListener("click", () => {

    surpriseMessage.classList.add("show");

    surpriseButton.style.display = "none";

});


/* =========================================
   SCROLL REVEALS
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        letterModal.classList.remove("show");

        closeVideoModal();

    }

});