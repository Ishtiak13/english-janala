// FAQ
document.getElementById("faq-btn").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default jump behavior
  document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("learn-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document
    .getElementById("lesson-section")
    .scrollIntoView({ behavior: "smooth" });
});
// LogIn LogOut

document.getElementById("start-btn").addEventListener("click", () => {
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!userName) {
    alert(
      "Hey there! Looks like you forgot to enter your username. Give it a go!"
    );
  } else if (userName) {
    if (!password) {
      alert("Oops! You missed the password field. No password, no entry!");
    } else if (password !== "123456") {
      Swal.fire({
        title: "Oops! Incorrect password!",
        text: "Need help? Contact our support team or try what you were thinking!🤔",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      // alert(
      //   "Oops! That password doesn’t seem right. Need help? Contact our support team or try what you were thinking! 🤔"
      // );
    } else {
      document.querySelectorAll(".initial-hidden").forEach((element) => {
        element.classList.toggle("hidden");
      });

      document.getElementById("header-banner").classList.toggle("hidden");
      Swal.fire({
        title: "Welcome!",
        text: "Let's start your journey 🚀",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }
});
document.getElementById("logout-btn").addEventListener("click", () => {
  document.querySelectorAll(".initial-hidden").forEach((element) => {
    element.classList.toggle("hidden");
  });
  document.getElementById("header-banner").classList.toggle("hidden");
});

//! API
const loadLessons = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/levels/all"
    );
    const data = await response.json();
    showLessons(data.data);
  } catch (error) {
    console.log("Error Fetched", error);
  }
};

// loading bar
const showLoadBar = () => {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("lessons-details").classList.add("hidden");
};
const hideLoadBar = () => {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("lessons-details").classList.remove("hidden");
};

const loadLessonDetails = async (id) => {
  showLoadBar();
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/level/${id}`
    );
    const data = await response.json();
    showLessonDetails(data.data);
    hideLoadBar();
  } catch (error) {
    console.log("Error Fetched", error);
  }
};
const loadWordDetails = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/word/${id}`
    );
    const data = await response.json();
    showModal(data.data);
  } catch (error) {
    console.log("Error Fetched", error);
  }
};
const showLessons = (data) => {
  data.forEach((lesson) => {
    const lessonsContainer = document.getElementById("lessons-container");
    const btn = document.createElement("button");
    btn.id = `${lesson.level_no}`;
    btn.className = "primary-font btn btn-primary btn-outline";
    btn.innerHTML = `
            <i class="fa-solid fa-book-open"> </i> Lesson - ${lesson.level_no}`;
    lessonsContainer.append(btn);
  });
};
const showLessonDetails = (words) => {
  const lessonsDetails = document.getElementById("lessons-details");
  lessonsDetails.innerHTML = "";
  if (words.length == 0) {
    const card = document.createElement("div");
    card.className =
      "text-center flex flex-col justify-center items-center col-span-full p-16 space-y-4";
    card.innerHTML = ` 
    <img src="./assets/alert-error.png" alt="">
    <p class="secondary-font text-xs text-[#79716B]">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h4 class="text-4xl font-medium text-[#292524]">
             নেক্সট Lesson এ যান
            </h4>`;
    lessonsDetails.append(card);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.className =
      "bg-white flex flex-col justify-between rounded-2xl  w-full p-14 ";
    card.innerHTML = `
            <div class="text-center space-y-4"><h3 class="main-word primary-font text-3xl font-bold">${word.word}</h3>
            <p>Meaning /Pronunciation</p>
            <h3 class="secondary-font text-3xl font-semibold text-gray-500">
              "${word.meaning} / ${word.pronunciation}"
            </h3></div>
            <div class="flex justify-between text-2xl pt-9 ">
              <i id="${word.id}" class="fa-solid fa-square-info word-info"></i
              ><i class="fa-solid fa-volume word-speak"></i>
            </div>
          `;
    lessonsDetails.append(card);
  });
};
const showModal = (data) => {
  const modalContent = document.getElementById("my_modal_2");
  modalContent.innerHTML = `
  <div class="modal-box space-y-6">
    <h3 class="text-4xl font-semibold">${
      data.word
    } (<span><i class="fa-solid fa-microphone-lines"></i>: ${
    !data.pronunciation ? "উচ্চারণটি available নয় " : data.pronunciation
  }</span>)</h3>
    <div><h4 class="primary-font text-2xl font-semibold">Meaning</h4>
    <p class="secondary-font text-2xl font-medium">${
      !data.meaning ? "কোন অর্থ পাওয়া যায়নি" : data.meaning
    }
</p></div>
    <div>
    <h4 class="primary-font text-2xl font-semibold">Example</h4>
    <p class="secondary-font text-2xl font-normal">${
      !data.sentence ? "কোন বাক্য পাওয়া যায়নি" : data.sentence
    }
</p></div>
    <div>
    <h4 class="secondary-font text-2xl font-semibold"> সমার্থক শব্দ গুলো</h4>

  <div class="flex gap-2 flex-wrap">${
    data.synonyms.length === 0
      ? "<p class='secondary-font text-2xl font-normal'>কোন সমার্থক শব্দ পাওয়া যায়নি</p>"
      : data.synonyms
          .map(
            (w) =>
              `<button class="btn primary-font font-normal text-xl bg-[#EDF7FF] border-[#D7E4EF] hover:bg-[#EDF7FF]">${w}</button>`
          )
          .join(" ")
  }</div></div>


    
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
`;
  my_modal_2.showModal();
};

// function call
loadLessons();
document.getElementById("lessons-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    loadLessonDetails(e.target.id);
    document.querySelectorAll("#lessons-container > .btn").forEach((btn) => {
      btn.style.background = "";
      btn.style.color = "";
    });
    e.target.style.background = "#422ad5";
    e.target.style.color = "white";
  }
});
document
  .getElementById("lessons-details")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("word-info")) {
      loadWordDetails(event.target.id);
    }
  });
document
  .getElementById("lessons-details")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("word-speak")) {
      pronounceWord(
        event.target.parentElement.parentElement.querySelector("h3").innerText
      );
    }
  });

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
