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
    alert("Please Enter an Username!!");
  } else if (userName) {
    if (!password) {
      alert("Please Enter Your a Password.");
    } else if (password !== "123456") {
      alert("Wrong Password!!  Please contact with the authority!!");
    } else {
      document.querySelectorAll(".initial-hidden").forEach((element) => {
        console.log(element);
        element.classList.toggle("hidden");
      });
      document.getElementById("header-banner").classList.toggle("hidden");
    }
  }
});
document.getElementById("logout-btn").addEventListener("click", () => {
  document.querySelectorAll(".initial-hidden").forEach((element) => {
    console.log(element);
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
const loadLessonDetails = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/level/${id}`
    );
    const data = await response.json();
    showLessonDetails(data.data);
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
              <div class="text-center space-y-4"><h3 class="primary-font text-3xl font-bold">${word.word}</h3>
              <p>Meaning /Pronunciation</p>
              <h3 class="secondary-font text-3xl font-semibold text-gray-500">
                "${word.meaning} / ${word.pronunciation}"
              </h3></div>
              <div class="flex justify-between text-2xl pt-9 ">
                <i class="fa-solid fa-square-info"></i
                ><i class="fa-solid fa-volume"></i>
              </div>
            `;
    lessonsDetails.append(card);
  });
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
