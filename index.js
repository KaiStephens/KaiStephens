addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Serve the main HTML file for all requests
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kai Stephens | Creative Developer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <!-- Combined CSS -->
  <style>
:root {
  --primary: #FF3366;
  --background: #141414;
  --foreground: #ffffff;
  --foreground-60: rgba(255, 255, 255, 0.6);
  --font-clash: 'Clash Display', sans-serif;
  --font-space: 'Space Grotesk', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-space);
  line-height: 1.5;
  overflow-x: hidden;
}

/* Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  z-index: 50;
  background: transparent;
}

.nav-link {
  writing-mode: vertical-rl;
  text-decoration: none;
  color: var(--foreground-60);
  font-family: var(--font-clash);
  font-size: 0.875rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
  transform: scale(1.1);
}

.nav-link[data-active="true"] {
  color: var(--primary);
}

/* Common Section Styles */
.section {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 5rem 2rem 5rem 8rem;
  position: relative;
  overflow: hidden;
}

/* --- Home Section --- */
.content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 64rem;
  margin: 0 auto;
}

.name {
  display: block;
  font-family: var(--font-space);
  font-size: 1.5rem;
  color: var(--foreground-60);
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards 0.2s;
}

.title {
  font-family: var(--font-clash);
  font-size: 7rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
}

.title-bg {
  position: absolute;
  inset: -2.5rem -5rem;
  background: radial-gradient(
    circle at center,
    rgba(255, 51, 102, 0.15) 0%,
    rgba(255, 215, 0, 0.15) 30%,
    rgba(0, 255, 178, 0.15) 60%,
    transparent 100%
  );
  opacity: 0.7;
  filter: blur(50px);
  animation: pulse 8s ease-in-out infinite;
  transform-origin: center;
  border-radius: 50%;
  transition: all 0.5s ease;
}

.title-text {
  position: relative;
  background: linear-gradient(to right, var(--primary), #FFD700, #00FFB2);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  display: inline-block;
  animation: coolFadeInUp 3s ease forwards 0.3s;
  transition: background-position 0.5s ease, transform 0.5s ease;
}

.subtitle {
  font-size: 1.125rem;
  color: var(--foreground-60);
  max-width: 40rem;
  margin: 0 auto;
  opacity: 0;
  animation: fadeIn 1.2s ease forwards 0.5s;
}

/* Modified Gradient Background */
.gradient-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 51, 102, 0.03) 0%,
    rgba(255, 215, 0, 0.02) 8%,
    rgba(0, 255, 178, 0.01) 15%,
    transparent 25%
  );
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
  pointer-events: none;
  opacity: 0;
  filter: blur(2px);
}

.section:hover .gradient-bg {
  opacity: 1;
}

/* --- Projects Section --- */
.projects-container {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
}

.project {
  position: relative;
  margin-bottom: 6rem;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInLeft 0.8s ease forwards;
}

.project-dot {
  position: absolute;
  left: -2rem;
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--primary);
  border-radius: 50%;
  transform: scale(0);
  animation: scaleIn 0.6s ease forwards;
}

@media (max-width: 768px) {
  .project-dot {
    left: -1rem;
  }
}

.project-title {
  font-family: var(--font-clash);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  margin-bottom: 1rem;
  opacity: 0.2;
  background: linear-gradient(to right, var(--primary), #00FFB2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transform: translateX(0);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.project:hover .project-title {
  opacity: 1;
  transform: translateX(2rem);
}

.project-description {
  font-size: 1rem;
  color: var(--foreground-60);
  max-width: 28rem;
  margin-bottom: 1rem;
  transform: translateX(0);
  transition: transform 0.7s ease;
}

.project:hover .project-description {
  transform: translateX(2rem);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transform: translateX(0);
  transition: transform 0.7s ease;
}

.project:hover .project-tech {
  transform: translateX(2rem);
}

.tech-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background-color: rgba(255, 51, 102, 0.1);
  color: var(--primary);
}

.project-links {
  display: flex;
  gap: 1rem;
  transform: translateX(0);
  transition: transform 0.7s ease;
}

.project:hover .project-links {
  transform: translateX(2rem);
}

.project-link {
  color: var(--foreground-60);
  transition: color 0.3s ease;
}

.project-link:hover {
  color: var(--primary);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* --- Contact Section --- */
.contact-container {
  max-width: 32rem;
}

.contact-title {
  font-family: var(--font-clash);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: bold;
  margin-bottom: 3rem;
  background: linear-gradient(to right, var(--primary), #00FFB2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--foreground-60);
  text-decoration: none;
  font-size: 1.25rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.contact-link:hover {
  color: var(--primary);
  transform: translateX(1.25rem);
}

.contact-link span {
  transition: transform 0.3s ease;
}

.contact-link:hover span {
  transform: translateX(0.5rem);
}

/* --- Animations --- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes coolFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  70% {
    opacity: 1;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- Responsive Design --- */
@media (max-width: 768px) {
  .nav {
    width: 100%;
    height: auto;
    bottom: 0;
    top: auto;
    flex-direction: row;
    padding: 1rem;
    background: rgba(20, 20, 20, 0.8);
    backdrop-filter: blur(8px);
  }

  .nav-link {
    position: relative;
    writing-mode: vertical-rl;
    text-decoration: none;
    color: var(--foreground-60);
    font-family: var(--font-clash);
    font-size: 0.875rem;
    overflow: hidden;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .nav-link::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--primary);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .nav-link:hover::after {
    opacity: 0.5;
  }

  .section {
    padding: 5rem 2rem;
  }

  .title {
    font-size: clamp(3rem, 10vw, 6rem);
  }

  .project-title {
    font-size: clamp(2rem, 8vw, 4rem);
  }
}
  </style>
</head>
<body>`

  return new Response(html + `
  <!-- Navigation -->
  <nav class="nav">
    <a href="#home" class="nav-link" data-active="true">Home</a>
    <a href="#experience" class="nav-link">Experience</a>
    <a href="#projects" class="nav-link">Projects</a>
    <a href="#contact" class="nav-link">Hello</a>
  </nav>

  <!-- Home Section -->
  <section id="home" class="section active">
    <div class="content">
      <span class="name">Kai Stephens</span>
      <h1 class="title">
        <div class="title-bg"></div>
        <span class="title-text">
          Creative<br>
          Developer
        </span>
      </h1>
      <p class="subtitle">Software Developer | CEO at Nipux Inc | Crafting digital experiences through code and creativity</p>
    </div>
    <div class="gradient-bg"></div>
  </section>

  <!-- Experience Section -->
  <section id="experience" class="section">
    <div class="projects-container">
      <div class="project">
        <div class="project-dot"></div>
        <h2 class="project-title">CEO & Founder</h2>
        <p class="project-description">
          Currently leading Nipux Inc, a server hosting company focused on providing reliable and scalable infrastructure solutions. Building the future of cloud hosting at <a href="https://nipux.com" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: underline;">nipux.com</a>
        </p>
        <div class="project-tech">
          <span class="tech-tag">Leadership</span>
          <span class="tech-tag">Cloud Infrastructure</span>
          <span class="tech-tag">Business Development</span>
          <span class="tech-tag">Server Management</span>
        </div>
        <div class="project-links">
          <a href="https://nipux.com" target="_blank" rel="noopener noreferrer" class="project-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15,3 21,3 21,9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="project">
        <div class="project-dot"></div>
        <h2 class="project-title">Software Developer</h2>
        <p class="project-description">
          Previously worked as a Software Developer at TreeFrog Inc in Newmarket, Ontario, developing innovative software solutions and contributing to various client projects with a focus on web technologies and system architecture.
        </p>
        <div class="project-tech">
          <span class="tech-tag">Web Development</span>
          <span class="tech-tag">System Architecture</span>
          <span class="tech-tag">Client Solutions</span>
          <span class="tech-tag">Team Collaboration</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="section">
    <div class="projects-container">
      <!-- Existing Project: Auto Robot Navigator -->
      <div class="project">
        <div class="project-dot"></div>
        <h2 class="project-title">Auto Robot Navigator</h2>
        <p class="project-description">
          An autonomous robot navigation system using computer vision and Bluetooth control. Features real-time
          perspective correction, color-based detection, and precise movement calculations.
        </p>
        <div class="project-tech">
          <span class="tech-tag">Python</span>
          <span class="tech-tag">OpenCV</span>
          <span class="tech-tag">Bluetooth</span>
          <span class="tech-tag">ESP32</span>
        </div>
        <div class="project-links">
          <a href="https://github.com/KaiStephens/autoRobot" target="_blank" rel="noopener noreferrer" class="project-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                   c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77
                   5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38
                   13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07
                   5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5
                   3.78c0 5.42 3.3 6.61 6.44
                   7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Existing Project: Echo Notes -->
      <div class="project">
        <div class="project-dot"></div>
        <h2 class="project-title">Echo Notes</h2>
        <p class="project-description">
          A smart lecture recording and summarization tool that uses AI to transcribe and generate concise summaries.
          Features both local Whisper and OpenAI API integration for flexible speech recognition.
        </p>
        <div class="project-tech">
          <span class="tech-tag">Python</span>
          <span class="tech-tag">OpenAI</span>
          <span class="tech-tag">Whisper</span>
          <span class="tech-tag">Audio Processing</span>
        </div>
        <div class="project-links">
          <a href="https://github.com/KaiStephens/echonotes" target="_blank" rel="noopener noreferrer" class="project-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37
                   3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54
                   6.44-7A5.44 5.44 0 0 0 20 4.77
                   5.07 5.07 0 0 0 19.91 1S18.73.65
                   16 2.48a13.38 13.38 0 0 0-7 0C6.27.65
                   5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44
                   5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61
                   6.44 7A3.37 3.37 0 0 0 9
                   18.13V22"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Existing Project: Personal Jarvis -->
      <div class="project">
        <div class="project-dot"></div>
        <h2 class="project-title">Personal Jarvis</h2>
        <p class="project-description">
          An advanced AI assistant with wake word detection, weather updates, and natural conversation capabilities.
          Features ElevenLabs TTS and real-time environmental monitoring.
        </p>
        <div class="project-tech">
          <span class="tech-tag">Python</span>
          <span class="tech-tag">Speech Recognition</span>
          <span class="tech-tag">ElevenLabs API</span>
          <span class="tech-tag">Weather API</span>
        </div>
        <div class="project-links">
          <a href="https://github.com/KaiStephens/personalJarvis" target="_blank" rel="noopener noreferrer" class="project-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35
                   6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91
                   1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09
                   1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42
                   3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- New Project: TeachAssistScraper -->
      <div class="project">
        <div class="project-dot"></div>
        <h2 class="project-title">TeachAssistScraper</h2>
        <p class="project-description">
          YRDSB Mark Fetcher & Teaching Assistant AI – a Flask-based web application that lets students log in with their YRDSB credentials to fetch current and midterm marks, view detailed assignment reports, and chat with an AI teaching assistant powered by Google GenAI.
        </p>
        <div class="project-tech">
          <span class="tech-tag">Python</span>
          <span class="tech-tag">Flask</span>
          <span class="tech-tag">BeautifulSoup</span>
          <span class="tech-tag">Google GenAI</span>
        </div>
        <div class="project-links">
          <a href="https://github.com/KaiStephens/TeachAssistScraper" target="_blank" rel="noopener noreferrer" class="project-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
      
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="section">
    <div class="contact-container">
      <h1 class="contact-title">Say Hello</h1>
      <div class="contact-links">
        <a href="mailto:kai@kaios.ca" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            ></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Email</span>
        </a>
        <a href="https://github.com/KaiStephens" target="_blank" rel="noopener noreferrer" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35
                 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91
                 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07
                 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9
                 18.13V22"
            ></path>
          </svg>
          <span>Github</span>
        </a>
        <a href="https://twitter.com/kaiostephens" target="_blank" rel="noopener noreferrer" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66
                 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72
                 7.72 0 0 0 23 3z"
            ></path>
          </svg>
          <span>Twitter</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Combined JavaScript -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Mouse position tracking for the home section using throttle
      const root = document.documentElement;
      const gradientBg = document.querySelector('.gradient-bg');
    
      const updateMousePosition = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const xPercent = (x / window.innerWidth) * 100;
        const yPercent = (y / window.innerHeight) * 100;
        root.style.setProperty('--mouse-x', \`\${xPercent}%\`);
        root.style.setProperty('--mouse-y', \`\${yPercent}%\`);
    
        const content = document.querySelector('.content');
        if (content) {
          const moveX = (x - window.innerWidth / 2) * 0.03;
          const moveY = (y - window.innerHeight / 2) * 0.03;
          content.style.transform = \`translate3d(\${moveX}px, \${moveY}px, 0)\`;
        }
      };
    
      const throttle = (func, limit) => {
        let inThrottle;
        return function(e) {
          if (!inThrottle) {
            func(e);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
          }
        };
      };
    
      document.addEventListener('mousemove', throttle(updateMousePosition, 16));
    
      // Navigation highlighting and smooth scrolling
      const sections = document.querySelectorAll('.section');
      const navLinks = document.querySelectorAll('.nav-link');
    
      const updateActiveSection = () => {
        const scrollPosition = window.scrollY;
    
        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
    
          if (
            scrollPosition >= sectionTop - window.innerHeight / 2 &&
            scrollPosition < sectionTop + sectionHeight - window.innerHeight / 2
          ) {
            navLinks.forEach(link => link.setAttribute('data-active', 'false'));
            navLinks[index].setAttribute('data-active', 'true');
          }
        });
      };
    
      window.addEventListener('scroll', updateActiveSection);
      updateActiveSection();
    
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
    
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    
      // Project animations via IntersectionObserver
      const projects = document.querySelectorAll('.project');
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20% 0px'
      };
    
      const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            const dot = entry.target.querySelector('.project-dot');
            if (dot) {
              dot.style.animation = 'scaleIn 0.6s ease forwards 0.3s';
            }
          }
        });
      }, observerOptions);
    
      projects.forEach(project => {
        projectObserver.observe(project);
      });
    
      // Contact link animations via IntersectionObserver
      const contactLinks = document.querySelectorAll('.contact-link');
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = \`fadeInUp 0.8s ease forwards \${index * 0.1}s\`;
          }
        });
      }, observerOptions);
    
      contactLinks.forEach(link => {
        contactObserver.observe(link);
      });
    });
  </script>
</body>
</html>`, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}