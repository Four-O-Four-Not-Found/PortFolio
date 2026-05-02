import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
	const navItems = [
		{ name: "Home", path: "#" },
		{ name: "Projects", path: "#projects" },
		{ name: "Team", path: "#team" },
		{ name: "Contact", path: "#contact" },
	];

	return (
		<nav
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				zIndex: 1000,
				padding: "24px 0",
				background:
					"linear-gradient(to bottom, rgba(10, 10, 10, 0.8), transparent)",
				backdropFilter: "blur(10px)",
			}}
		>
			<div
				className="container"
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
					gap: "16px",
				}}
			>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						color: "var(--accent-primary)",
					}}
				>
					404: Not Found
				</motion.div>

				<ul
					className="nav-links"
					style={{
						display: "flex",
						listStyle: "none",
						gap: "clamp(12px, 3vw, 32px)",
						alignItems: "center",
					}}
				>
					{navItems.map((item, i) => (
						<motion.li
							key={item.name}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1 }}
						>
							<a
								href={item.path}
								className="interactive"
								data-cursor-text="Go"
								style={{
									fontSize: "14px",
									fontWeight: "500",
									color: "var(--text-secondary)",
									transition: "color 0.3s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.color = "var(--text-primary)")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.color = "var(--text-secondary)")
								}
							>
								{item.name}
							</a>
						</motion.li>
					))}
					<motion.li
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4 }}
					>
						<MagneticButton strength={0.2} className="nav-cta">
							Get in Touch
						</MagneticButton>
					</motion.li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
