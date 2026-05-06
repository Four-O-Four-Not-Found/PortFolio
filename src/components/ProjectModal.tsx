import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Shield, Code, Database, Layout } from "lucide-react";
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
							zIndex: 2000,
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "center",
							padding: "20px",
							overflowY: "auto",
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
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							className="glass-card modal-content"
							data-lenis-prevent
							style={{
								width: "100%",
								maxWidth: "1000px",
								maxHeight: "90vh",
								overflowY: "auto",
								position: "relative",
								padding: "0",
								border: "1px solid var(--card-border)",
								background: "var(--bg-color)",
								scrollbarWidth: "auto",
								scrollbarColor: "var(--accent-primary) transparent",
							}}
						>
							{/* Header / Hero */}
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
										background:
											"linear-gradient(to bottom, transparent, var(--bg-color))",
									}}
								/>
								<button
									onClick={onClose}
									className="interactive"
									data-cursor-text="Close"
									style={{
										position: "absolute",
										top: "20px",
										right: "20px",
										background: "rgba(0, 0, 0, 0.5)",
										backdropFilter: "blur(5px)",
										border: "1px solid rgba(255, 255, 255, 0.2)",
										color: "white",
										padding: "10px",
										borderRadius: "50%",
										cursor: "pointer",
										zIndex: 100,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										transition: "all 0.3s ease",
									}}
								>
									<X size={20} />
								</button>
							</div>

							<div style={{ padding: "40px" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-start",
										marginBottom: "32px",
									}}
								>
									<div>
										<h2
											style={{ fontSize: "3rem", marginBottom: "8px" }}
											className="neon-text"
										>
											{project.title}
										</h2>
										<div style={{ display: "flex", gap: "8px" }}>
											{project.techStack.map((tech) => (
												<span
													key={tech}
													style={{
														fontSize: "11px",
														background: "rgba(0, 132, 255, 0.1)",
														border: "1px solid rgba(0, 132, 255, 0.3)",
														padding: "4px 10px",
														borderRadius: "4px",
														color: "var(--accent-primary)",
													}}
												>
													{tech}
												</span>
											))}
										</div>
									</div>
									<div style={{ display: "flex", gap: "16px" }}>
										<a
											href={project.links.github}
											className="btn-primary"
											style={{
												display: "flex",
												alignItems: "center",
												gap: "8px",
												padding: "10px 20px",
											}}
										>
											<Github size={18} /> Source Code
										</a>
										<a
											href={project.links.live}
											className="btn-primary"
											style={{
												display: "flex",
												alignItems: "center",
												gap: "8px",
												padding: "10px 20px",
											}}
										>
											<ExternalLink size={18} /> Live Demo
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

										<h3 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
											Technical Attribution
										</h3>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: "16px",
											}}
										>
											{Object.entries(project.contributions).map(
												([member, work]) => (
													<div
														key={member}
														className="glass-card"
														style={{
															padding: "16px",
															display: "flex",
															gap: "16px",
															alignItems: "center",
														}}
													>
														<div
															style={{
																width: "40px",
																height: "40px",
																borderRadius: "50%",
																background: "rgba(0, 132, 255, 0.2)",
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
																fontSize: "14px",
																fontWeight: "bold",
																color: "var(--accent-primary)",
															}}
														>
															{member[0]}
														</div>
														<div>
															<h4
																style={{
																	fontSize: "0.9rem",
																	marginBottom: "4px",
																}}
															>
																{member}
															</h4>
															<p
																style={{
																	fontSize: "0.85rem",
																	color: "var(--text-secondary)",
																}}
															>
																{work}
															</p>
														</div>
													</div>
												),
											)}
										</div>
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
							zIndex: 3000,
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
