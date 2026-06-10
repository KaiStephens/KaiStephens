addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kai Stephens | Digital Portfolio</title>
  <meta name="description" content="Kai Stephens digital portfolio for computer science, software development, AI, automation, and infrastructure projects.">
  <style>
    :root {
      --bg: #0c1118;
      --panel: #111a24;
      --panel-2: #172332;
      --text: #f4f7fb;
      --muted: #aeb9c7;
      --line: #2b3a4d;
      --accent: #35c2a1;
      --accent-2: #f0b84b;
      --link: #7cc7ff;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
    }

    a {
      color: var(--link);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .shell {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(12, 17, 24, 0.92);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(12px);
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 64px;
      gap: 24px;
    }

    .brand {
      color: var(--text);
      font-weight: 750;
      font-size: 1rem;
    }

    .nav-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 18px;
      font-size: 0.94rem;
    }

    .hero {
      padding: 88px 0 52px;
      border-bottom: 1px solid var(--line);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
      gap: 42px;
      align-items: center;
    }

    .eyebrow {
      color: var(--accent);
      font-weight: 700;
      margin: 0 0 14px;
      text-transform: uppercase;
      font-size: 0.78rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.45rem, 6vw, 5.4rem);
      line-height: 0.98;
      letter-spacing: 0;
    }

    .hero-copy {
      margin: 24px 0 0;
      max-width: 720px;
      color: var(--muted);
      font-size: 1.12rem;
    }

    .hero-actions,
    .link-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 16px;
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--text);
      border-radius: 8px;
      font-weight: 700;
    }

    .button.primary {
      background: var(--accent);
      color: #06120f;
      border-color: var(--accent);
    }

    .snapshot {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 22px;
    }

    .snapshot h2 {
      margin: 0 0 14px;
      font-size: 1.05rem;
    }

    .snapshot ul,
    .goals ul {
      margin: 0;
      padding-left: 20px;
      color: var(--muted);
    }

    section {
      padding: 72px 0;
      border-bottom: 1px solid var(--line);
    }

    .section-heading {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 28px;
    }

    h2 {
      margin: 0;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      line-height: 1.05;
      letter-spacing: 0;
    }

    .section-note {
      margin: 0;
      color: var(--muted);
      max-width: 520px;
    }

    .about-text {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
      color: var(--muted);
      font-size: 1.03rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }

    .skill,
    .project,
    .goal,
    .contact-box {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
    }

    .skill {
      padding: 18px;
      min-height: 154px;
    }

    .skill h3,
    .project h3,
    .goal h3 {
      margin: 0 0 8px;
      font-size: 1.06rem;
    }

    .skill p,
    .project p,
    .project li,
    .goal p {
      margin: 0;
      color: var(--muted);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }

    .project {
      overflow: hidden;
    }

    .project-media {
      height: 180px;
      background: var(--panel-2);
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      padding: 18px;
      text-align: center;
    }

    .project-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }

    .project-body {
      padding: 22px;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 14px 0;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      min-height: 26px;
      padding: 0 10px;
      border-radius: 999px;
      background: rgba(53, 194, 161, 0.12);
      color: #9bf0dc;
      border: 1px solid rgba(53, 194, 161, 0.3);
      font-size: 0.82rem;
      font-weight: 700;
    }

    .project dl {
      display: grid;
      gap: 10px;
      margin: 18px 0;
    }

    .project dt {
      color: var(--accent-2);
      font-weight: 800;
    }

    .project dd {
      margin: 0;
      color: var(--muted);
    }

    .goals-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .goal {
      padding: 20px;
    }

    .contact-box {
      padding: 26px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    footer {
      padding: 28px 0 42px;
      color: var(--muted);
      font-size: 0.92rem;
    }

    @media (max-width: 900px) {
      .hero-grid,
      .about-text,
      .projects-grid,
      .goals-grid {
        grid-template-columns: 1fr;
      }

      .skills-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .section-heading,
      .contact-box {
        align-items: start;
        flex-direction: column;
      }
    }

    @media (max-width: 560px) {
      nav {
        align-items: start;
        flex-direction: column;
        padding: 14px 0;
      }

      .nav-links {
        justify-content: flex-start;
      }

      .hero {
        padding-top: 52px;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <nav class="shell" aria-label="Primary navigation">
      <a class="brand" href="#home">Kai Stephens</a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#goals">Future Goals</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>

  <main id="home">
    <section class="hero">
      <div class="shell hero-grid">
        <div>
          <p class="eyebrow">Computer science digital portfolio</p>
          <h1>Kai Stephens</h1>
          <p class="hero-copy">I build software, automation tools, AI experiments, and infrastructure projects. This portfolio shows my current skills, projects, learning goals, and interest in computer science, software engineering, and practical technology.</p>
          <div class="hero-actions">
            <a class="button primary" href="https://kaios.ca">kaios.ca</a>
            <a class="button" href="https://github.com/KaiStephens">GitHub Profile</a>
            <a class="button" href="https://github.com/KaiStephens/KaiStephens/blob/main/REFLECTION.md">Reflection</a>
          </div>
        </div>
        <aside class="snapshot" aria-label="Portfolio snapshot">
          <h2>Portfolio Snapshot</h2>
          <ul>
            <li>Profile README with About Me, skills, goals, and projects</li>
            <li>Portfolio website source in GitHub</li>
            <li>Four project showcases with evidence links</li>
            <li>Safe public contact links only</li>
          </ul>
        </aside>
      </div>
    </section>

    <section id="about">
      <div class="shell">
        <div class="section-heading">
          <h2>About Me</h2>
          <p class="section-note">A short introduction to my interests as a computer science learner.</p>
        </div>
        <div class="about-text">
          <p>I am interested in computer science because I like building tools that solve real problems and make technology easier to use. I am currently developing my skills in web development, Python, JavaScript, AI tools, cloud infrastructure, and automation.</p>
          <p>I enjoy projects that combine software with practical outcomes, such as robotics, study tools, personal assistants, and dashboards. I am considering a future pathway in computer science, software engineering, or another technology-focused program where I can keep building larger systems.</p>
        </div>
      </div>
    </section>

    <section id="skills">
      <div class="shell">
        <div class="section-heading">
          <h2>Skills</h2>
          <p class="section-note">Each skill is connected to something I have built or practiced.</p>
        </div>
        <div class="skills-grid">
          <article class="skill"><h3>Python</h3><p>Used for automation, APIs, audio processing, web scraping, AI tools, and robotics projects.</p></article>
          <article class="skill"><h3>HTML/CSS</h3><p>Used to build this portfolio with clear sections, navigation, and responsive layout.</p></article>
          <article class="skill"><h3>JavaScript</h3><p>Used for interactive web behavior and Cloudflare Worker code that serves web content.</p></article>
          <article class="skill"><h3>Flask</h3><p>Used in TeachAssist Scraper to build a web application for student mark data and AI support.</p></article>
          <article class="skill"><h3>OpenCV</h3><p>Used in Auto Robot Navigator for marker detection, perspective correction, and robot direction logic.</p></article>
          <article class="skill"><h3>GitHub</h3><p>Used to organize repositories, document projects, and publish portfolio work.</p></article>
          <article class="skill"><h3>AI APIs</h3><p>Used for transcription, summarization, teaching assistant features, and voice assistant responses.</p></article>
          <article class="skill"><h3>Debugging</h3><p>Used to break larger problems into smaller tests and improve projects over time.</p></article>
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="shell">
        <div class="section-heading">
          <h2>Projects</h2>
          <p class="section-note">These examples show software, AI, automation, web development, and robotics work.</p>
        </div>
        <div class="projects-grid">
          <article class="project">
            <div class="project-media"><img src="https://raw.githubusercontent.com/KaiStephens/autoRobot/main/IMG_2512.jpeg" alt="Auto Robot Navigator project screenshot" loading="lazy"></div>
            <div class="project-body">
              <h3>Auto Robot Navigator</h3>
              <p>An autonomous robot navigation system that uses a live camera feed, computer vision, perspective correction, and Bluetooth control to guide a robot toward a target.</p>
              <div class="meta"><span class="tag">Python</span><span class="tag">OpenCV</span><span class="tag">ESP32</span><span class="tag">Bluetooth</span></div>
              <dl>
                <dt>What I did</dt><dd>Built the software pipeline for camera capture, point selection, marker detection, orientation calculation, and motor command output.</dd>
                <dt>Challenge</dt><dd>Making visual detection reliable when lighting, camera angle, and marker position changed.</dd>
                <dt>Next improvement</dt><dd>Improve calibration, add stronger target selection, and include a clearer demo video or setup guide.</dd>
              </dl>
              <a href="https://github.com/KaiStephens/autoRobot">View project evidence</a>
            </div>
          </article>

          <article class="project">
            <div class="project-media">Audio recording, transcription, and AI summary workflow</div>
            <div class="project-body">
              <h3>Echo Notes</h3>
              <p>A lecture recording and summarization tool that records audio, transcribes it, and creates AI-generated summaries for easier studying.</p>
              <div class="meta"><span class="tag">Python</span><span class="tag">Whisper</span><span class="tag">OpenAI API</span><span class="tag">PyAudio</span></div>
              <dl>
                <dt>What I did</dt><dd>Created a workflow that records audio, processes it, sends it through transcription and summarization, and saves the result.</dd>
                <dt>Challenge</dt><dd>Managing audio dependencies, file size limits, and the cost tradeoff between API transcription and local Whisper.</dd>
                <dt>Next improvement</dt><dd>Add a cleaner interface, stronger error handling, and better organization by course or topic.</dd>
              </dl>
              <a href="https://github.com/KaiStephens/echonotes">View project evidence</a>
            </div>
          </article>

          <article class="project">
            <div class="project-media">Wake word, speech recognition, TTS, weather, and scheduled messages</div>
            <div class="project-body">
              <h3>Personal Jarvis</h3>
              <p>A voice-based AI assistant with wake word detection, speech recognition, text-to-speech, weather updates, and scheduled messages.</p>
              <div class="meta"><span class="tag">Python</span><span class="tag">Speech APIs</span><span class="tag">TTS</span><span class="tag">Automation</span></div>
              <dl>
                <dt>What I did</dt><dd>Connected voice input, AI responses, text-to-speech playback, weather data, and scheduled tasks into one assistant.</dd>
                <dt>Challenge</dt><dd>Getting several APIs and audio features to work together reliably in a real-time workflow.</dd>
                <dt>Next improvement</dt><dd>Improve privacy controls, local processing, and long-running reliability.</dd>
              </dl>
              <a href="https://github.com/KaiStephens/personalJarvis">View project evidence</a>
            </div>
          </article>

          <article class="project">
            <div class="project-media">Flask app for mark reports, parsing, JSON storage, and AI support</div>
            <div class="project-body">
              <h3>TeachAssist Scraper</h3>
              <p>A Flask web application that fetches mark information, displays detailed reports, and adds an AI teaching assistant for questions about the data.</p>
              <div class="meta"><span class="tag">Flask</span><span class="tag">BeautifulSoup</span><span class="tag">Requests</span><span class="tag">Google GenAI</span></div>
              <dl>
                <dt>What I did</dt><dd>Built the web app flow for fetching data, parsing pages, displaying results, and connecting the data to an AI assistant.</dd>
                <dt>Challenge</dt><dd>Handling login/session behavior and parsing web data safely and consistently.</dd>
                <dt>Next improvement</dt><dd>Strengthen security, avoid storing sensitive information, and make the interface easier to use.</dd>
              </dl>
              <a href="https://github.com/KaiStephens/TeachAssistScraper">View project evidence</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="goals">
      <div class="shell">
        <div class="section-heading">
          <h2>Future Goals</h2>
          <p class="section-note">What I want to improve as I keep learning.</p>
        </div>
        <div class="goals-grid">
          <article class="goal"><h3>Full-stack web development</h3><p>Build larger projects with cleaner architecture, stronger UI, and better deployment workflows.</p></article>
          <article class="goal"><h3>AI and automation</h3><p>Learn more about useful AI tools, private infrastructure, and automation that solves real problems.</p></article>
          <article class="goal"><h3>Project documentation</h3><p>Add more screenshots, demo videos, setup guides, and reflections to my repositories.</p></article>
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="shell">
        <div class="contact-box">
          <div>
            <h2>Contact</h2>
            <p class="section-note">Safe public links for viewing my work.</p>
          </div>
          <div class="link-row">
            <a class="button primary" href="https://kaios.ca">kaios.ca</a>
            <a class="button" href="https://github.com/KaiStephens">GitHub</a>
            <a class="button" href="https://nipux.com">Nipux</a>
            <a class="button" href="https://twitter.com/kaiostephens">Twitter/X</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="shell">&copy; 2026 Kai Stephens. No private phone number, address, birthday, student number, or passwords are shared here.</div>
  </footer>
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
