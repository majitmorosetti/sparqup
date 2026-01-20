'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function CVContent() {
  const t = useTranslations('cv');
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'competences', 'formations', 'infos-comp'];
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

  // Helper pour remplacer les balises <highlight> par des spans
  const renderHighlightedText = (text: string) => {
    return text
      .replace(/<highlight>/g, '<span class="text-neutral-200">')
      .replace(/<\/highlight>/g, '</span>');
  };

  return (
    <div className="lg:flex lg:justify-between lg:gap-4 max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      
      {/* LEFT SIDE - Sticky Info */}
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:pb-40 lg:pt-14">
      {/* Language Switcher */}
              <div className='pb-8'>
                <LanguageSwitcher />
              </div>
        <div>
          {/* Nom + Titre */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <Link href={`/${locale}`} className="hover:text-forest-300 transition-colors">
              {t('header.name')}
            </Link>
          </h1>
          
          <h2 className="mt-3 text-lg font-medium tracking-tight text-forest-400 sm:text-2xl">
            {t('header.title')}
          </h2>
          
          <p className="mt-4 max-w-xs leading-normal text-neutral-400">
            {t('header.tagline')}
          </p>

          {/* Navigation Desktop */}
          <nav className="nav hidden lg:block mt-12" aria-label="In-page jump links">
            <ul className="w-max">
              {[
                { id: 'about', label: t('nav.about') },
                { id: 'experience', label: t('nav.experience') },
                { id: 'competences', label: t('nav.skills') },
                { id: 'formations', label: t('nav.education') },
                { id: 'infos-comp', label: t('nav.additional') },
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
              href="https://github.com/majitmambetzhumayev"
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
            <a 
              href="https://linkedin.com/in/majit-mambetzhumayev-95b4273a7"
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
            <a 
              href="/cv-majit-morosetti.pdf"
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
          <div className="sticky top-0 z-20 -mx-6 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur lg:hidden">
            <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-200">
              {t('about.title')}
            </h2>
          </div>
          
          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>
        </section>

        {/* Expérience */}
        <section id="experience" className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-forest-900/75 px-6 py-5 backdrop-blur">
            <h2 className="text-lg lg:text-3xl font-bold tracking-widest text-neutral-200">
              {t('experiences.title')}
            </h2>
          </div>

          <ol className="group/list">
            {/* Expérience Unifiée */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('experiences.devexperience.period')}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-neutral-200">
                    <span className="inline-flex items-baseline font-medium leading-tight text-neutral-300 text-lg pb-4">
                      {t('experiences.devexperience.role')}
                    </span>
                  </h3>

                  {/* Liste des projets */}
                  <div className="mt-4 space-y-6">
                    
                    {/* Projet 1 - Plateforme de génération de leads */}
                    <div>
                      <h4 className="text-md font-semibold text-forest-400 mb-2">
                        {t('experiences.devexperience.projects.leads.title')}
                      </h4>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.devexperience.projects.leads.description'))
                          }}
                        />
                      </div>
                    </div>

                    {/* Projet 2 - Umaï */}
                    <div>
                      <h4 className="text-md font-semibold text-forest-400 mb-2">
                        {t('experiences.devexperience.projects.umai.title')}
                      </h4>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.devexperience.projects.umai.description'))
                          }}
                        />
                      </div>
                    </div>

                    {/* Projet 3 - Faceplastie */}
                    <div>
                      <h4 className="text-md font-semibold text-forest-400 mb-2">
                        {t('experiences.devexperience.projects.faceplastie.title')}
                      </h4>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <p 
                        className="text-sm leading-relaxed text-neutral-400 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: renderHighlightedText(t.raw('experiences.devexperience.projects.faceplastie.description'))
                        }}
                      />
                      </div>
                    </div>

                    {/* Projet 4 - API d'ingestion */}
                    <div>
                      <h4 className="text-md font-semibold text-forest-400 mb-2 flex items-center gap-2">
                        {t('experiences.devexperience.projects.api.title')}
                        <span className="text-xs font-normal text-neutral-500 italic">
                          ({t('experiences.devexperience.projects.api.status')})
                        </span>
                      </h4>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <p 
                        className="text-sm leading-relaxed text-neutral-400 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: renderHighlightedText(t.raw('experiences.devexperience.projects.api.description'))
                        }}
                      />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </li>
            {/*  - Experience 3D designer */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('experiences.3Dexperience.period')}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-neutral-200">
                    <span className="inline-flex items-baseline font-medium leading-tight text-neutral-300 text-lg pb-2">
                      {t('experiences.3Dexperience.role')}
                    </span>
                  </h3>
                  <div className='text-forest-400 text-sm'>Capgemini · Bee Engineering · Abylsen</div>
                  <div className="mt-4 space-y-6">
                    <div>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors my-4">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.3Dexperience.accomplishments.A'))
                          }}
                        />
                      </div>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors my-4">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.3Dexperience.accomplishments.B'))
                          }}
                        />
                      </div>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors my-4">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.3Dexperience.accomplishments.C'))
                          }}
                        />
                      </div>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors my-4">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.3Dexperience.accomplishments.D'))
                          }}
                        />
                      </div>
                      <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors my-4">
                        <p 
                          className="text-sm leading-relaxed text-neutral-400 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(t.raw('experiences.3Dexperience.accomplishments.E'))
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>

          <div className="mt-12">
            <a 
              href="/cv-majit-morosetti.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium leading-tight text-neutral-200 group"
            >
              <span className="border-b border-transparent pb-px transition group-hover:border-forest-300">
                {t('cta.downloadCV')}
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
              {t('skills.title')}
            </h2>
          </div>

          {/* Liste de compétences par catégorie */}
          <ol className="group/list">
            {/* Frontend */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('skills.frontend')}
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                        {(t.raw('skills.categories.frontend') as string[]).map((skill) => (
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
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('skills.backend')}
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                        {(t.raw('skills.categories.backend') as string[]).map((skill) => (
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
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('skills.tools')}
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                        {(t.raw('skills.categories.tools') as string[]).map((skill) => (
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
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="flex items-center z-10 mb-2 mt-1 text-md font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('skills.platforms')}
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <div className="mt-4 space-y-6">
                    <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                      <ul className="flex flex-wrap gap-2">
                        {(t.raw('skills.categories.platforms') as string[]).map((skill) => (
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
            <h2 className="text-lg lg:text-3xl font-bold tracking-widest text-neutral-200">
              {t('education.title')}
            </h2>
          </div>

          <ol className="group/list">
            {/* Autodidacte */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('education.autodidact.period')}
                </header>

                <div className="z-10 sm:col-span-6">
                  <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                    <h4 className="text-md font-semibold text-neutral-300 mb-2">
                      {t('education.autodidact.title')}
                    </h4>
                    <p className="text-sm leading-relaxed text-forest-400 mb-2">
                      {t('education.autodidact.description')}
                    </p>
                  </div>
                </div>
              </div>
            </li>

            {/* Bac S */}
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-forest-800/20"></div>
                
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2">
                  {t('education.bac.period')}
                </header>

                <div className="z-10 sm:col-span-6">
                  <div className="border-l-2 border-forest-700 pl-4 hover:border-forest-400 transition-colors">
                    <h4 className="text-md font-semibold text-neutral-300 mb-2">
                      {t('education.bac.title')}
                    </h4>
                    <p className="text-sm leading-relaxed text-forest-400 mb-2">
                      {t('education.bac.school')}
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
              {t('additional.title')}
            </h2>
          </div>
          
          <div className="text-neutral-300 text-lg">
            {(t.raw('additional.items') as string[]).map((item, index) => (
              <div 
                key={index}
                className="my-4 p-4 border-1 border-forest-800 hover:bg-forest-800/20 hover:text-forest-100 hover:border-forest-900 hover:scale-105 rounded-lg transition-all ease-in-out"
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-md text-sm text-neutral-500 pt-20 lg:pt-40 pb-0">
          <p>
            {t('footer.builtWith')} <span className="text-neutral-400">Next.js</span> {t('footer.and')}{' '}
            <span className="text-neutral-400">Tailwind CSS</span>. {t('footer.deployedOn')}{' '}
            <span className="text-neutral-400">Vercel</span>.
          </p>
        </footer>
      </main>
    </div>
  );
}