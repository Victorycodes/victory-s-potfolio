"use client";

import { useEffect, useState } from "react";

const navigation = [
  { label: "About", href: "#about", number: "01" },
  { label: "Stack", href: "#stack", number: "02" },
  { label: "Projects", href: "#projects", number: "03" },
  { label: "Contact", href: "#contact", number: "04" },
];

type Project = {
  number: string;
  name: string;
  kind: string;
  description: string;
  tags: string[];
  categories: ProjectFilter[];
  repo: string;
  api?: string;
  live?: string;
};

const projects: Project[] = [
  {
    number: "01",
    name: "Uniplug",
    kind: "Student marketplace",
    description:
      "A campus marketplace that helps students buy and sell with each other. The frontend is built with Next.js, React, and Tailwind CSS, alongside a Laravel API.",
    tags: ["Next.js", "React", "Tailwind", "Laravel", "PHP"],
    categories: ["fullstack", "frontend", "backend"],
    repo: "https://github.com/Victorycodes/uniplug",
    api: "https://github.com/Victorycodes/uniplug-backend",
  },
  {
    number: "02",
    name: "Car rental",
    kind: "Website",
    description:
      "A car rental website project, designed to make browsing and booking a vehicle straightforward.",
    tags: ["Web design", "JavaScript"],
    categories: ["frontend"],
    repo: "https://github.com/Victorycodes/Car-rental",
  },
  {
    number: "03",
    name: "Furniro",
    kind: "E-commerce storefront",
    description:
      "A furniture e-commerce storefront project, built as an interactive shopping experience.",
    tags: ["E-commerce", "JavaScript"],
    categories: ["fullstack", "frontend"],
    repo: "https://github.com/Victorycodes/Ecommerce-furniro-website",
  },
  {
    number: "04",
    name: "Product list with cart",
    kind: "Shopping interface",
    description:
      "A product-list project with a cart, focused on the core interactions of an online shopping flow.",
    tags: ["JavaScript", "Cart"],
    categories: ["frontend"],
    repo: "https://github.com/Victorycodes/product-list-with-cart",
  },
];

const skillGroups = [
  { label: "Frontend", skills: ["JavaScript", "TypeScript", "React", "Next.js"] },
  { label: "Styling", skills: ["Tailwind CSS", "Bootstrap", "CSS"] },
  { label: "Backend", skills: ["PHP", "Laravel"] },
];

const technologies = [
  "JavaScript",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "PHP",
  "Laravel",
  "Bootstrap",
  "Next.js",
];

type ProjectFilter = "all" | "fullstack" | "frontend" | "backend";

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [roleText, setRoleText] = useState("Full-stack Developer");

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > 560);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const roles = [
      "Full-stack Developer",
      "React Developer",
      "PHP / Laravel Developer",
      "JavaScript Developer",
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;
    let timeout: ReturnType<typeof setTimeout>;

    const animateText = () => {
      const currentRole = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      setRoleText(currentRole.slice(0, characterIndex));

      if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      } else if (!deleting && characterIndex === roles[roleIndex].length) {
        deleting = true;
        timeout = setTimeout(animateText, 1500);
        return;
      }

      timeout = setTimeout(animateText, deleting ? 45 : 85);
    };

    timeout = setTimeout(animateText, 1600);
    return () => clearTimeout(timeout);
  }, []);

  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.categories.includes(filter),
  );

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Victory Ejimofor home">
            VE<span>/</span>
          </a>

          <button
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <ul
            className={`nav-links${menuOpen ? " is-open" : ""}`}
            id="primary-navigation"
          >
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  <span className="nav-number">{item.number}</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-github-mobile">
              <a
                href="https://github.com/Victorycodes"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight />
              </a>
            </li>
          </ul>

          <a
            className="nav-github"
            href="https://github.com/Victorycodes"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> HELLO, I’M VICTORY EJIMOFOR</p>
              <h1>
                VICTORY
                <br />
                <span>EJIMOFOR</span>
              </h1>
              <p className="hero-role" aria-label={roleText}>
                <span aria-hidden="true">&gt; </span>
                <span aria-hidden="true">{roleText}</span>
                <span className="role-cursor" aria-hidden="true" />
              </p>
              <p className="hero-description">
                I design and build useful web experiences with JavaScript,
                React, PHP, and Laravel — from a first idea to a working product.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my work <ArrowUpRight />
                </a>
                <a className="text-link" href="#contact">
                  Get in touch <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="hero-meta" aria-label="Profile highlights">
                <span>LOC — NIGERIA</span>
                <span>EXP — FULL-STACK DEVELOPMENT</span>
                <span>PROJECTS — 29 PUBLIC REPOS</span>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-core">
                <span className="core-bracket">&lt;</span>
                <span className="core-slash">/</span>
                <span className="core-bracket">&gt;</span>
              </div>
              <div className="float-card float-card-top">
                <span className="float-label">CURRENT FOCUS</span>
                <strong>Full-stack web</strong>
                <span className="mini-bars"><i /><i /><i /><i /><i /></span>
              </div>
              <div className="float-card float-card-bottom">
                <span className="code-dot" />
                <span>shipping ideas</span>
                <span className="code-cursor">_</span>
              </div>
              <span className="art-index">01 — 04</span>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span /> SCROLL TO EXPLORE
          </a>
        </section>

        <div className="tech-strip" aria-label="Technologies">
          <div className="tech-track">
            {[false, true].map((duplicate) => (
              <div
                className="tech-group"
                key={duplicate ? "duplicate" : "primary"}
                aria-hidden={duplicate}
              >
                {technologies.map((technology) => (
                  <span key={technology}>{technology}<i>✳</i></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="content-section section-wrap" id="about">
          <div className="section-heading">
            <p className="eyebrow section-eyebrow">01 / ABOUT</p>
            <h2>Curious by nature.<br /><span>Developer by craft.</span></h2>
          </div>
          <div className="about-content">
            <p className="about-lead">
              I’m a web developer and full-stack builder who enjoys taking an
              idea from its first sketch to a working product.
            </p>
            <div className="about-details">
              <p>
                My work spans JavaScript and React on the frontend, with PHP and
                Laravel on the backend. I also work with TypeScript, Tailwind
                CSS, and Bootstrap to build responsive web experiences.
              </p>
              <p>
                One project bringing these tools together is Uniplug: a student
                marketplace with a Next.js, React, and Tailwind frontend and a
                Laravel API.
              </p>
              <a className="inline-link" href="https://github.com/Victorycodes" target="_blank" rel="noreferrer">
                More on GitHub <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        <section className="stack-section" id="stack">
          <div className="section-wrap">
            <div className="section-topline">
              <div>
                <p className="eyebrow section-eyebrow">02 / TOOLKIT</p>
                <h2>The tools I work with.</h2>
              </div>
              <p className="section-note">A growing stack, grounded in building.</p>
            </div>
            <div className="skill-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-card" key={group.label}>
                  <span className="skill-index">0{index + 1}</span>
                  <h3>{group.label}</h3>
                  <div className="skill-chips">
                    {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section projects-section section-wrap" id="projects">
          <div className="section-topline project-heading">
            <div>
              <p className="eyebrow section-eyebrow">03 / SELECTED WORK</p>
              <h2>Made with intention.</h2>
            </div>
            <a className="inline-link all-work-link" href="https://github.com/Victorycodes?tab=repositories" target="_blank" rel="noreferrer">
              All repositories <ArrowUpRight />
            </a>
          </div>
          <div className="project-filters" aria-label="Filter projects">
            {([
              ["all", "All work"],
              ["fullstack", "Full-stack"],
              ["frontend", "Frontend"],
              ["backend", "Backend"],
            ] as const).map(([value, label]) => (
              <button
                className={filter === value ? "filter-button is-active" : "filter-button"}
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-art" aria-hidden="true">
                  <span className="project-art-number">{project.number}</span>
                  <span className="project-art-mark">{project.name === "Uniplug" ? "u." : project.name === "Furniro" ? "f." : project.name === "Car rental" ? "cr." : "cart."}</span>
                  <span className="project-art-line" />
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span>{project.kind}</span>
                    <span className="project-index">/{project.number}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      View repository <ArrowUpRight />
                    </a>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        Live site <ArrowUpRight />
                      </a>
                    )}
                    {project.api && (
                      <a href={project.api} target="_blank" rel="noreferrer">
                        API <ArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-wrap">
            <p className="eyebrow section-eyebrow">04 / CONTACT</p>
            <div className="contact-grid">
              <div>
                <h2>Have an idea?<br /><span>Let’s talk.</span></h2>
                <p className="contact-intro">For a project, a collaboration, or just to say hello — reach out.</p>
              </div>
              <div className="contact-details">
                <a className="contact-email" href="mailto:victoryejimofor05@gmail.com">
                  victoryejimofor05@gmail.com <ArrowUpRight />
                </a>
                <a className="contact-phone" href="tel:+2349014827950">
                  +234 901 482 7950
                </a>
                <a className="button button-outline" href="https://github.com/Victorycodes" target="_blank" rel="noreferrer">
                  Find me on GitHub <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand" href="#home" aria-label="Back to top">VE<span>/</span></a>
        <span className="footer-note">DESIGNED TO KEEP BUILDING.</span>
        <span className="footer-copy">© VICTORY EJIMOFOR</span>
      </footer>

      <button
        className={`back-to-top${showTop ? " is-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
