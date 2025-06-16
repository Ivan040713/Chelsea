// Get all the sections on the page
const sections = document.querySelectorAll("section");

// Add an event listener to the navigation links to scroll to the appropriate section
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute("href");
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// Add an intersection observer to highlight the active section in the navigation menu
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.getAttribute("id");
      const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        navLink.classList.add("active");
      } else {
        entry.target.classList.remove("active");
        navLink.classList.remove("active");
      }
    });
  },
  { threshold: 0.5 }
);

// Observe each section on the page
sections.forEach((section) => {
  observer.observe(section);
});

// Get the quiz form and result section
const quizForm = document.querySelector("#quiz form");
const quizResult = document.querySelector("#quiz .quiz-result");

// Define the correct answers
const correctAnswers = ["a", "c", "c"];

// Handle form submission
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let score = 0;
  const userAnswers = [
    quizForm.q1.value,
    quizForm.q2.value,
    quizForm.q3.value,
  ];
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 1;
    }
  });
  showQuizResult(score);
});

// Function to show quiz result
function showQuizResult(score) {
  const totalScore = correctAnswers.length;
  const percentage = (score / totalScore) * 100;
  quizResult.textContent = `You scored ${score} out of ${totalScore} (${percentage}%).`;
  quizResult.style.display = "block";
}

// Show the quiz section after the "Player" section
const quizSection = document.querySelector("#quiz");
const playerSection = document.querySelector("#player");
quizSection.style.display = "block";
playerSection.insertAdjacentElement("afterend", quizSection);