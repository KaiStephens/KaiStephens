addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kai Stephens</title>
  <style>
:root {
  --primary: #6366f1;
  --bg: #0a0a0a;
  --text: #ffffff;
  --text-dim: #a1a1aa;
  --surface: #161616;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: var(--text-dim);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--primary);
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero-content p {
  font-size: 1.25rem;
  color: var(--text-dim);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.cta {
  display: inline-flex;
  padding: 0.75rem 2rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
}

.section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
}

.experience-grid {
  display: grid;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.experience-card {
  background: var(--surface);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.experience-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.card-company {
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.card-company:hover {
  color: var(--primary);
}

.card-description {
  color: var(--text-dim);
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.project-card {
  background: var(--surface);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.project-description {
  color: var(--text-dim);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.project-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.project-link:hover {
  text-decoration: underline;
}

.contact {
  text-align: center;
  background: var(--surface);
  margin: 5rem 0;
  padding: 4rem 2rem;
  border-radius: 24px;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.contact-link {
  color: var(--text-dim);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--primary);
}

@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }
  
  .hero-content h1 {
    font-size: 3rem;
  }
  
  .contact-links {
    flex-direction: column;
    gap: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.experience-card, .project-card {
  will-change: transform;
}

body {
  font-display: swap;
}
  </style>
</head>
<body>
  <header class="header">
    <nav class="nav">
      <div class="logo">KS</div>
      <ul class="nav-links">
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <section class="hero">
    <div class="hero-content">
      <h1>Kai Stephens</h1>
      <p>Software Developer | CEO at Nipux Inc</p>
      <a href="#contact" class="cta">Get in touch</a>
    </div>
  </section>

  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title">Experience</h2>
      <div class="experience-grid">
        
        <div class="experience-card">
          <div class="card-header">
            <div>
              <h3 class="card-title">CEO & Founder</h3>
              <a href="https://nipux.com" target="_blank" class="card-company">Nipux Inc</a>
            </div>
          </div>
          <p class="card-description">
            Leading a server hosting company focused on reliable and scalable infrastructure solutions.
          </p>
          <div class="card-tags">
            <span class="tag">Leadership</span>
            <span class="tag">Cloud Infrastructure</span>
            <span class="tag">Business Development</span>
          </div>
        </div>

        <div class="experience-card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Software Developer</h3>
              <a href="https://treefrog.com" target="_blank" class="card-company">TreeFrog Inc</a>
            </div>
          </div>
          <p class="card-description">
            Developed innovative software solutions for various client projects in Newmarket, Ontario.
          </p>
          <div class="card-tags">
            <span class="tag">Web Development</span>
            <span class="tag">System Architecture</span>
            <span class="tag">Client Solutions</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        
        <div class="project-card">
          <h3 class="project-title">Auto Robot Navigator</h3>
          <p class="project-description">Autonomous robot navigation system using computer vision and Bluetooth control.</p>
          <a href="https://github.com/KaiStephens/autoRobot" target="_blank" class="project-link">View on GitHub →</a>
        </div>

        <div class="project-card">
          <h3 class="project-title">Echo Notes</h3>
          <p class="project-description">Smart lecture recording and summarization tool with AI transcription.</p>
          <a href="https://github.com/KaiStephens/echonotes" target="_blank" class="project-link">View on GitHub →</a>
        </div>

        <div class="project-card">
          <h3 class="project-title">Personal Jarvis</h3>
          <p class="project-description">Advanced AI assistant with wake word detection and natural conversation.</p>
          <a href="https://github.com/KaiStephens/personalJarvis" target="_blank" class="project-link">View on GitHub →</a>
        </div>

        <div class="project-card">
          <h3 class="project-title">TeachAssist Scraper</h3>
          <p class="project-description">YRDSB mark fetcher with AI teaching assistant powered by Google GenAI.</p>
          <a href="https://github.com/KaiStephens/TeachAssistScraper" target="_blank" class="project-link">View on GitHub →</a>
        </div>

      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <div class="contact">
        <h2 class="section-title">Let's Connect</h2>
        <div class="contact-links">
          <a href="mailto:kai@kaios.ca" class="contact-link">Email</a>
          <a href="https://github.com/KaiStephens" target="_blank" class="contact-link">GitHub</a>
          <a href="https://twitter.com/kaiostephens" target="_blank" class="contact-link">Twitter</a>
        </div>
      </div>
    </div>
  </section>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    });
  </script>
</body>
</html>`

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=86400',
      'x-content-type-options': 'nosniff',
    },
  })
}