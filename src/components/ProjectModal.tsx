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
}

interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
	if (!project) return null;

	return (
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
						style={{
							width: "100%",
							maxWidth: "1000px",
							maxHeight: "90vh",
							overflowY: "auto",
							position: "relative",
							padding: "0",
							border: "1px solid var(--card-border)",
							background: "var(--bg-color)",
							scrollbarWidth: "thin",
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
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
								style={{
									position: "fixed",
									top: "20px",
									right: "20px",
									background: "var(--accent-primary)",
									border: "none",
									color: "white",
									padding: "12px",
									borderRadius: "50%",
									cursor: "pointer",
									zIndex: 100,
									boxShadow: "0 0 15px rgba(0, 132, 255, 0.5)",
								}}
							>
								<X size={24} />
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
											color: "var(--text-secondary)",
											lineHeight: "1.8",
											fontSize: "1.1rem",
											marginBottom: "32px",
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
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default ProjectModal;
