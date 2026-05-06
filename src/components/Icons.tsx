import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  id: string;
  style?: React.CSSProperties;
}

const SpriteIcon = ({ size = 24, id, style, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    style={{ fill: 'currentColor', ...style }} 
    {...props}
  >
    <use xlinkHref={`/icons.svg#${id}`} />
  </svg>
);

export const Github = (props: any) => <SpriteIcon id="github-icon" {...props} />;
export const Discord = (props: any) => <SpriteIcon id="discord-icon" {...props} />;
export const Documentation = (props: any) => <SpriteIcon id="documentation-icon" {...props} />;
export const Social = (props: any) => <SpriteIcon id="social-icon" {...props} />;
export const XIcon = (props: any) => <SpriteIcon id="x-icon" {...props} />;
export const Bluesky = (props: any) => <SpriteIcon id="bluesky-icon" {...props} />;

// Fallback for Linkedin since it wasn't in icons.svg sprite but used in team
export const Linkedin = ({
	size = 24,
	...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect width="4" height="12" x="2" y="9" />
		<circle cx="4" cy="4" r="2" />
	</svg>
);
