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
              Majit Mambetzhumayev
            </Link>
          </h1>
          
          <h2 className="mt-3 text-lg font-medium tracking-tight text-forest-400 sm:text-2xl">
            Développeur Web Full Stack
          </h2>
          
          <p className="mt-4 max-w-xs leading-normal text-neutral-400">
            Next.js · TypeScript · Node.js · Express · Tailwind
          </p>

          {/* Navigation Desktop */}
          <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
            <ul className="w-max">
              {[
                { id: 'about', label: 'À propos' },
                { id: 'experience', label: 'Expérience' },
                { id: 'competences', label: 'Compétences' },
                { id: 'formations', label: 'Formations' },
                { id: 'infos-comp', label: 'Informations Complémentaires' },
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
      <main className="py-12 lg:w-1/2 lg:pt-40">
        
        {/* À propos */}
        <section id="about" className="mb-16 scroll-mt-16 lg:mb-16 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6  w-screen bg-forest-900/75 px-6 py-5 backdrop-blur lg:hidden">
            <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-200">
              À propos
            </h2>
          </div>
          
          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>
                Développeur web full stack orienté front, autodidacte, avec une forte appétence produit et automatisation. 
                J&apos;interviens sur des projets web concrets allant de la génération de leads à des plateformes e‑learning et e‑commerce,
                 avec une attention particulière portée à la performance, à la clarté du code et à l&apos;expérience utilisateur.
            </p>
            <p>
                Habitué à travailler sans cadre académique classique, je compense par une capacité d&apos;apprentissage rapide, 
                une approche pragmatique et une mise en production régulière de projets réels.
            </p>
            </div>
        </section>

        {/* Expérience */}
        <section id="experience" className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur ">
            <h2 className="text-lg lg:text-3xl font-bold  tracking-widest text-neutral-200">
              Expérience professionnelle
            </h2>
          </div>

          <ol className="group/list">
            {/* Expérience Unifiée */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 "></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  2023 — Présent
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-neutral-200">
                    <span className="inline-flex items-baseline font-medium leading-tight text-neutral-300 text-lg pb-4">
                      Développeur Web Full Stack · Projets freelance & produits web
                    </span>
                  </h3>

                  {/* Liste des projets */}
                  <div className="mt-4 space-y-6">
                    
                    {/* Projet 1 - Plateforme de génération de leads */}
                      <h4 className="text-md font-semibold text-forest-400 mb-2">
                        Plateforme de génération de leads
                      </h4>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                        <p className="text-sm leading-relaxed text-neutral-400 mb-2">
                          Conception et développement d&apos;un site vitrine avec <span className='text-neutral-200'>questionnaire interactif</span> pour 
                          l&apos;estimation de projets. Mise en place d&apos;un <span className='text-neutral-200'>backend Next.js</span> pour la réception, le  
                          <span className='text-neutral-200'> traitement et l&apos;automatisation des leads</span> vers Notion. Déploiement sur Vercel.
                        </p>
                      </div>

{/*                       <ul className="flex flex-wrap gap-2">
                        {['Next.js', 'TypeScript', 'Tailwind CSS', 'Notion API', 'Vercel'].map(tech => (
                          <li key={tech}>
                            <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul> */}

                    {/* Projet 2 - Umaï */}
                    
                      <h4 className="text-md font-semibold text-forest-400 mb-2">
                        Plateforme e-commerce – Umaï
                      </h4>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <p className="text-sm leading-relaxed text-neutral-400 mb-2">
                        Intégration et configuration avancée de Shopify. <span className='text-neutral-200'>Customization du frontend avec Liquid</span>. Connexion avec des outils externes 
                        (emails, automatisations) et <span className='text-neutral-200'>optimisation du parcours utilisateur</span>.
                      </p>
                      </div>
{/*                       <ul className="flex flex-wrap gap-2">
                        {['Shopify', 'Meta Ads', 'Email Marketing', 'Copywriting'].map(tech => (
                          <li key={tech}>
                            <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul> */}
                    

                    {/* Projet 3 - Faceplastie */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <h4 className="text-md font-semibold text-forest-400 mb-2">
                        Plateforme e-learning – Faceplastie
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-400 mb-2">
                        Mise en place et personnalisation de la plateforme LearnWorlds. Intégration d&apos;outils 
                        externes et gestion d&apos;une base de plus de 2 000 inscrits. <span className='text-neutral-200'>Migration LMS complexe avec 
                        préservation des données utilisateurs.</span>
                      </p>
{/*                       <ul className="flex flex-wrap gap-2">
                        {['LearnWorlds', 'WordPress', 'Make', 'Zapier', 'Stripe', 'GA4'].map(tech => (
                          <li key={tech}>
                            <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul> */}
                    </div>

                    {/* Projet 4 - API d'ingestion */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <h4 className="text-md font-semibold text-forest-400 mb-2 flex items-center gap-2">
                        API d&apos;ingestion de leads
                        <span className="text-xs font-normal text-neutral-500 italic">(en cours)</span>
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-400 mb-2">
                        Développement d&apos;une <span className='text-neutral-200'>API REST</span> dédiée à la collecte et au traitement de leads provenant 
                        de plateformes externes (Malt, Codeur.com). <span className='text-neutral-200'>Normalisation des données et communication 
                        avec le backend principal.</span>
                      </p>
{/*                       <ul className="flex flex-wrap gap-2">
                        {['Express', 'Node.js', 'REST API', 'PostgreSQL'].map(tech => (
                          <li key={tech}>
                            <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-xs font-medium leading-5 text-forest-100">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul> */}
                    </div>

                  </div>
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
        <section id="competences" className="mb-16 scroll-mt-16 lg:mb-32 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur">
            <h2 className="text-lg lg:text-3xl font-bold tracking-widest text-neutral-200">
              Compétences
            </h2>
          </div>
          {/* Liste de compétences par catégorie */}
          <ol className="group/list">
            {/* Frontend */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 ">
                </div>                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  Frontend
                </header>
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    {/* Liste compétences frontend */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                      {['Next.js (App router, API routes)', 'React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'].map(skill => (
                        <li key={skill}>
                          <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-2 border-forest-800 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                            {skill}
                          </div>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Backend */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 ">
                </div>                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  Backend
                </header>
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    {/* Liste compétences Backend */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                      {['Node.js', 'Express','REST APIs', 'PostgreSQL', 'Authentification (JWT / sessions)', 'Webhooks & intégrations tierces' ].map(skill => (
                          <li key={skill}>
                          <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                              {skill}
                          </div>
                          </li>
                      ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* Outils & écosystème */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 ">
                </div>                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  Outils & écosystème
                </header>
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    {/* Liste compétences Outils & écosystème */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                      {['Vercel', 'ESLint','Git / GitHub', 'Notion API', 'Resend (emails transactionnels)', 'Stripe (bases)' ].map(skill => (
                          <li key={skill}>
                          <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                              {skill}
                          </div>
                          </li>
                      ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* CMS / plateformes */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 ">
                </div>                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  CMS / plateformes
                </header>
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    {/* Liste compétences CMS / plateformes */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                      {['Shopify (customisation, intégrations)', 'LearnWorlds','Mailerlite', 'Zapier', 'Make' ].map(skill => (
                          <li key={skill}>
                          <div className="flex items-center rounded-full bg-forest-800/50 px-3 py-1 text-md font-medium leading-5 text-forest-100 border-1 border-forest-600 hover:scale-105 hover:bg-forest-100 hover:text-forest-900 transition duration-300 ease-in-out">
                              {skill}
                          </div>
                          </li>
                      ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>

          
        </section>

        {/* Formation */}
        <section id="formations" className="mb-16 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur">
            <h2 className="text-lg lg:text-3xl font-bold  tracking-widest text-neutral-200">
              Formations
            </h2>
          </div>

          <ol className="group/list">
          <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 "></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  2023 — Présent
                </header>

                <div className="z-10 sm:col-span-6"> 
                    {/* Bac S */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <h4 className="text-md font-semibold text-neutral-300 mb-2">
                        Parcours autodidacte en développement web
                      </h4>
                      <p className="text-sm leading-relaxed text-forest-400 mb-2">
                        documentation officielle, projets réels, mise en production
                      </p>
                    </div>
                </div>
              </div>
            </li>
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20 "></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  2014
                </header>

                <div className="z-10 sm:col-span-6"> 
                    {/* Bac S */}
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <h4 className="text-md font-semibold text-neutral-300 mb-2">
                        Baccalauréat S
                      </h4>
                      <p className="text-sm leading-relaxed text-forest-400 mb-2">
                        Lycée René Cassin - Oslo
                      </p>
                    </div>
                </div>
              </div>
            </li>
          </ol>
        </section>
        {/* Infos complémentaires */}
        <section id="infos-comp" className="mb-16 scroll-mt-16 lg:mb-32 lg:scroll-mt-24 h-[40vh]">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur">
            <h2 className="text-lg lg:text-3xl font-bold tracking-widest text-neutral-200">
              Informations complémentaires
            </h2>
          </div>
          <div className='text-neutral-300 text-lg'>
            <div className="my-4 p-4 border-1 border-forest-800 hover:bg-forest-800/20 hover:text-forest-100 hover:border-forest-900 hover:scale-105 rounded-lg transition-all ease-in-out">
              <p>Forte autonomie et capacité d&apos;apprentissage rapide</p>
            </div>
            <div className="my-4 p-4 border-1 border-forest-800 hover:bg-forest-800/20 hover:text-forest-100 hover:border-forest-900 hover:scale-105 rounded-lg transition-all ease-in-out">
              <p>Sens du produit et de la valeur métier</p>
            </div>
            <div className="my-4 p-4 border-1 border-forest-800 hover:bg-forest-800/20 hover:text-forest-100 hover:border-forest-900 hover:scale-105 rounded-lg transition-all ease-in-out">
              <p>À l&apos;aise dans des environnements sans cadre académique classique</p>
            </div>
          </div>
        </section>  

        {/* Footer */}
        <footer className="max-w-md text-sm text-neutral-500 pt-20 lg:pt-40 pb-0">
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