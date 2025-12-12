// EternamID - Conditions Générales de Vente
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

// Table of Contents Data
const tocItems = [
	{ id: "article-1", title: "Article 1", subtitle: "Identification du vendeur" },
	{ id: "article-2", title: "Article 2", subtitle: "Objet" },
	{ id: "article-3", title: "Article 3", subtitle: "Définitions" },
	{ id: "article-4", title: "Article 4", subtitle: "Champ d'application" },
	{ id: "article-5", title: "Article 5", subtitle: "Description du NFT" },
	{ id: "article-6", title: "Article 6", subtitle: "Prix" },
	{ id: "article-7", title: "Article 7", subtitle: "Processus de mint" },
	{ id: "article-8", title: "Article 8", subtitle: "Fourniture immédiate" },
	{ id: "article-9", title: "Article 9", subtitle: "Droit de rétractation" },
	{ id: "article-10", title: "Article 10", subtitle: "Absence de remboursement" },
	{ id: "article-11", title: "Article 11", subtitle: "Disponibilité du service" },
	{ id: "article-12", title: "Article 12", subtitle: "Obligations du client" },
	{ id: "article-13", title: "Article 13", subtitle: "Responsabilité" },
	{ id: "article-14", title: "Article 14", subtitle: "Propriété intellectuelle" },
	{ id: "article-15", title: "Article 15", subtitle: "Données personnelles" },
	{ id: "article-16", title: "Article 16", subtitle: "Transmission du NFT" },
	{ id: "article-17", title: "Article 17", subtitle: "Preuve & archivage" },
	{ id: "article-18", title: "Article 18", subtitle: "Modification des CGV" },
	{ id: "article-19", title: "Article 19", subtitle: "Nullité partielle" },
	{ id: "article-20", title: "Article 20", subtitle: "Droit applicable" },
	{ id: "article-21", title: "Article 21", subtitle: "Acceptation" },
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

// Main CGV Page Component
export default function CGVPage() {
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
        
        .gradient-cyan {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
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
          background: rgba(6, 182, 212, 0.1);
          border-left-color: #06b6d4;
        }
        
        .toc-item.active .toc-title {
          color: #06b6d4;
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
									<span className={`toc-title text-sm font-medium ${activeSection === item.id ? 'text-cyan-400' : 'text-white/70'}`}>
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
											<span className={`toc-title text-sm font-medium ${activeSection === item.id ? 'text-cyan-400' : 'text-white/70'}`}>
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
								<div className="inline-block px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-cyan-400">
									Document juridique
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
								<span className="text-gradient">Conditions Générales</span>
								<br />
								<span className="font-serif italic text-white/90">de Vente</span>
							</h1>
							<p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-4">
								Relatives au mint de NFT – Plateforme EternamID
							</p>
							<div className="flex items-center gap-4 text-sm text-white/40">
								<span>Version du [DATE]</span>
								<span className="w-1 h-1 rounded-full bg-white/20" />
								<span>Dernière mise à jour</span>
							</div>
						</header>

						{/* Content */}
						<div className="prose prose-invert max-w-none">

							{/* Article 1 */}
							<Section id="article-1" title="Article 1 – Identification du vendeur">
								<p>Les présentes Conditions Générales de Vente (ci-après les « CGV ») sont proposées par :</p>
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
											<span className="text-white/40">Capital</span>
											<span className="text-white/80 font-medium">[●] € (le cas échéant)</span>
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
											<span className="text-white/40">Contact</span>
											<span className="text-white/80 font-medium">[●]</span>
										</div>
									</div>
								</div>
								<p className="text-sm text-white/50">Ci-après le « Vendeur » et/ou la « Plateforme ».</p>
							</Section>

							{/* Article 2 */}
							<Section id="article-2" title="Article 2 – Objet">
								<p>Les CGV ont pour objet de définir les conditions dans lesquelles le Vendeur propose au Client :</p>
								<div className="my-6 space-y-3">
									<div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
										<span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-cyan text-white text-sm font-bold">1</span>
										<p className="text-white/70 pt-1">Le mint (émission) de jetons non fongibles (« NFT ») sur une blockchain déterminée</p>
									</div>
									<div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
										<span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-cyan text-white text-sm font-bold">2</span>
										<p className="text-white/70 pt-1">L'accès à un service numérique (espace, capsule, fonctionnalités, contenus, avantages digitaux) décrit sur la page de mint</p>
									</div>
									<div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
										<span className="w-8 h-8 flex items-center justify-center rounded-lg gradient-cyan text-white text-sm font-bold">3</span>
										<p className="text-white/70 pt-1">Les droits et obligations des parties</p>
									</div>
								</div>
								<p>Les CGV régissent exclusivement les opérations de mint réalisées via la Plateforme.</p>
							</Section>

							{/* Article 3 */}
							<Section id="article-3" title="Article 3 – Définitions">
								<div className="space-y-4">
									<div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-500/50">
										<h4 className="text-cyan-400 font-semibold mb-1">NFT</h4>
										<p className="text-sm text-white/60">Jeton numérique non fongible émis sur une blockchain, identifié par un identifiant unique (token ID), associé à des métadonnées.</p>
									</div>
									<div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-500/50">
										<h4 className="text-cyan-400 font-semibold mb-1">Mint</h4>
										<p className="text-sm text-white/60">Opération technique consistant à créer et inscrire un NFT sur la blockchain via un smart contract.</p>
									</div>
									<div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-500/50">
										<h4 className="text-cyan-400 font-semibold mb-1">Client</h4>
										<p className="text-sm text-white/60">Personne physique majeure agissant en qualité de consommateur (au sens du droit applicable).</p>
									</div>
									<div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-500/50">
										<h4 className="text-cyan-400 font-semibold mb-1">Service Numérique</h4>
										<p className="text-sm text-white/60">Fonctionnalités, interface, espace, contenus, accès ou avantages activés par la détention du NFT.</p>
									</div>
									<div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-500/50">
										<h4 className="text-cyan-400 font-semibold mb-1">Wallet</h4>
										<p className="text-sm text-white/60">Portefeuille numérique (logiciel/extension/appareil) permettant de détenir et gérer des crypto-actifs et NFT.</p>
									</div>
									<div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-500/50">
										<h4 className="text-cyan-400 font-semibold mb-1">Blockchain</h4>
										<p className="text-sm text-white/60">Registre distribué et décentralisé permettant l'émission et la traçabilité des transactions.</p>
									</div>
								</div>
							</Section>

							{/* Article 4 */}
							<Section id="article-4" title="Article 4 – Champ d'application – Acceptation">
								<Subsection title="4.1 Application">
									<p>Les CGV s'appliquent à toute opération de mint sur la Plateforme.</p>
								</Subsection>
								<Subsection title="4.2 Prévalence">
									<p>Elles prévalent sur tout autre document, sauf conditions particulières acceptées par écrit.</p>
								</Subsection>
								<Subsection title="4.3 Déclarations du Client">
									<p>Le Client déclare :</p>
									<ul className="mt-3 space-y-2">
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>être majeur et avoir la capacité juridique de contracter</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>disposer d'un Wallet compatible et en maîtriser l'usage</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>accepter le fonctionnement irréversible des transactions blockchain</span>
										</li>
									</ul>
								</Subsection>
							</Section>

							{/* Article 5 */}
							<Section id="article-5" title="Article 5 – Description du NFT et du service associé">
								<Subsection title="5.1 Nature et portée">
									<p>Le NFT proposé :</p>
									<ul className="mt-3 space-y-2">
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>est émis sur la blockchain [Ethereum / Polygon / autre : ●] via le smart contract [adresse : ●] (si connu/figeable)</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>constitue un droit d'accès numérique au Service décrit sur la page de mint [URL/slug]</span>
										</li>
									</ul>

									<WarningBox>
										<p className="font-semibold mb-2">Le NFT ne constitue pas :</p>
										<ul className="space-y-1 text-amber-200/60">
											<li>• un instrument financier, produit d'investissement, titre, ni promesse de rendement</li>
											<li>• une garantie de valeur, de liquidité, ou de revente</li>
											<li>• une cession automatique de droits de propriété intellectuelle</li>
										</ul>
									</WarningBox>
								</Subsection>

								<Subsection title="5.2 Édition unique / multiple">
									<p>Le NFT peut être émis en exemplaire unique ou en édition multiple (supply totale annoncée avant mint : [●]).</p>
									<p className="mt-2">Chaque NFT dispose d'un identifiant distinct. Sauf mention contraire, les droits d'accès sont identiques.</p>
								</Subsection>

								<Subsection title="5.3 Service Numérique – conditions d'accès">
									<p>L'accès au Service Numérique est conditionné :</p>
									<ul className="mt-3 space-y-2">
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>à la détention du NFT dans le Wallet du Client</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>au respect des CGV et des règles d'usage du Service</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>à la disponibilité technique raisonnable du Service (voir art. 11)</span>
										</li>
									</ul>
									<p className="mt-4">Le Vendeur peut mettre en place un mécanisme de vérification ("token-gating") pour contrôler la détention du NFT.</p>
								</Subsection>

								<Subsection title="5.4 Contenus &quot;on-chain&quot; / &quot;off-chain&quot;">
									<InfoBox>
										Le Client est informé que certaines données peuvent être inscrites sur la blockchain (publiques et difficilement supprimables), tandis que d'autres contenus peuvent être hébergés hors chaîne (serveurs/stockage tiers), ce qui peut impacter leur disponibilité.
									</InfoBox>
								</Subsection>
							</Section>

							{/* Article 6 */}
							<Section id="article-6" title="Article 6 – Prix">
								<Subsection title="6.1 Prix du mint">
									<p>Le prix est indiqué avant validation :</p>
									<ul className="mt-3 space-y-2">
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>en euros TTC et/ou en crypto-actifs [préciser]</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>hors frais de transaction blockchain ("gas fees"), à la charge du Client, variables et indépendants du Vendeur</span>
										</li>
									</ul>
								</Subsection>
								<Subsection title="6.2 Modification des prix">
									<p>Le Vendeur peut modifier ses prix à tout moment. Le prix applicable est celui affiché au moment de la validation du mint.</p>
								</Subsection>
							</Section>

							{/* Article 7 */}
							<Section id="article-7" title="Article 7 – Processus de mint – Conclusion du contrat">
								<p>Le mint s'effectue selon les étapes suivantes :</p>
								<div className="my-6 relative">
									<div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />
									<div className="space-y-4">
										{[
											"Consultation de la page de présentation du NFT",
											"Affichage des informations essentielles (prix, supply, droits, exclusions, rétractation)",
											"Acceptation expresse des CGV",
											"Connexion du Wallet",
											"Validation de la transaction (et, le cas échéant, paiement)",
											"Émission et attribution du NFT au Wallet du Client",
											"Accès au Service Numérique"
										].map((step, index) => (
											<div key={index} className="flex items-start gap-4 pl-1">
												<div className="w-7 h-7 rounded-full gradient-cyan flex items-center justify-center text-xs font-bold text-white flex-shrink-0 relative z-10">
													{index + 1}
												</div>
												<p className="text-white/70 pt-1">{step}</p>
											</div>
										))}
									</div>
								</div>
								<InfoBox>
									La confirmation on-chain (transaction validée) vaut conclusion définitive du contrat.
								</InfoBox>
							</Section>

							{/* Article 8 */}
							<Section id="article-8" title="Article 8 – Fourniture immédiate du contenu numérique">
								<p>Le Service Numérique est fourni immédiatement après le mint, sous réserve des délais/confirmations de la blockchain et des contraintes techniques.</p>
							</Section>

							{/* Article 9 */}
							<Section id="article-9" title="Article 9 – Droit de rétractation">
								<Subsection title="9.1 Principe">
									<p>Le droit de rétractation peut s'appliquer aux contrats conclus à distance selon la réglementation applicable.</p>
								</Subsection>
								<Subsection title="9.2 Exclusion (contenu numérique sans support matériel)">
									<WarningBox>
										<p>Le Client est informé que le droit de rétractation <strong>ne s'applique pas</strong> lorsque :</p>
										<ul className="mt-2 space-y-1 text-amber-200/60">
											<li>• l'exécution a commencé immédiatement après la conclusion du contrat</li>
											<li>• le Client a donné son accord exprès</li>
											<li>• et a reconnu perdre son droit de rétractation</li>
										</ul>
									</WarningBox>
								</Subsection>
								<Subsection title="9.3 Consentement exprès">
									<p>Avant le mint, le Client demande l'exécution immédiate et reconnaît renoncer à son droit de rétractation.</p>
									<div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
										<p className="text-rose-200/80 text-sm">
											<strong>➡️ Aucun remboursement ne pourra être exigé après mint</strong> (voir art. 10), sauf obligation légale impérative.
										</p>
									</div>
								</Subsection>
							</Section>

							{/* Article 10 */}
							<Section id="article-10" title="Article 10 – Absence de remboursement / Irréversibilité">
								<p>Le Client reconnaît que :</p>
								<ul className="mt-4 space-y-2">
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
										<span>les transactions blockchain sont irréversibles</span>
									</li>
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
										<span>le NFT peut être transféré/échangé sans intervention du Vendeur</span>
									</li>
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
										<span>en conséquence, aucune annulation ni remboursement ne pourra être effectué après validation, sauf obligation légale impérative ou faute prouvée du Vendeur</span>
									</li>
								</ul>
							</Section>

							{/* Article 11 */}
							<Section id="article-11" title="Article 11 – Disponibilité, maintenance, évolutions du service">
								<Subsection title="11.1">
									<p>Le Vendeur met en œuvre des moyens raisonnables pour assurer l'accès au Service.</p>
								</Subsection>
								<Subsection title="11.2">
									<p>Des interruptions temporaires peuvent survenir (maintenance, incidents, mises à jour, dépendances tierces).</p>
								</Subsection>
								<Subsection title="11.3">
									<p>Le Vendeur peut faire évoluer le Service (améliorations, correctifs, sécurité). En cas de modification substantielle, le Vendeur informera le Client par tout moyen utile [modalité].</p>
								</Subsection>
							</Section>

							{/* Article 12 */}
							<Section id="article-12" title="Article 12 – Obligations du client – Usages interdits">
								<p>Le Client s'engage à :</p>
								<ul className="mt-4 space-y-2">
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
										<span>conserver la sécurité de ses identifiants et clés privées</span>
									</li>
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
										<span>ne pas utiliser le Service à des fins illicites, frauduleuses, diffamatoires, ou portant atteinte aux droits de tiers</span>
									</li>
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
										<span>ne pas tenter de contourner les mécanismes de contrôle d'accès (token-gating), ni d'attaquer la Plateforme</span>
									</li>
								</ul>
								<WarningBox>
									En cas de violation grave, le Vendeur pourra suspendre l'accès au Service, sans préjudice d'éventuelles actions.
								</WarningBox>
							</Section>

							{/* Article 13 */}
							<Section id="article-13" title="Article 13 – Responsabilité">
								<Subsection title="13.1 Éléments hors contrôle">
									<p>Le Vendeur n'est pas responsable notamment :</p>
									<ul className="mt-3 space-y-2">
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
											<span>des dysfonctionnements, congestions, forks, ou évolutions de la blockchain</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
											<span>des pertes de clés privées, erreurs d'adresse, erreurs de Wallet, phishing, malwares</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
											<span>des frais de gas</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
											<span>des marketplaces ou services tiers (OpenSea, etc.) et de leurs conditions</span>
										</li>
									</ul>
								</Subsection>
								<Subsection title="13.2 Absence de garantie de valeur">
									<p>Le Vendeur ne garantit ni la valeur, ni la liquidité, ni la possibilité de revente du NFT.</p>
								</Subsection>
								<Subsection title="13.3 Limitation">
									<p>Dans les limites autorisées par la loi, la responsabilité du Vendeur est limitée au montant payé pour le mint concerné (hors gas fees) et exclut les dommages indirects (perte de chance, perte de profit, etc.).</p>
								</Subsection>
							</Section>

							{/* Article 14 */}
							<Section id="article-14" title="Article 14 – Propriété intellectuelle">
								<Subsection title="14.1">
									<p>Le mint n'emporte aucune cession automatique de droits de propriété intellectuelle.</p>
								</Subsection>
								<Subsection title="14.2">
									<p>Sauf mention contraire, le Client bénéficie uniquement d'un droit :</p>
									<ul className="mt-3 space-y-2">
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>personnel, non exclusif, non transférable (hors revente du NFT)</span>
										</li>
										<li className="flex items-start gap-2">
											<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
											<span>et non commercial</span>
										</li>
									</ul>
									<p className="mt-4">sur les contenus accessibles via le Service. Toute exploitation commerciale nécessite une autorisation écrite du Vendeur ou des ayants droit.</p>
								</Subsection>
							</Section>

							{/* Article 15 */}
							<Section id="article-15" title="Article 15 – Données personnelles">
								<p>Les données personnelles sont traitées conformément au RGPD et à la politique de confidentialité accessible sur la Plateforme : [lien].</p>
								<InfoBox>
									Le Client est informé que certaines données/transactions peuvent être publiques sur la blockchain, ce qui limite techniquement leur suppression.
								</InfoBox>
							</Section>

							{/* Article 16 */}
							<Section id="article-16" title="Article 16 – Transmission / Revente du NFT">
								<Subsection title="16.1">
									<p>La revente/transmission du NFT peut être possible si techniquement permise par le smart contract et/ou la blockchain.</p>
								</Subsection>
								<Subsection title="16.2">
									<p>En cas de transfert du NFT hors du Wallet du Client, le Client peut perdre l'accès au Service.</p>
								</Subsection>
								<Subsection title="16.3">
									<p>Le Vendeur n'assure aucune garantie sur les marchés secondaires (prix, fraude, liquidité).</p>
								</Subsection>
								<Subsection title="16.4 (Option royalties)">
									<p>Le smart contract peut prévoir des royalties sur revente : [●% / modalités].</p>
								</Subsection>
							</Section>

							{/* Article 17 */}
							<Section id="article-17" title="Article 17 – Preuve – Archivage">
								<p>Les enregistrements informatiques de la Plateforme et les données publiques de la blockchain feront foi, sauf preuve contraire, des transactions et échanges intervenus.</p>
							</Section>

							{/* Article 18 */}
							<Section id="article-18" title="Article 18 – Modification des CGV">
								<p>Le Vendeur peut modifier les CGV. Les CGV applicables sont celles acceptées au moment du mint.</p>
								<p className="mt-4">Pour l'accès au Service (dans la durée), les nouvelles versions pourront s'appliquer si elles sont nécessaires pour des raisons légales/sécurité/évolution et portées à la connaissance du Client.</p>
							</Section>

							{/* Article 19 */}
							<Section id="article-19" title="Article 19 – Nullité partielle">
								<p>Si une clause est déclarée nulle, les autres dispositions demeurent applicables.</p>
							</Section>

							{/* Article 20 */}
							<Section id="article-20" title="Article 20 – Droit applicable – Règlement des litiges">
								<p>Les CGV sont soumises au droit français.</p>
								<p className="mt-4">En cas de litige :</p>
								<ul className="mt-3 space-y-2">
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
										<span>tentative de règlement amiable (contact : [email litiges])</span>
									</li>
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
										<span>[si applicable] médiation de la consommation : [nom + coordonnées du médiateur]</span>
									</li>
									<li className="flex items-start gap-2">
										<ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
										<span>à défaut, tribunaux compétents [préciser]</span>
									</li>
								</ul>
							</Section>

							{/* Article 21 */}
							<Section id="article-21" title="Article 21 – Acceptation">
								<div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
									<p className="text-lg text-white/80 leading-relaxed">
										Le Client reconnaît avoir lu, compris et accepté sans réserve les présentes Conditions Générales de Vente avant tout mint.
									</p>
								</div>
							</Section>

						</div>

						{/* Footer CTA */}
						<div className="mt-20 p-8 rounded-3xl gradient-cyan">
							<div className="flex flex-col md:flex-row items-center justify-between gap-6">
								<div>
									<h3 className="text-2xl font-bold text-white mb-2">Des questions ?</h3>
									<p className="text-white/70">Notre équipe est là pour vous accompagner</p>
								</div>
								<a
									href="mailto:contact@eternamid.com"
									className="px-6 py-3 bg-white text-cyan-600 rounded-full font-semibold hover:bg-black hover:text-white transition-all"
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