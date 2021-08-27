import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { IconButton } from "@material-ui/core";

interface pageProps {
	ariaLabel: string;
	Icon;
	href?: string;
	targetBlank?: boolean;
	onClick?: () => void;
}

const CustomIconButton = ({
	ariaLabel,
	Icon,
	href,
	targetBlank,
	onClick,
}: pageProps) => {
	return href ? (
		<Link passHref href={href}>
			{targetBlank ? (
				<a target="_blank" href={href} rel="noopener noreferrer">
					<ButtonContainer aria-label={ariaLabel} onClick={onClick}>
						<Icon className="customIconButton__icon" />
					</ButtonContainer>
				</a>
			) : (
				<ButtonContainer aria-label={ariaLabel} onClick={onClick}>
					<Icon className="customIconButton__icon" />
				</ButtonContainer>
			)}
		</Link>
	) : (
		<ButtonContainer aria-label={ariaLabel} onClick={onClick}>
			<Icon className="customIconButton__icon" />
		</ButtonContainer>
	);
};

export default CustomIconButton;

const ButtonContainer = styled(IconButton)`
	display: grid;
	place-items: center;
	position: relative;
	outline: none;
	border: none;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.color.primary};
	padding: 7px;
	transition: all 0.2s cubic-bezier(0.61, 1, 0.88, 1);

	.customIconButton__icon {
		color: ${({ theme }) => theme.colors.color.primary};
		font-size: 28px;
	}

	&:hover {
		background: rgba(255, 255, 255, 0.1);
		&::after {
			transform: scale(1.2);
			opacity: 0.8;
		}
	}
	&:active {
		&::after {
			opacity: 0.7;
		}
	}
`;
