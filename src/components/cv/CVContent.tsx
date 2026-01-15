// app/cv/CVContent.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CVContent() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'projects'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:flex lg:justify-between lg:gap-4 max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      
      {/* LEFT SIDE - Sticky Info */}
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-40">
        <div>
          {/* Nom + Titre */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <Link href="/" className="hover:text-forest-300 transition-colors">
              Majit Morosetti Mambetzhumayev
            </Link>
          </h1>
          
          <h2 className="mt-3 text-lg font-medium tracking-tight text-forest-400 sm:text-2xl">
            Développeur Web Full Stack
          </h2>
          
          <p className="mt-4 max-w-xs leading-normal text-neutral-400">
            Développeur autodidacte spécialisé en automatisation et solutions web orientées business.
          </p>

          {/* Navigation Desktop */}
          <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
            <ul className="w-max">
              {[
                { id: 'about', label: 'À propos' },
                { id: 'experience', label: 'Expérience' },
                { id: 'skills', label: 'Compétences' },
                { id: 'projects', label: 'Projets' },
              ].map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`group flex items-center py-3 ${
                      activeSection === id ? 'active' : ''
                    }`}
                  >
                    <span
                      className={`nav-indicator mr-4 h-px w-8 bg-neutral-600 transition-all ${
                        activeSection === id
                          ? 'w-16 bg-white'
                          : 'group-hover:w-16 group-hover:bg-neutral-300'
                      }`}
                    ></span>
                    <span
                      className={`nav-text text-xs font-bold uppercase tracking-widest ${
                        activeSection === id
                          ? 'text-white'
                          : 'text-neutral-500 group-hover:text-neutral-200'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Social Links */}
        <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
          <li className="text-xs">
            
            <a 
                href="https://github.com/majitmorosetti"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white text-neutral-400 transition"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </li>
          
          <li className="text-xs">
            
              <a href="https://linkedin.com/in/majitmorosetti"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white text-neutral-400 transition"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </li>

          <li className="text-xs">
            
              <a href="/cv-majit-morosetti.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white text-neutral-400 transition"
              aria-label="Télécharger CV PDF"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
              </svg>
            </a>
          </li>
        </ul>
      </header>

      {/* RIGHT SIDE - Scrollable Content */}
      <main className="py-12 lg:w-1/2 lg:py-40">
        
        {/* À propos */}
        <section id="about" className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6  w-screen bg-forest-900/75 px-6 py-5 backdrop-blur lg:hidden">
            <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-200">
              À propos
            </h2>
          </div>
          
          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>
                Développeur web full stack <strong className="text-neutral-200">autodidacte</strong> avec 
                5 ans de pratique et une expérience terrain continue depuis août 2023 sur des projets web 
                à enjeux business réels.
            </p>
            <p>
                Spécialisé dans la <strong className="text-neutral-200">création, migration et optimisation 
                de plateformes web</strong>, la conception de systèmes automatisés (Make, Zapier, Notion) 
                et l&apos;intégration d&apos;outils métiers, avec une approche orientée efficacité opérationnelle, 
                réduction des coûts et résultats mesurables.
            </p>
            <p>
                Compétences en <strong className="text-neutral-200">Django, Next.js, React</strong>, 
                plateformes e-commerce (Shopify) et CMS (WordPress, Wix). Maîtrise des outils de développement 
                modernes : <strong className="text-neutral-200">Git pour le versioning, Docker pour la 
                conteneurisation, PostgreSQL</strong> comme base de données relationnelle, et{' '}
                <strong className="text-neutral-200">Postman</strong> pour les tests d&apos;API. 
                Expertise en analytics (GA4, Umami) et automatisation marketing.
            </p>
            </div>
        </section>

        {/* Expérience */}
        <section id="experience" className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur ">
            <h2 className="text-lg lg:text-2xl font-bold  tracking-widest text-neutral-200">
              Expérience
            </h2>
          </div>

          <ol className="group/list">
            {/* Face Plastie */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  Août 2023 — Présent
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-neutral-200">
                    <div>
                        <span className="inline-flex items-baseline font-medium leading-tight text-neutral-200 hover:text-forest-300 focus-visible:text-forest-300 group/link text-base">
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded lg:-inset-x-6 lg:block"></span>
                        <span className="inline-flex items-center gap-1.5">
                            <span>Développeur Web / Automation ·</span>
                            <span className="inline-flex items-center">
                            Faceplastie
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-0.5"
                                aria-hidden="true"
                            >
                                <path
                                fillRule="evenodd"
                                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </span>
                        </span>
                        </span>
                    </div>
                    </h3>

                  <p className="mt-2 text-sm leading-normal text-neutral-400">
                    Développement et maintenance du site faceplastie.com. Gestion infrastructure complète 
                    (domaines, DNS, hébergement). Migration LMS complexe LearnDash → GetCourse → LearnWorlds 
                    avec préservation des données utilisateurs. Conception de systèmes automatisés (Make, Zapier, Notion) 
                    et intégration outils métiers (Stripe, MailerLite, ManyChat, Meta).
                  </p>

                  <ul className="mt-2 flex flex-wrap gap-2">
                    {['WordPress', 'LearnWorlds', 'Make', 'Zapier', 'Stripe', 'GA4', 'Umami'].map(tech => (
                      <li key={tech}>
                        <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {/* Umaï */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  Oct. 2024 — Présent
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-neutral-200">
                    <div>
                      <span className="inline-flex items-baseline font-medium leading-tight text-neutral-200 hover:text-forest-300 focus-visible:text-forest-300 group/link text-base">
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded lg:-inset-x-6 lg:block"></span>
                        <span className="inline-flex items-center gap-1.5">
                            <span>Développeur Web / E-commerce ·</span>
                            <span className="inline-flex items-center">
                                Umaï
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                    aria-hidden="true"
                                >
                                    <path
                                    fillRule="evenodd"
                                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                    clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </span>
                      </span>
                    </div>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-neutral-400">
                    Création et gestion complète du site e-commerce umai.fr sur Shopify. Intégration 
                    outils marketing et paiement. Gestion et optimisation des campagnes Meta Ads avec 
                    création de contenus et optimisation du tunnel de conversion.
                  </p>

                  <ul className="mt-2 flex flex-wrap gap-2">
                    {['Shopify', 'Meta Ads', 'Copywriting', 'Email Marketing'].map(tech => (
                      <li key={tech}>
                        <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {/* Chez Joon */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  2026
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-neutral-200">
                    <span>Développeur Web · Restaurant Chez Joon</span>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-neutral-400">
                    Développement d&apos;un site vitrine sur Wix. Structuration de l&apos;offre, menus, 
                    identité visuelle et optimisation de l&apos;expérience utilisateur locale.
                  </p>

                  <ul className="mt-2 flex flex-wrap gap-2">
                    {['Wix', 'UX Design'].map(tech => (
                      <li key={tech}>
                        <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ol>

          <div className="mt-12">
            
              <a href="/cv-majit-morosetti.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium leading-tight text-neutral-200 group"
            >
              <span className="border-b border-transparent pb-px transition group-hover:border-forest-300">
                Voir le CV complet
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Compétences */}
        <section id="skills" className="mb-16 scroll-mt-16 lg:mb-32 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur">
            <h2 className="text-lg lg:text-2xl font-bold tracking-widest text-neutral-200">
              Compétences
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">Développement</h3>
              <ul className="flex flex-wrap gap-2">
                {['Django', 'Next.js', 'React', 'JavaScript', 'HTML', 'CSS', 'Git'].map(skill => (
                  <li key={skill}>
                    <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                      {skill}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold text-neutral-300 mb-3">Base de données & Backend</h3>
                <ul className="flex flex-wrap gap-2">
                {['PostgreSQL', 'Django ORM', 'Prisma', 'REST APIs'].map(skill => (
                    <li key={skill}>
                    <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                        {skill}
                    </div>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-neutral-300 mb-3">DevOps & Outils</h3>
                <ul className="flex flex-wrap gap-2">
                {['Git', 'GitHub', 'Docker', 'Postman', 'Vercel'].map(skill => (
                    <li key={skill}>
                    <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                        {skill}
                    </div>
                    </li>
                ))}
                </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">CMS & Plateformes</h3>
              <ul className="flex flex-wrap gap-2">
                {['Shopify', 'WordPress', 'Wix', 'LearnWorlds'].map(skill => (
                  <li key={skill}>
                    <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                      {skill}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">Automatisation & Intégrations</h3>
              <ul className="flex flex-wrap gap-2">
                {['Make', 'Zapier', 'Notion', 'ManyChat', 'MailerLite', 'Tally', 'Stripe'].map(skill => (
                  <li key={skill}>
                    <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                      {skill}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">Analytics & Marketing</h3>
              <ul className="flex flex-wrap gap-2">
                {['Google Analytics 4', 'Umami', 'Meta Ads', 'Copywriting'].map(skill => (
                  <li key={skill}>
                    <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                      {skill}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projets */}
        <section id="projects" className="mb-16 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur">
            <h2 className="text-lg lg:text-2xl font-bold  tracking-widest text-neutral-200">
              Projets
            </h2>
          </div>

          <ul className="group/list">
            <li className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  Janvier 2026
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <h3>
                    <span className="inline-flex items-baseline font-medium leading-tight text-neutral-200 hover:text-forest-300 focus-visible:text-forest-300 group/link text-base">
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded lg:-inset-x-6 lg:block"></span>
                      <span>Site Vitrine Next.js · SparqUp</span>
                    </span>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-neutral-400">
                    Frontend moderne avec architecture propre et SEO-friendly. Intégration de systèmes 
                    automatisés internes (Make, Notion) pour la gestion de leads et l&apos;estimation de projets.
                  </p>

                  <ul className="mt-2 flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Make', 'Notion'].map(tech => (
                      <li key={tech}>
                        <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="max-w-md pb-16 text-sm text-neutral-500 pt-20 lg:pt-40 sm:pb-0">
          <p>
            Développé avec <span className="text-neutral-400">Next.js</span> et{' '}
            <span className="text-neutral-400">Tailwind CSS</span>. Déployé sur{' '}
            <span className="text-neutral-400">Vercel</span>.
          </p>
        </footer>
      </main>
    </div>
  );
}