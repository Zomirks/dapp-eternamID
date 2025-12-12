// EternamID - Politique de Confidentialité
// Next.js + TailwindCSS + shadcn/ui inspired

"use client";

import React, { useState, useEffect } from "react";

// Arrow Icon
const ArrowLeft = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Chevron Icon
const ChevronRight = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Shield Icon
const ShieldIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Table of Contents Data
const tocItems = [
    { id: "article-1", title: "Article 1", subtitle: "Objet" },
    { id: "article-2", title: "Article 2", subtitle: "Responsable de traitement" },
    { id: "article-3", title: "Article 3", subtitle: "Définitions" },
    { id: "article-4", title: "Article 4", subtitle: "Données traitées" },
    { id: "article-5", title: "Article 5", subtitle: "Blockchain & Hachage" },
    { id: "article-6", title: "Article 6", subtitle: "Finalités" },
    { id: "article-7", title: "Article 7", subtitle: "Bases légales" },
    { id: "article-8", title: "Article 8", subtitle: "Destinataires" },
    { id: "article-9", title: "Article 9", subtitle: "Transferts hors UE" },
    { id: "article-10", title: "Article 10", subtitle: "Durées de conservation" },
    { id: "article-11", title: "Article 11", subtitle: "Sécurité" },
    { id: "article-12", title: "Article 12", subtitle: "Droits des utilisateurs" },
    { id: "article-13", title: "Article 13", subtitle: "Réclamation (CNIL)" },
    { id: "article-14", title: "Article 14", subtitle: "Cookies / Traceurs" },
    { id: "article-15", title: "Article 15", subtitle: "Mise à jour" },
];

// Section Component
interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => (
    <section id={id} className="scroll-mt-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">{title}</h2>
        <div className="text-white/70 leading-relaxed space-y-4">{children}</div>
    </section>
);

// Subsection Component
interface SubsectionProps {
    title: string;
    children: React.ReactNode;
}

const Subsection = ({ title, children }: SubsectionProps) => (
    <div className="mt-6">
        <h3 className="text-lg font-semibold text-white/90 mb-3">{title}</h3>
        <div className="text-white/60 leading-relaxed space-y-3">{children}</div>
    </div>
);

// Warning Box Component
const WarningBox = ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-amber-200/80 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

// Info Box Component
const InfoBox = ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
        <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <div className="text-cyan-200/80 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

// Privacy Box Component (nouveau)
const PrivacyBox = ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20">
        <div className="flex items-start gap-3">
            <span className="text-xl">🔒</span>
            <div className="text-violet-200/80 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

// Main Privacy Policy Page Component
export default function PolitiqueConfidentialitePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState("article-1");
    const [isTocOpen, setIsTocOpen] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Track active section on scroll
    useEffect(() => {
        const observerOptions = {
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            tocItems.forEach((item) => {
                const element = document.getElementById(item.id);
                if (element) observer.observe(element);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [isLoaded]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsTocOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Custom CSS */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .font-serif {
          font-family: 'Instrument Serif', serif;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .gradient-violet {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .toc-item {
          transition: all 0.2s ease;
        }
        
        .toc-item:hover {
          background: rgba(255,255,255,0.05);
        }
        
        .toc-item.active {
          background: rgba(139, 92, 246, 0.1);
          border-left-color: #8b5cf6;
        }
        
        .toc-item.active .toc-title {
          color: #8b5cf6;
        }
      `}</style>

            {/* Mobile TOC Overlay */}
            {isTocOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTocOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-l border-white/10 p-6 pt-24 overflow-y-auto">
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Sommaire</h3>
                        <nav className="space-y-1">
                            {tocItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`toc-item w-full text-left px-3 py-2 rounded-lg border-l-2 border-transparent ${activeSection === item.id ? 'active' : ''
                                        }`}
                                >
                                    <span className={`toc-title text-sm font-medium ${activeSection === item.id ? 'text-violet-400' : 'text-white/70'}`}>
                                        {item.title}
                                    </span>
                                    <span className="block text-xs text-white/40 mt-0.5">{item.subtitle}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Layout */}
            <div className="pt-12 px-6 pb-12">
                <div className="max-w-7xl mx-auto flex gap-12">

                    {/* Sidebar TOC - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Sommaire</h3>
                                <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin pr-2">
                                    {tocItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`toc-item w-full text-left px-3 py-2 rounded-lg border-l-2 border-transparent ${activeSection === item.id ? 'active' : ''
                                                }`}
                                        >
                                            <span className={`toc-title text-sm font-medium ${activeSection === item.id ? 'text-violet-400' : 'text-white/70'}`}>
                                                {item.title}
                                            </span>
                                            <span className="block text-xs text-white/40 mt-0.5">{item.subtitle}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main
                        className={`flex-1 max-w-4xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        {/* Header */}
                        <header className="mb-16">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm">Retour à l'accueil</span>
                            </a>

                            <div className="flex items-center justify-between gap-4 mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-violet-400">
                                    <ShieldIcon className="w-3 h-3" />
                                    <span>Document juridique</span>
                                </div>
                                <button
                                    onClick={() => setIsTocOpen(!isTocOpen)}
                                    className="lg:hidden px-4 py-2 text-sm bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <span>Sommaire</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                                <span className="text-gradient">Politique de</span>
                                <br />
                                <span className="font-serif italic text-white/90">Confidentialité</span>
                            </h1>
                            <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-4">
                                Plateforme EternamID – Protection de vos données personnelles
                            </p>
                            <div className="flex items-center gap-4 text-sm text-white/40">
                                <span>Version du [DATE]</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span>Conformité RGPD</span>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="prose prose-invert max-w-none">

                            {/* Article 1 */}
                            <Section id="article-1" title="Article 1 – Objet">
                                <p>La présente Politique de confidentialité a pour objet d'informer les utilisateurs (ci-après l'« Utilisateur ») de la Plateforme « [●] » des conditions dans lesquelles leurs données à caractère personnel sont collectées, utilisées, stockées et protégées.</p>
                                <PrivacyBox>
                                    <p>Cette politique est établie conformément au <strong>Règlement (UE) 2016/679 (RGPD)</strong> et à la <strong>loi Informatique et Libertés</strong>.</p>
                                </PrivacyBox>
                            </Section>

                            {/* Article 2 */}
                            <Section id="article-2" title="Article 2 – Identité du Responsable de Traitement">
                                <p>Le Responsable de traitement est :</p>
                                <div className="my-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                                    <div className="grid gap-3 text-sm">
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-white/40">Dénomination sociale</span>
                                            <span className="text-white/80 font-medium">[DÉNOMINATION SOCIALE]</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-white/40">Forme juridique</span>
                                            <span className="text-white/80 font-medium">[forme juridique]</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-white/40">RCS</span>
                                            <span className="text-white/80 font-medium">[●] sous le numéro [●]</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-white/40">Siège social</span>
                                            <span className="text-white/80 font-medium">[adresse complète]</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/40">E-mail</span>
                                            <span className="text-white/80 font-medium">[●]</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-white/50">Ci-après le « Responsable ».</p>
                                <div className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                    <p className="text-violet-200/80 text-sm">
                                        <strong>Contact RGPD / DPO (si applicable) :</strong> [Nom / Email]
                                        <br />
                                        <strong>À défaut :</strong> rgpd@domaine.fr
                                    </p>
                                </div>
                            </Section>

                            {/* Article 3 */}
                            <Section id="article-3" title="Article 3 – Définitions">
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Donnée personnelle</h4>
                                        <p className="text-sm text-white/60">Toute information se rapportant à une personne physique identifiée ou identifiable.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Traitement</h4>
                                        <p className="text-sm text-white/60">Toute opération effectuée sur des données personnelles (collecte, conservation, etc.).</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Sous-traitant</h4>
                                        <p className="text-sm text-white/60">Prestataire traitant des données pour le compte du Responsable (hébergeur, support, etc.).</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Wallet</h4>
                                        <p className="text-sm text-white/60">Portefeuille numérique permettant de détenir des crypto-actifs et NFT.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Blockchain</h4>
                                        <p className="text-sm text-white/60">Registre distribué décentralisé sur lequel sont inscrites des transactions et des NFT.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Hachage (SHA-256)</h4>
                                        <p className="text-sm text-white/60">Fonction cryptographique à sens unique transformant une donnée en empreinte ("hash").</p>
                                    </div>
                                </div>
                            </Section>

                            {/* Article 4 */}
                            <Section id="article-4" title="Article 4 – Données Traitées">
                                <Subsection title="4.1 Données d'identification et de contact (si collectées)">
                                    <ul className="mt-3 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Nom, prénom</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Adresse e-mail, téléphone</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Identifiants nécessaires à la gestion de la relation (ID client, tickets support)</span>
                                        </li>
                                    </ul>
                                </Subsection>

                                <Subsection title="4.2 Données liées au wallet et à la blockchain">
                                    <ul className="mt-3 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Adresse(s) publique(s) de wallet</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Identifiants de transactions (hash de transaction), token ID, smart contract, réseau blockchain utilisé</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Éléments techniques nécessaires à la preuve et à la délivrance du service</span>
                                        </li>
                                    </ul>
                                </Subsection>

                                <Subsection title="4.3 Données techniques de navigation et de sécurité">
                                    <ul className="mt-3 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Adresse IP, logs, informations navigateur/terminal</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Données de sécurité (détection d'incidents, anti-fraude), dans la limite nécessaire</span>
                                        </li>
                                    </ul>
                                </Subsection>

                                <Subsection title="4.4 Contenus hébergés (Web2)">
                                    <ul className="mt-3 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Photos, vidéos et fichiers associés au Service Numérique</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                            <span>Métadonnées (date d'envoi, taille, format)</span>
                                        </li>
                                    </ul>
                                    <InfoBox>
                                        Ces contenus sont stockés sur une infrastructure Web2 (hébergement web), et non directement sur la blockchain.
                                    </InfoBox>
                                </Subsection>
                            </Section>

                            {/* Article 5 */}
                            <Section id="article-5" title="Article 5 – Données sur Blockchain & Hachage SHA-256">
                                <Subsection title="5.1 Absence d'inscription de données personnelles en clair">
                                    <p>Le responsable s'efforce de ne jamais inscrire de données personnelles en clair sur la blockchain.</p>
                                </Subsection>

                                <Subsection title="5.2 Hachage SHA-256">
                                    <p>Certaines informations susceptibles d'être liées à l'Utilisateur peuvent être hachées en SHA-256 avant d'être associées à un NFT et/ou inscrites on-chain, afin d'éviter l'inscription d'informations personnelles lisibles.</p>
                                    <WarningBox>
                                        <p>L'Utilisateur est informé que le hachage constitue en principe une <strong>pseudonymisation</strong> (et pas nécessairement une anonymisation) : une donnée hachée peut rester une donnée personnelle si elle peut être rattachée à une personne via des informations complémentaires.</p>
                                    </WarningBox>
                                </Subsection>

                                <Subsection title="5.3 Immutabilité de la blockchain">
                                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                        <p className="text-rose-200/80 text-sm">
                                            <strong>⚠️ Important :</strong> Les informations inscrites sur une blockchain publique sont durables et difficilement modifiables/supprimables. Le Responsable ne peut donc pas garantir l'effacement ou la modification d'éléments déjà inscrits on-chain.
                                        </p>
                                    </div>
                                </Subsection>
                            </Section>

                            {/* Article 6 */}
                            <Section id="article-6" title="Article 6 – Finalités des Traitements">
                                <p>Les données sont traitées pour les finalités suivantes :</p>
                                <div className="my-6 space-y-3">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
                                        <span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-violet text-white text-sm font-bold">1</span>
                                        <div className="pt-1">
                                            <p className="text-white/90 font-medium">Fourniture du Service</p>
                                            <p className="text-white/50 text-sm mt-1">Permettre le mint, attribuer le NFT, donner accès au Service Numérique, gérer l'accès token-gated</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
                                        <span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-violet text-white text-sm font-bold">2</span>
                                        <div className="pt-1">
                                            <p className="text-white/90 font-medium">Gestion de la relation client</p>
                                            <p className="text-white/50 text-sm mt-1">Support, assistance, demandes, réclamations</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
                                        <span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-violet text-white text-sm font-bold">3</span>
                                        <div className="pt-1">
                                            <p className="text-white/90 font-medium">Sécurité</p>
                                            <p className="text-white/50 text-sm mt-1">Prévention fraude, sécurisation des accès, maintenance, preuve technique</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
                                        <span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-violet text-white text-sm font-bold">4</span>
                                        <div className="pt-1">
                                            <p className="text-white/90 font-medium">Obligations légales</p>
                                            <p className="text-white/50 text-sm mt-1">Comptabilité, facturation, gestion des litiges et obligations réglementaires</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
                                        <span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-violet text-white text-sm font-bold">5</span>
                                        <div className="pt-1">
                                            <p className="text-white/90 font-medium">Communication (si applicable)</p>
                                            <p className="text-white/50 text-sm mt-1">Informations relatives au Service, newsletters/offres (selon consentement requis)</p>
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            {/* Article 7 */}
                            <Section id="article-7" title="Article 7 – Bases Légales (RGPD)">
                                <p>Les traitements reposent sur :</p>
                                <div className="my-6 space-y-4">
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">L'exécution du contrat (CGV)</h4>
                                        <p className="text-sm text-white/60">Mint et fourniture du Service</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">L'intérêt légitime</h4>
                                        <p className="text-sm text-white/60">Sécurité, prévention fraude, amélioration et continuité du Service</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Les obligations légales</h4>
                                        <p className="text-sm text-white/60">Conservation des pièces comptables, gestion des litiges</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-violet-500/50">
                                        <h4 className="text-violet-400 font-semibold mb-1">Le consentement</h4>
                                        <p className="text-sm text-white/60">Lorsque requis (ex. prospection électronique, cookies non essentiels)</p>
                                    </div>
                                </div>
                            </Section>

                            {/* Article 8 */}
                            <Section id="article-8" title="Article 8 – Destinataires des Données">
                                <p>Les données peuvent être communiquées :</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>aux personnels habilités du Responsable</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>à des sous-traitants (hébergeur, prestataire support, outils techniques), strictement pour les besoins du Service</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>aux autorités compétentes lorsque la loi l'exige</span>
                                    </li>
                                </ul>
                                <PrivacyBox>
                                    Les sous-traitants sont soumis à des obligations contractuelles de confidentialité et de sécurité.
                                </PrivacyBox>
                            </Section>

                            {/* Article 9 */}
                            <Section id="article-9" title="Article 9 – Transferts Hors Union Européenne">
                                <p>Les données sont, par principe, hébergées et traitées dans l'Union européenne.</p>
                                <p className="mt-4">Si un transfert hors UE/EEE est nécessaire, il est encadré par des garanties appropriées (ex. clauses contractuelles types de la Commission européenne) et l'Utilisateur en est informé.</p>
                                <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                    <p className="text-sm text-white/50 italic">
                                        (À compléter selon vos prestataires : [hébergeur], [pays], [base de transfert].)
                                    </p>
                                </div>
                            </Section>

                            {/* Article 10 */}
                            <Section id="article-10" title="Article 10 – Durées de Conservation">
                                <p>Sauf obligation légale ou nécessité particulière :</p>
                                <div className="my-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                                    <div className="grid gap-4 text-sm">
                                        <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                            <span className="text-white/60">Données de relation client</span>
                                            <span className="text-white/80 font-medium text-right">Durée de la relation + [X] ans</span>
                                        </div>
                                        <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                            <span className="text-white/60">Données de facturation/comptabilité</span>
                                            <span className="text-white/80 font-medium text-right">10 ans (obligation légale)</span>
                                        </div>
                                        <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                            <span className="text-white/60">Logs techniques/sécurité</span>
                                            <span className="text-white/80 font-medium text-right">[6 à 12 mois]</span>
                                        </div>
                                        <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                            <span className="text-white/60">Contenus (photos/vidéos)</span>
                                            <span className="text-white/80 font-medium text-right">Durée d'accès au Service + [X] mois</span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="text-white/60">Données on-chain</span>
                                            <span className="text-amber-400/80 font-medium text-right">Durée non maîtrisable</span>
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            {/* Article 11 */}
                            <Section id="article-11" title="Article 11 – Sécurité">
                                <p>Le Responsable met en œuvre des mesures techniques et organisationnelles adaptées, incluant notamment :</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>Contrôle des accès, habilitations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>Chiffrement des communications (TLS/HTTPS)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>Sécurisation des environnements, sauvegardes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>Pseudonymisation/hachage SHA-256 lorsque pertinent</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                                        <span>Procédures de gestion d'incidents</span>
                                    </li>
                                </ul>
                                <WarningBox>
                                    <p><strong>Responsabilité de l'Utilisateur :</strong> L'Utilisateur est responsable de la sécurité de son Wallet et de ses clés privées. Le Responsable ne demande jamais les clés privées.</p>
                                </WarningBox>
                            </Section>

                            {/* Article 12 */}
                            <Section id="article-12" title="Article 12 – Droits des Utilisateurs">
                                <p>Conformément au RGPD, l'Utilisateur dispose des droits suivants :</p>
                                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        { title: "Accès", desc: "Obtenir une copie de vos données" },
                                        { title: "Rectification", desc: "Corriger des données inexactes" },
                                        { title: "Effacement", desc: "Demander la suppression" },
                                        { title: "Limitation", desc: "Restreindre le traitement" },
                                        { title: "Opposition", desc: "S'opposer au traitement" },
                                        { title: "Portabilité", desc: "Récupérer vos données" },
                                        { title: "Retrait du consentement", desc: "À tout moment" },
                                        { title: "Directives post-mortem", desc: "Droit français" },
                                    ].map((right, index) => (
                                        <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                            <h4 className="text-violet-400 font-semibold text-sm">{right.title}</h4>
                                            <p className="text-white/50 text-xs mt-1">{right.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4">Pour exercer ses droits : <span className="text-violet-400">[email RGPD]</span>, en précisant l'objet de la demande et en justifiant de son identité.</p>

                                <Subsection title="Limite spécifique : blockchain">
                                    <InfoBox>
                                        Le Responsable peut agir sur les données off-chain qu'il contrôle (hébergement Web2, base interne), mais <strong>ne peut pas supprimer/modifier</strong> une transaction ou un identifiant déjà inscrit sur une blockchain publique. Il pourra toutefois supprimer les données associées off-chain et rompre les liens d'association sous son contrôle.
                                    </InfoBox>
                                </Subsection>
                            </Section>

                            {/* Article 13 */}
                            <Section id="article-13" title="Article 13 – Réclamation (CNIL)">
                                <p>L'Utilisateur peut introduire une réclamation auprès de la CNIL s'il estime que ses droits ne sont pas respectés.</p>
                                <div className="mt-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                                    <p className="text-white/70 text-sm">
                                        <strong>Commission Nationale de l'Informatique et des Libertés</strong>
                                        <br />
                                        <span className="text-white/50">Site web : www.cnil.fr</span>
                                    </p>
                                </div>
                            </Section>

                            {/* Article 14 */}
                            <Section id="article-14" title="Article 14 – Cookies / Traceurs (si applicable)">
                                <p>La plateforme peut utiliser des cookies/traceurs. Lorsque requis, le consentement est recueilli via un bandeau de gestion des cookies.</p>
                                <div className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                    <p className="text-violet-200/80 text-sm">
                                        <strong>Politique cookies :</strong> La politique cookies est accessible à l'adresse : [lien]
                                    </p>
                                </div>
                            </Section>

                            {/* Article 15 */}
                            <Section id="article-15" title="Article 15 – Mise à Jour">
                                <p>La présente Politique peut évoluer. La version applicable est celle publiée à la date de consultation, et/ou celle acceptée lors du mint si elle est intégrée aux CGV.</p>
                                <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20">
                                    <p className="text-lg text-white/80 leading-relaxed">
                                        En utilisant la Plateforme, l'Utilisateur reconnaît avoir pris connaissance de la présente Politique de confidentialité.
                                    </p>
                                </div>
                            </Section>

                        </div>

                        {/* Footer CTA */}
                        <div className="mt-20 p-8 rounded-3xl gradient-violet">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Une question sur vos données ?</h3>
                                    <p className="text-white/70">Contactez notre équipe RGPD</p>
                                </div>
                                <a
                                    href="mailto:rgpd@eternamid.com"
                                    className="px-6 py-3 bg-white text-violet-600 rounded-full font-semibold hover:bg-black hover:text-white transition-all"
                                >
                                    Nous contacter
                                </a>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}