const root = document.documentElement;
const contactProfile = {
  email: "amoghgaur4@gmail.com",
  location: "New Delhi, India",
  github: "https://github.com/Gaur-Amogh",
  linkedin: "https://www.linkedin.com/in/amoghgaur",
  phone: "+91 7982412667",
  resume: "./Amogh_Gaur_Resume.pdf",
  formEndpoint: ""
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") root.classList.add("dark");

function hydrateContactProfile() {
  const email = document.getElementById("profileEmail");
  const github = document.getElementById("profileGithub");
  const linkedin = document.getElementById("profileLinkedin");
  const location = document.getElementById("profileLocation");
  const phone = document.getElementById("profilePhone");
  const resume = document.getElementById("profileResume");
resume.href = contactProfile.resume;

  email.textContent = contactProfile.email;
  email.href = `mailto:${contactProfile.email}`;
  github.textContent = "GitHub";
  github.href = contactProfile.github;
  linkedin.textContent = "LinkedIn";
  linkedin.href = contactProfile.linkedin;
  location.textContent = contactProfile.location;
  phone.textContent = contactProfile.phone;
  phone.href = `tel:${contactProfile.phone.replace(/[^\d+]/g, "")}`;
}

hydrateContactProfile();

const cursorLight = document.querySelector(".cursor-light");
window.addEventListener("pointermove", (event) => {
  cursorLight.style.transform = `translate(${event.clientX - 272}px, ${event.clientY - 272}px)`;
});

document.getElementById("themeToggle").addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const cases = {
  i4c: {
    kicker: "Pro industry experience",
    title: "Web Development Intern - I4C",
    body:
      "Engineered and optimized web application modules using the MERN stack for the Indian Cyber Crime Coordination Centre (I4C), focusing heavily on responsive UI workflows and secure API synchronization.",
    metrics: ["React.js|frontend", "Express.js|backend", "RESTful APIs|sync"],
    points: [
      "Built reusable UI elements and managed complex application state to guarantee absolute frontend consistency.",
      "Consumed secure RESTful endpoints to establish seamless client-to-server data communication channels.",
      "Streamlined version control workflows and collaborative cycles using Git and GitHub within active dev pipelines."
    ]
  },
  medicrate: {
    kicker: "Logistics concept project",
    title: "Medicrate: Instant Health Delivery",
    body:
      "Architected the frontend ecosystem for a hyper-local, high-velocity pharmaceutical delivery engine, modeled after fast-commerce models like Blinkit and Zepto but tailored for medical accessibility.",
    metrics: ["JavaScript|ES6+", "CSS3|Grid Layouts", "HTML5|screens"],
    points: [
      "Developed standard end-to-end user screens including live pharmacy browsing, product catalogues, and checkout workflows.",
      "Applied layout consistency matrices and mobile-first design rules to ensure flawless viewport scalability.",
      "Engineered realistic mock client navigation to simulate production-level transactional user journeys."
    ]
  },
  aqi: {
    kicker: "Team lead & data research",
    title: "ML Framework for AQI Forecasting",
    body:
      "Led a 4-person engineering team to design and evaluate a non-linear machine learning framework optimizing air quality index forecasting across major Indian metro centers.",
    metrics: ["Python|modeling", "Data Engineering|pipelines", "Mathematical Modeling|metrics"],
    points: [
      "Spearheaded intensive data engineering processes to preprocess environmental datasets and coordinate meteorological streams.",
      "Evaluated supervised learning architectures, verifying high system reliability using strict statistical error metrics (RMSE, MAE, R^2).",
      "Directed spatial-temporal feature engineering loops, outperforming traditional statistical prediction baselines."
    ]
  }
};

const caseStudy = document.getElementById("caseStudy");
document.querySelectorAll(".case-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".case-tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const data = cases[tab.dataset.case];
    caseStudy.animate(
      [
        { opacity: 0.45, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 260, easing: "ease-out" }
    );
    caseStudy.innerHTML = `
      <div>
        <p class="case-kicker">${data.kicker}</p>
        <h3>${data.title}</h3>
        <p>${data.body}</p>
      </div>
      <div class="case-metrics">
        ${data.metrics
          .map((metric) => {
            const [value, label] = metric.split("|");
            return `<span><b>${value}</b>${label}</span>`;
          })
          .join("")}
      </div>
      <ul class="case-points">
        ${data.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    `;
  });
});

document.querySelectorAll(".skill-cloud button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".skill-cloud button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.skill !== filter);
    });
  });
});

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 7}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

const commandMenu = document.getElementById("commandMenu");
const commandInput = document.getElementById("commandInput");
const openCommand = document.getElementById("openCommand");

function showCommandMenu() {
  commandMenu.showModal();
  commandInput.value = "";
  commandInput.focus();
  filterCommands("");
}

function filterCommands(value) {
  const query = value.trim().toLowerCase();
  document.querySelectorAll("#commandList button").forEach((button) => {
    button.hidden = !button.textContent.toLowerCase().includes(query);
  });
}

openCommand.addEventListener("click", showCommandMenu);
commandInput.addEventListener("input", (event) => filterCommands(event.target.value));

document.addEventListener("keydown", (event) => {
  const isCommand = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (isCommand) {
    event.preventDefault();
    showCommandMenu();
  }
});

document.querySelectorAll("#commandList button").forEach((button) => {
  button.addEventListener("click", () => {
    commandMenu.close();
    document.querySelector(button.dataset.target).scrollIntoView({ behavior: "smooth" });
  });
});

commandMenu.addEventListener("click", (event) => {
  if (event.target === commandMenu) commandMenu.close();
});

function findEmail(value) {
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : "";
}

document.getElementById("contactForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const identity = form.querySelector('input[type="text"]').value.trim();
  const explicitEmail = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector("textarea").value.trim();
  const status = document.getElementById("formStatus");
  const detectedEmail = findEmail(`${explicitEmail} ${identity} ${message}`);

  if (!detectedEmail) {
    status.textContent = "Add a valid sender email so the payload can be routed.";
    return;
  }

  if (!message) {
    status.textContent = "Add a message before dispatching the secure payload.";
    return;
  }

  const subject = `Portfolio inquiry from ${identity || detectedEmail}`;
  const body = [
    "New portfolio contact payload",
    "",
    "Sender details",
    `Name / agency: ${identity || "Not provided"}`,
    `Detected email: ${detectedEmail}`,
    "",
    "Message",
    message,
    "",
    "Amogh profile details",
    `Email: ${contactProfile.email}`,
    `GitHub: ${contactProfile.github}`,
    `LinkedIn: ${contactProfile.linkedin}`,
    `Location: ${contactProfile.location}`,
    `Phone: ${contactProfile.phone}`
  ].join("\n");

  const payload = {
    subject,
    senderIdentity: identity || "Not provided",
    senderEmail: detectedEmail,
    message,
    profile: {
      email: contactProfile.email,
      github: contactProfile.github,
      linkedin: contactProfile.linkedin,
      location: contactProfile.location,
      phone: contactProfile.phone
    }
  };

  if (contactProfile.formEndpoint) {
    status.textContent = "Routing payload to the configured contact endpoint...";
    try {
      const response = await fetch(contactProfile.formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Contact endpoint rejected the payload.");
      form.reset();
      status.textContent = "Message delivered. The contact payload has been sent to Amogh.";
      return;
    } catch (error) {
      status.textContent = "Endpoint delivery failed. Opening email fallback instead.";
    }
  }

  const mailtoUrl = `mailto:${contactProfile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "";

  const statusText = document.createElement("span");
  statusText.textContent = "Email payload prepared. ";

  const mailLink = document.createElement("a");
  mailLink.href = mailtoUrl;
  mailLink.textContent = "Open email draft";
  mailLink.setAttribute("aria-label", "Open prepared email draft");

  status.append(statusText, mailLink);
});

const canvas = document.getElementById("field");
const context = canvas.getContext("2d");
const particles = [];
let width = 0;
let height = 0;
let animationFrame = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles.length = 0;
  const count = Math.min(72, Math.floor(width / 18));
  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.8 + 0.8
    });
  }
}

function drawField() {
  context.clearRect(0, 0, width, height);
  const color = root.classList.contains("dark") ? "244, 242, 237" : "17, 19, 20";
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(${color}, 0.26)`;
    context.fill();

    for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
      const other = particles[otherIndex];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 135) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = `rgba(${color}, ${0.1 - distance / 1500})`;
        context.lineWidth = 1;
        context.stroke();
      }
    }
  });
  animationFrame = requestAnimationFrame(drawField);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  resizeCanvas();
  drawField();
  window.addEventListener("resize", resizeCanvas);
} else {
  cancelAnimationFrame(animationFrame);
}
