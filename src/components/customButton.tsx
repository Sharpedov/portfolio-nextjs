import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface pageProps {
	children: React.ReactNode;
	onClick?: () => void;
	href?: string;
	targetBlank?: boolean;
	type?: string;
}

const CustomButton = ({
	children,
	onClick,
	href,
	targetBlank,
	type,
}: pageProps) => {
	const ButtonElement = () => (
		<ButtonContainer onClick={onClick} type={type}>
			{children}
		</ButtonContainer>
	);

	return href ? (
		<Link passHref href={href}>
			{targetBlank ? (
				<a
					target="_blank"
					href={href}
					rel="noopener noreferrer"
					style={{ width: "max-content" }}
				>
					<ButtonElement />
				</a>
			) : (
				<ButtonElement />
			)}
		</Link>
	) : (
		<ButtonElement />
	);
};

export default CustomButton;

const ButtonContainer = styled(Button)`
	position: relative;
	display: flex;
	align-items: center;
	padding: 0.5rem 0.8rem;
	transition: 0.25s cubic-bezier(0.33, 1, 0.68, 1);
	background-color: transparent;
	max-width: 180px;
	color: ${({ theme }) => theme.colors.color.primary};
	text-transform: none;
	font-weight: 400;

	> span {
		border-radius: 0px;
		font-size: 1.7rem;
		color: ${({ theme }) => theme.colors.color.primary};
		text-transform: none;
		font-weight: 400;
		height: 100%;
		z-index: 1;
	}

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		border: 1px solid ${({ theme }) => theme.colors.color.primary};
		transition: 0.25s cubic-bezier(0.33, 1, 0.68, 1);
	}
	&::before {
		content: "";
		position: absolute;
		inset: 0;
		transform: translate(-6px, 6px);
		background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
		transition: 0.25s cubic-bezier(0.33, 1, 0.68, 1);
	}

	&:hover {
		&::after {
			transform: translate(-6px, 6px);
		}
		&::before {
			transform: none;
		}
	}
`;

// const Arrow = styled.div`
// 	position: relative;
// 	display: inline-block;
// 	width: 20px;
// 	height: 1px;
// 	background-color: ${({ theme }) => theme.colors.primary1};
// 	margin-left: 8px;
// 	vertical-align: middle;
// 	transition: width 0.2s cubic-bezier(0.5, 1, 0.89, 1);

// 	&::after,
// 	&::before {
// 		content: "";
// 		position: absolute;
// 		top: 0;
// 		right: 0;
// 		height: 1px;
// 		width: 10px;
// 		background-color: inherit;
// 	}

// 	&::before {
// 		transform: rotate(-35deg) translate(-1px, 3px);
// 		transition: opacity 0.2s cubic-bezier(0.5, 1, 0.89, 1);
// 	}
// 	&::after {
// 		transform: rotate(35deg) translate(-1px, -3px);
// 		transition: opacity 0.2s cubic-bezier(0.5, 1, 0.89, 1);
// 	}
// `;
