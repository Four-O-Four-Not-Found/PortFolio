import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Code, Database, Layout, ChevronLeft, ArrowUp } from "lucide-react";

interface Project {
	id: string;
	title: string;
	description: string;
	longDescription: string;
	techStack: string[];
	team: string[];
	contributions: Record<string, string>;
	links: {
		live: string;
		github: string;
	};
	image: string;
	gallery?: {
		url: string;
		label: string;
		category: string;
	}[];
	features?: Record<string, string[]>;
}

interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'gallery'>('overview');
	const contentRef = useRef<HTMLDivElement>(null);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
		setShowScrollTop(target.scrollTop > 300);
	};

	const scrollToTop = () => {
		if (contentRef.current) {
			contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	if (!project) return null;

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<div
						className="modal-wrapper"
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 5000,
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "center",
							overflow: "hidden", 
							paddingTop: "0", 
							paddingBottom: "0",
						}}
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={onClose}
							style={{
								position: "absolute",
								inset: 0,
								background: "rgba(0, 0, 0, 0.9)",
								backdropFilter: "blur(10px)",
							}}
						/>

						<motion.div
							ref={contentRef}
							onScroll={handleScroll}
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							className="glass-card modal-content"
							data-lenis-prevent
							style={{
								width: "100%",
								maxWidth: "100%", 
								height: "100vh", // Full viewport height
								maxHeight: "100vh",
								overflowY: "auto",
								overflowX: "hidden",
								position: "relative",
								padding: "0",
								borderRadius: "0px", 
								border: "none", // Remove border for full screen
								background: "var(--bg-color)",
								scrollbarWidth: "none",
								msOverflowStyle: "none",
								WebkitOverflowScrolling: "touch"
							}}
						>
							{/* 1. Modal Header (Synced with Main Navbar Style) */}
							<div style={{ 
								position: "sticky", 
								top: 0, 
								zIndex: 200, 
								background: "rgba(10, 10, 10, 0.8)", 
								backdropFilter: "blur(20px)",
								padding: "12px 20px", // More compact
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
							}}>
								<div style={{ 
									fontSize: "1rem", 
									fontWeight: "900", 
									color: "var(--accent-primary)",
									letterSpacing: "-0.5px"
								}}>
									404: <span style={{ color: "white" }}>Not Found</span>
								</div>
								<button
									onClick={onClose}
									style={{
										background: "rgba(0, 132, 255, 0.15)",
										border: "1px solid var(--accent-primary)",
										color: "var(--accent-primary)",
										padding: "10px 16px",
										borderRadius: "12px",
										display: "flex",
										alignItems: "center",
										gap: "8px",
										cursor: "pointer",
										fontSize: "13px",
										fontWeight: "700",
										backdropFilter: "blur(10px)",
										boxShadow: "0 0 15px rgba(0, 132, 255, 0.3)"
									}}
								>
									<ChevronLeft size={18} /> CLOSE
								</button>
							</div>

							<div style={{ padding: "clamp(30px, 8vw, 80px) clamp(20px, 5vw, 40px)" }}>
								{/* 2 & 3. Project Hero (Title & Image Frame) */}
								<div style={{ marginBottom: "60px" }}>
									<h2
										style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginBottom: "30px", fontWeight: "900" }}
										className="neon-text"
									>
										{project.title}
									</h2>
									<div
										style={{
											width: "100%",
											aspectRatio: "16/9",
											borderRadius: "16px",
											overflow: "hidden",
											border: "1px solid rgba(0, 132, 255, 0.2)",
											boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
										}}
									>
										<img
											src={project.image}
											alt={project.title}
											style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }}
											onClick={() => setSelectedImage(project.image)}
										/>
									</div>
								</div>
								
								{/* Tab Navigation */}
								<div style={{ 
									display: "flex", 
									gap: "16px", 
									marginBottom: "48px",
									borderBottom: "1px solid rgba(0, 132, 255, 0.2)",
									paddingBottom: "16px",
									overflowX: "auto",
									scrollbarWidth: "none",
									msOverflowStyle: "none"
								}}>
									{['overview', 'features', 'gallery'].map((tab) => {
										// Only show gallery tab if gallery exists
										if (tab === 'gallery' && (!project.gallery || project.gallery.length === 0)) return null;
										// Only show features tab if features exist
										if (tab === 'features' && (!project.features || Object.keys(project.features).length <= 1)) return null;

										return (
											<button
												key={tab}
												onClick={() => setActiveTab(tab as any)}
												style={{
													background: activeTab === tab ? "rgba(0, 132, 255, 0.15)" : "transparent",
													color: activeTab === tab ? "var(--accent-primary)" : "var(--text-secondary)",
													border: "1px solid",
													borderColor: activeTab === tab ? "var(--accent-primary)" : "transparent",
													padding: "10px 24px",
													borderRadius: "8px",
													fontSize: "0.95rem",
													fontWeight: activeTab === tab ? "700" : "500",
													textTransform: "uppercase",
													letterSpacing: "1px",
													cursor: "pointer",
													transition: "all 0.3s ease",
													whiteSpace: "nowrap"
												}}
												onMouseEnter={(e) => {
													if (activeTab !== tab) e.currentTarget.style.color = "white";
												}}
												onMouseLeave={(e) => {
													if (activeTab !== tab) e.currentTarget.style.color = "var(--text-secondary)";
												}}
											>
												{tab}
											</button>
										);
									})}
								</div>
								
								{/* Tab Content: Overview */}
								{activeTab === 'overview' && (
								<div
									className="modal-grid"
									style={{
										display: "grid",
										gridTemplateColumns: "1.8fr 1fr",
										gap: "60px",
									}}
								>
									{/* Main Content Column */}
									<div>
										<div style={{ marginBottom: "48px" }}>
											<h3 style={{ fontSize: "1.2rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>
												Overview
											</h3>
											<p
												style={{
													color: "var(--text-primary)",
													lineHeight: "1.8",
													fontSize: "1rem",
													opacity: 0.85,
												}}
											>
												{project.longDescription}
											</p>
										</div>
										
										{/* Primary Features Moved to Sidebar or Gallery */}
									</div>

									{/* Sidebar Column */}
									<div>
										{/* Tech Stack */}
										<div style={{ marginBottom: "40px" }}>
											<h3 style={{ fontSize: "1rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>
												Tech Stack
											</h3>
											<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
												{project.techStack.map((tech) => (
													<span
														key={tech}
														style={{
															fontSize: "10px",
															background: "rgba(0, 132, 255, 0.05)",
															border: "1px solid rgba(0, 132, 255, 0.2)",
															padding: "6px 12px",
															borderRadius: "6px",
															color: "var(--accent-primary)",
															fontWeight: "600"
														}}
													>
														{tech}
													</span>
												))}
											</div>
										</div>

										{/* Project Highlights (Sidebar Location) */}
										<div style={{ marginBottom: "40px" }}>
											<h3 style={{ fontSize: "1rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>
												Project Key Highlights
											</h3>
											<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
												{Object.values(project.features)[0].map((highlight: string, i: number) => (
													<li key={i} style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
														<div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-primary)", marginTop: "6px", flexShrink: 0 }} />
														{highlight}
													</li>
												))}
											</ul>
										</div>

										{/* Team Contributions */}
										{project.contributions && (
											<div
												className="glass-card"
												style={{ padding: "30px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
											>
												<h3 style={{ fontSize: "1rem", color: "white", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" }}>
													Team Contributions
												</h3>
												<ul
													style={{
														listStyle: "none",
														display: "flex",
														flexDirection: "column",
														gap: "20px",
													}}
												>
													{Object.entries(project.contributions).map(([name, role]: [string, any], idx) => (
														<li key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
															<div style={{ marginTop: "4px", color: "var(--accent-primary)" }}>
																<Layout size={18} />
															</div>
															<div>
																<p style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--text-primary)" }}>
																	{name}
																</p>
																<p
																	style={{
																		fontSize: "0.85rem",
																		color: "var(--accent-primary)",
																		opacity: 0.9,
																		marginTop: "2px"
																	}}
																>
																	{role}
																</p>
															</div>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
								)}

								{/* Tab Content: Features */}
								{activeTab === 'features' && project.features && (
									<div style={{ marginTop: "20px" }}>
										<h3 style={{ fontSize: "1.5rem", marginBottom: "32px" }}>
											System Modules & <span className="neon-text">Features</span>
										</h3>
										<div style={{ 
											display: "grid", 
											gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
											gap: "32px" 
										}}>
											{Object.entries(project.features).slice(1).map(([category, features]) => (
												<div key={category} className="glass-card" style={{ padding: "24px" }}>
													<h4 style={{ 
														fontSize: "1rem", 
														color: "var(--accent-primary)", 
														marginBottom: "16px",
														borderBottom: "1px solid rgba(0, 132, 255, 0.2)",
														paddingBottom: "8px"
													}}>
														{category}
													</h4>
													<ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
														{features.map((feature, i) => (
															<li key={i} style={{ 
																fontSize: "0.9rem", 
																display: "flex", 
																gap: "8px", 
																alignItems: "flex-start",
																color: "var(--text-secondary)"
															}}>
																<div style={{ 
																	width: "6px", 
																	height: "6px", 
																	borderRadius: "50%", 
																	background: "var(--accent-primary)", 
																	marginTop: "6px",
																	flexShrink: 0
																}} />
																{feature}
															</li>
														))}
													</ul>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Tab Content: Gallery */}
								{activeTab === 'gallery' && project.gallery && project.gallery.length > 0 && (
									<div style={{ marginTop: "20px" }}>
										<h3 style={{ fontSize: "1.5rem", marginBottom: "32px" }}>
											Gallery & <span className="neon-text">Walkthrough</span>
										</h3>

										{/* Group images by category */}
										{Array.from(new Set(project.gallery.map(item => item.category))).map(category => (
											<div key={category} style={{ marginBottom: "48px" }}>
												<h4 style={{ 
													fontSize: "1rem", 
													textTransform: "uppercase", 
													letterSpacing: "0.1em",
													color: "var(--accent-primary)",
													marginBottom: "20px",
													display: "flex",
													alignItems: "center",
													gap: "12px"
												}}>
													<div style={{ height: "1px", flex: 1, background: "rgba(0, 132, 255, 0.2)" }} />
													{category}
													<div style={{ height: "1px", flex: 1, background: "rgba(0, 132, 255, 0.2)" }} />
												</h4>
												
												<div
													style={{
														display: "grid",
														gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
														gap: "24px",
													}}
												>
													{project.gallery?.filter(item => item.category === category).map((item) => (
														<motion.div
															key={item.url}
															whileHover={{ scale: 1.02 }}
															className="glass-card"
															style={{
																overflow: "hidden",
																borderRadius: "12px",
																cursor: "pointer",
																border: "1px solid var(--card-border)",
																background: "rgba(255, 255, 255, 0.02)",
															}}
														>
															<img
																src={item.url}
																alt={item.label}
																style={{
																	width: "100%",
																	height: "180px",
																	objectFit: "cover",
																	display: "block",
																}}
																onClick={() => setSelectedImage(item.url)}
															/>
															<div
																style={{
																	padding: "16px",
																	fontSize: "0.85rem",
																	color: "#ffffff",
																	fontWeight: "500",
																	textAlign: "center",
																	background: "rgba(0,0,0,0.5)",
																}}
															>
																{item.label}
															</div>
														</motion.div>
													))}
												</div>
											</div>
										))}
									</div>
								)}

								{/* Final Call to Action */}
								<div style={{ 
									marginTop: "80px", 
									marginBottom: "40px",
									padding: "40px", 
									textAlign: "center",
									background: "linear-gradient(180deg, rgba(0, 132, 255, 0.05) 0%, transparent 100%)",
									borderTop: "1px solid rgba(0, 132, 255, 0.2)",
									borderRadius: "24px"
								}}>
									<h3 style={{ fontSize: "2rem", marginBottom: "16px", fontWeight: "800" }}>
										Ready to build something <span className="neon-text">similar?</span>
									</h3>
									<p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "1.1rem" }}>
										Let's discuss how we can bring your vision to life.
									</p>
									<button
										onClick={() => {
											onClose();
											setTimeout(() => {
												document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
											}, 300);
										}}
										style={{
											background: "var(--accent-primary)",
											color: "white",
											border: "none",
											padding: "16px 32px",
											borderRadius: "8px",
											fontSize: "1rem",
											fontWeight: "700",
											letterSpacing: "1px",
											textTransform: "uppercase",
											cursor: "pointer",
											boxShadow: "0 0 20px rgba(0, 132, 255, 0.4)",
											transition: "all 0.3s ease"
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = "translateY(-2px)";
											e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 132, 255, 0.6)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = "translateY(0)";
											e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 132, 255, 0.4)";
										}}
									>
										Start a Project
									</button>
								</div>
							</div>
						</motion.div>

						{/* Floating Scroll to Top (Mobile Only) - Moved Outside Scrollable Content */}
						<AnimatePresence>
							{showScrollTop && (
								<motion.button
									initial={{ opacity: 0, scale: 0.5, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.5, y: 20 }}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={scrollToTop}
									style={{
										position: "fixed",
										bottom: "30px",
										right: "30px",
										width: "45px",
										height: "45px",
										borderRadius: "12px",
										background: "rgba(0, 132, 255, 0.15)",
										backdropFilter: "blur(10px)",
										color: "var(--accent-primary)",
										border: "1px solid var(--accent-primary)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										zIndex: 9999, // Max priority
										boxShadow: "0 0 20px rgba(0, 132, 255, 0.4)",
										cursor: "pointer",
										transition: "all 0.3s ease"
									}}
								>
									<ArrowUp size={20} />
								</motion.button>
							)}
						</AnimatePresence>
					</div>
				)}
			</AnimatePresence>

			{/* Lightbox Overlay */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedImage(null)}
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 6000,
							background: "rgba(0, 0, 0, 0.95)",
							backdropFilter: "blur(15px)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "40px",
							cursor: "zoom-out",
						}}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							style={{
								position: "relative",
								maxWidth: "100%",
								maxHeight: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "20px"
							}}
						>
							<img
								src={selectedImage}
								alt="Zoomed view"
								style={{
									maxWidth: "95vw",
									maxHeight: "80vh",
									borderRadius: "16px",
									border: "1px solid var(--accent-primary)",
									boxShadow: "0 0 50px rgba(0, 132, 255, 0.3)",
									objectFit: "contain"
								}}
							/>
							
							{(() => {
								const isHero = selectedImage === project.image;
								const match = project.gallery?.find(g => g.url === selectedImage);
								const label = match ? match.label : (isHero ? project.title + " - Overview" : "");
								
								return label ? (
									<div style={{
										color: "white",
										fontSize: "1.1rem",
										fontWeight: "600",
										letterSpacing: "2px",
										textTransform: "uppercase",
										background: "rgba(0, 132, 255, 0.15)",
										border: "1px solid rgba(0, 132, 255, 0.3)",
										padding: "10px 24px",
										borderRadius: "30px",
										backdropFilter: "blur(10px)",
										boxShadow: "0 0 20px rgba(0, 132, 255, 0.2)"
									}}>
										{label}
									</div>
								) : null;
							})()}
						</motion.div>
						<button
							onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
							style={{
								position: "absolute",
								top: "30px",
								right: "30px",
								background: "rgba(0, 132, 255, 0.15)",
								border: "1px solid var(--accent-primary)",
								color: "var(--accent-primary)",
								padding: "10px 20px",
								borderRadius: "12px",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								gap: "8px",
								fontSize: "13px",
								fontWeight: "700",
								backdropFilter: "blur(10px)",
								boxShadow: "0 0 15px rgba(0, 132, 255, 0.3)",
								zIndex: 6010
							}}
						>
							<X size={18} /> CLOSE PREVIEW
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProjectModal;
