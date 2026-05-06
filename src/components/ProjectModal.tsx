import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Shield, Code, Database, Layout, ChevronLeft, ArrowUp } from "lucide-react";
import { Github } from "./Icons";

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
								scrollbarWidth: "thin",
								scrollbarColor: "var(--accent-primary) transparent",
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

							{/* 2. Project Image */}
							<div
								style={{
									height: "auto",
									minHeight: "200px",
									width: "100%",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<img
									src={project.image}
									alt={project.title}
									style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }}
									onClick={() => setSelectedImage(project.image)}
								/>
								<div
									style={{
										position: "absolute",
										inset: 0,
										background: "linear-gradient(to bottom, transparent, var(--bg-color))",
									}}
								/>
							</div>

							<div style={{ padding: "clamp(24px, 5vw, 40px)" }}>
								{/* 3. Project Title */}
								<h2
									style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", marginBottom: "20px" }}
									className="neon-text"
								>
									{project.title}
								</h2>
								
								{/* 4 & 5. Meta Row (Tech Stack & Buttons) */}
								<div className="project-meta-row" style={{ 
									display: "flex", 
									justifyContent: "space-between", 
									alignItems: "center", 
									gap: "24px",
									marginBottom: "40px",
									flexWrap: "wrap"
								}}>
									{/* Tech Stack */}
									<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flex: 1 }}>
										{project.techStack.map((tech) => (
											<span
												key={tech}
												style={{
													fontSize: "11px",
													background: "rgba(0, 132, 255, 0.1)",
													border: "1px solid rgba(0, 132, 255, 0.3)",
													padding: "6px 12px",
													borderRadius: "6px",
													color: "var(--accent-primary)",
													whiteSpace: "nowrap"
												}}
											>
												{tech}
											</span>
										))}
									</div>

									{/* Action Buttons */}
									<div className="modal-actions" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
										<a
											href={project.links.github}
											className="btn-outline"
											style={{
												padding: "12px 20px",
												background: "var(--accent-primary)",
												color: "white",
												border: "none",
												fontSize: "14px",
												whiteSpace: "nowrap"
											}}
										>
											<Github size={18} /> Source
										</a>
										<a
											href={project.links.live}
											className="btn-outline"
											style={{
												padding: "12px 20px",
												fontSize: "14px",
												whiteSpace: "nowrap"
											}}
										>
											<ExternalLink size={18} /> Demo
										</a>
									</div>
								</div>

								<div
									className="modal-grid"
									style={{
										display: "grid",
										gap: "60px",
									}}
								>
									<div>
										<h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
											Overview
										</h3>
										<p
											style={{
												color: "var(--text-primary)",
												lineHeight: "1.8",
												fontSize: "1.1rem",
												marginBottom: "32px",
												opacity: 0.9,
											}}
										>
											{project.longDescription}
										</p>

									</div>

									<div>
										<div
											className="glass-card"
											style={{ padding: "24px", marginBottom: "32px" }}
										>
											<h3 style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
												Architecture Details
											</h3>
											<ul
												style={{
													listStyle: "none",
													display: "flex",
													flexDirection: "column",
													gap: "16px",
												}}
											>
												<li style={{ display: "flex", gap: "12px" }}>
													<Layout size={20} color="var(--accent-primary)" />
													<div>
														<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
															Frontend
														</p>
														<p
															style={{
																fontSize: "0.8rem",
																color: "var(--text-secondary)",
															}}
														>
															Modular component architecture with optimized state
															management.
														</p>
													</div>
												</li>
												<li style={{ display: "flex", gap: "12px" }}>
													<Code size={20} color="var(--accent-primary)" />
													<div>
														<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
															API Logic
														</p>
														<p
															style={{
																fontSize: "0.8rem",
																color: "var(--text-secondary)",
															}}
														>
															RESTful endpoints with robust error handling and
															validation.
														</p>
													</div>
												</li>
												<li style={{ display: "flex", gap: "12px" }}>
													<Database size={20} color="var(--accent-primary)" />
													<div>
														<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
															Persistence
														</p>
														<p
															style={{
																fontSize: "0.8rem",
																color: "var(--text-secondary)",
															}}
														>
															Normalized schema design with indexed queries for
															performance.
														</p>
													</div>
												</li>
												<li style={{ display: "flex", gap: "12px" }}>
													<Shield size={20} color="var(--accent-primary)" />
													<div>
														<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
															Security
														</p>
														<p
															style={{
																fontSize: "0.8rem",
																color: "var(--text-secondary)",
															}}
														>
															JWT-based authentication and role-based access
															control.
														</p>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{project.features && (
									<div style={{ marginTop: "60px" }}>
										<h3 style={{ fontSize: "1.5rem", marginBottom: "32px" }}>
											Core Features & <span className="neon-text">Functionalities</span>
										</h3>
										<div style={{ 
											display: "grid", 
											gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
											gap: "32px" 
										}}>
											{Object.entries(project.features).map(([category, features]) => (
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

								{project.gallery && project.gallery.length > 0 && (
									<div style={{ marginTop: "60px" }}>
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
							}}
						>
							<img
								src={selectedImage}
								alt="Zoomed view"
								style={{
									maxWidth: "100%",
									maxHeight: "90vh",
									borderRadius: "8px",
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
								}}
							/>
							<button
								onClick={() => setSelectedImage(null)}
								style={{
									position: "absolute",
									top: "-40px",
									right: "0",
									background: "none",
									border: "none",
									color: "white",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									gap: "8px",
									fontSize: "0.9rem",
									opacity: 0.8,
								}}
							>
								<X size={20} /> Close
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProjectModal;
