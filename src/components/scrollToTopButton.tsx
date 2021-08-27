import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import { ButtonBase } from "@material-ui/core";

interface pageProps {}

const ScrollToTopButton = ({}: pageProps) => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);

	const scrollHander = useCallback(
		() => setIsScrolling(window.scrollY >= 260 ? true : false),
		[]
	);

	useEffect(() => {
		window.addEventListener("scroll", scrollHander);

		return () => window.removeEventListener("scroll", scrollHander);
	}, [scrollHander]);

	const scrollToTopHandler = useCallback(() => window.scrollTo(0, 0), []);

	return (
		<Container
			aria-label="Scroll to top"
			active={isScrolling}
			onClick={scrollToTopHandler}
		>
			<KeyboardArrowUpRoundedIcon className="scrollToTopButton_icon" />
		</Container>
	);
};

export default ScrollToTopButton;

const Container = styled(ButtonBase)`
	position: fixed;
	bottom: 16px;
	right: 16px;
	display: grid;
	place-items: center;
	height: 56px;
	width: 56px;
	border-radius: 50%;
	transform: ${({ active }) => (active ? "scale(1)" : "scale(0.2)")};
	background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
	box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
		0 1px 8px 0 rgba(0, 0, 0, 0.12);
	opacity: ${({ active }) => (active ? "1" : "0")};
	visibility: ${({ active }) => (active ? "visible" : "hidden")};
	z-index: 100;
	transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
		opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
		visibility 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

	.scrollToTopButton_icon {
		transform: ${({ active }) => (active ? "rotate(0def)" : "rotate(-45deg)")};
		font-size: 28px;
		transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		bottom: 20px;
		right: 20px;
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		bottom: 25px;
		right: 25px;
	}
`;
