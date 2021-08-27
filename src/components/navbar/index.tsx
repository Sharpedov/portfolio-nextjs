import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { navListData } from "src/data/navbarData";
import styled, { keyframes } from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { socialData } from "src/data/socialData";
import CustomIconButton from "../customIconButton";
import { AnimatePresence, motion } from "framer-motion";

interface pageProps {}

const Navbar = ({}: pageProps) => {
	const { locale } = useRouter();
	const [isScrolling, setIsScrolling] = useState<boolean>(false);
	const navListRef = useRef<HTMLElement>(null);

	const scrollHandler = useCallback(
		() =>
			navListRef.current &&
			setIsScrolling(window.scrollY >= 100 ? true : false),
		[]
	);

	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);

		return () => window.removeEventListener("scroll", scrollHandler);
	}, [scrollHandler]);

	return (
		<>
			<NavContainer>
				<Wrapper>
					<Logo>
						<span>Portfolio</span>
					</Logo>
					<NavList ref={navListRef}>
						{navListData.map((item, i) => (
							<NavItem key={`${item.title}-${i}`}>
								<ScrollLink
									activeClass="active"
									to={item.scrollTo}
									spy={true}
									duration={500}
									offset={-10}
								>
									{item.title[locale]}
								</ScrollLink>
							</NavItem>
						))}
					</NavList>
					<SocialList>
						{socialData.map((item) => (
							<CustomIconButton
								key={`${item.title}-${item.id}`}
								ariaLabel={`${item.title}`}
								href={item.href}
								targetBlank={true}
								Icon={item.icon}
							/>
						))}
					</SocialList>
				</Wrapper>
			</NavContainer>
			<AnimatePresence>
				<MobileFixedNavList
					initial={{
						y: "-100%",
					}}
					animate={{
						y: isScrolling ? "0%" : "-100%",
					}}
				>
					{navListData.map((item, i) => (
						<NavItem key={`${item.title}-${i}`}>
							<ScrollLink
								activeClass="active"
								to={item.scrollTo}
								spy={true}
								duration={500}
								offset={-10}
							>
								{item.title[locale]}
							</ScrollLink>
						</NavItem>
					))}
				</MobileFixedNavList>
			</AnimatePresence>
		</>
	);
};

export default Navbar;

const appearAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const NavContainer = styled.nav`
	display: flex;
	align-items: center;
	padding: 2rem;
	animation: ${appearAnimation} 1s 0.7s ease both;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas: "logo social" "navList navList";
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	grid-gap: 1.5rem;

	@media ${({ theme }) => theme.breakpoints.sm} {
		grid-gap: 2rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: "logo navList social";
		grid-gap: 1.5rem;
	}
`;

const Logo = styled.div`
	grid-area: logo;
	display: flex;
	align-items: center;
	font-size: 2rem;
`;

const NavList = styled(motion.ul)`
	grid-area: navList;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	gap: 1.5rem;

	@media ${({ theme }) => theme.breakpoints.sm} {
		justify-content: center;
		gap: 3.5rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		gap: 4rem;
	}
`;

const NavItem = styled.li`
	> a {
		position: relative;
		line-height: 1.75;
		cursor: pointer;
		opacity: 0.85;
		transition: opacity 0.2s cubic-bezier(0.61, 1, 0.88, 1);

		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 50%) scaleX(0);
			width: 100%;
			height: 2px;
			background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
			border-radius: 10px;
			transition: transform 0.2s cubic-bezier(0.61, 1, 0.88, 1);
		}

		&:hover {
			opacity: 1;
		}
	}

	.active {
		opacity: 1;

		&::after {
			transform: translate(-50%, 50%) scaleX(1.1);
		}
	}
`;

const SocialList = styled.ul`
	grid-area: social;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;

	@media ${({ theme }) => theme.breakpoints.sm} {
		gap: 2rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		gap: 3rem;
	}
`;

const MobileFixedNavList = styled(NavList)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: ${({ theme }) => theme.colors.background.primary};
	border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	padding: 1rem 2rem;
	width: 100%;
	z-index: 100;
`;
