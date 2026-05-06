import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface NavbarProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {

	const navItems = [
		{ name: "Home", path: "#" },
		{ name: "Projects", path: "#projects" },
		{ name: "Team", path: "#team" },
	];

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<>
		<nav
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				zIndex: 6000,
				padding: "env(safe-area-inset-top) 0 0",
				background: "rgba(5, 7, 10, 0.95)",
				backdropFilter: "blur(20px)",
				borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
			}}
		>
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "12px clamp(16px, 4vw, 40px)",
				}}
			>
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						fontSize: "clamp(14px, 4vw, 18px)",
						fontWeight: "900",
						letterSpacing: "-0.5px",
						color: "var(--accent-primary)",
						whiteSpace: "nowrap",
						flexShrink: 1
					}}
				>
					<img src="/favicon.svg" alt="404 Logo" style={{ width: "32px", height: "32px" }} />
				</motion.div>

				{/* Desktop Navigation */}
				<ul
					className="desktop-nav"
					style={{
						display: "flex",
						listStyle: "none",
						gap: "32px",
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
								style={{
									fontSize: "14px",
									fontWeight: "600",
									color: "var(--text-secondary)",
									transition: "color 0.3s ease",
									textTransform: "uppercase",
									letterSpacing: "1px",
								}}
								className="interactive"
							>
								{item.name}
							</a>
						</motion.li>
					))}
					<MagneticButton 
						strength={0.2} 
						className="nav-cta"
						onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Contact Us
					</MagneticButton>
				</ul>

				{/* Mobile Hamburger - Force display block on small screens */}
				<button
					className="mobile-toggle"
					onClick={toggleMenu}
					aria-label="Toggle Menu"
					style={{
						background: "transparent",
						border: "none",
						color: "var(--accent-primary)",
						padding: "0",
						cursor: "pointer",
						zIndex: 5000,
						display: "none",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>
			<style>{`
				@media (max-width: 768px) {
					.desktop-nav {
						display: none !important;
					}
					.mobile-toggle {
						display: flex !important;
					}
					nav {
						background: rgba(10, 10, 10, 0.9) !important;
					}
				}
			`}</style>
		</nav>

		{/* Mobile Sidebar - Moved outside of <nav> to allow full-screen backdrop */}
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={toggleMenu}
						style={{
							position: "fixed",
							inset: 0,
							background: "rgba(0,0,0,0.8)",
							backdropFilter: "blur(5px)",
							zIndex: 4000, // Above everything
						}}
					/>
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						style={{
							position: "fixed",
							top: 0,
							right: 0,
							width: "80%",
							maxWidth: "300px",
							height: "100vh",
							background: "var(--bg-color)",
							borderLeft: "1px solid var(--card-border)",
							zIndex: 5000, // Above backdrop
							padding: "100px 40px",
							display: "flex",
							flexDirection: "column",
							gap: "30px",
						}}
					>
						{navItems.map((item, i) => (
							<motion.a
								key={item.name}
								href={item.path}
								onClick={toggleMenu}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: i * 0.1 }}
								style={{
									fontSize: "2rem",
									fontWeight: "800",
									color: "var(--text-primary)",
									textDecoration: "none",
								}}
							>
								{item.name}
							</motion.a>
						))}
						<motion.a
							href="#contact"
							onClick={toggleMenu}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: navItems.length * 0.1 }}
							style={{
								fontSize: "2rem",
								fontWeight: "800",
								color: "var(--accent-primary)",
								textDecoration: "none",
							}}
						>
							Contact
						</motion.a>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	</>
);
};

export default Navbar;
