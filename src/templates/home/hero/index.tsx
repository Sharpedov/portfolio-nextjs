import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import styled, { keyframes } from "styled-components";
import HeroAnimatedBackground from "./heroAnimatedBackground";
import Link from "next/link";

interface pageProps {}

const Hero = ({}: pageProps) => {
	const { formatMessage: f } = useIntl();
	const { locales, locale } = useRouter();

	const setLanguageToLocalStorageHandler = useCallback(
		(lang: string) =>
			typeof window !== "undefined" &&
			localStorage.setItem("language", JSON.stringify(lang)),
		[]
	);

	return (
		<HeaderContainer>
			<Content>
				<LanguagesList>
					{locales.map((lang) => (
						<Link key={lang} passHref href="/" locale={lang} scroll={false}>
							<Language
								active={locale === lang}
								onClick={() => setLanguageToLocalStorageHandler(lang)}
							>
								{lang === "pl"
									? f({ id: "language.pl" })
									: f({ id: "language.en" })}
							</Language>
						</Link>
					))}
				</LanguagesList>
				<AuthorName>Adrian Piątek</AuthorName>
				<Title>{f({ id: "hero.title" })}</Title>
				<Subtitle>{f({ id: "hero.subtitle" })}</Subtitle>
			</Content>
			<AnimatedBackground>
				<HeroAnimatedBackground />
			</AnimatedBackground>
		</HeaderContainer>
	);
};

export default Hero;

const appearAnimation = keyframes`
	0% {
		transform: skew(0, 5deg) rotate(5deg) translate(200px, 800px);
		opacity: 0;
	}
	100% {
		transform: skew(0, 0) rotate(0) translate(0, 0);
	}
`;
const appearAnimatedBackgroundAnimation = keyframes`
	0% {
		opacity: 0;
	}
	100% {
        opacity: 1;
	}
`;

const HeaderContainer = styled.header`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 1.6rem 1.6rem 4rem;

	@media ${({ theme }) => theme.breakpoints.sm} {
		padding: 2.4rem 3rem 5rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		padding: 3.2rem 4.8rem 6rem;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 2.4rem 0;

	@media ${({ theme }) => theme.breakpoints.sm} {
		gap: 2.5rem 0;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		gap: 2.7rem 0;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		gap: 3rem 0;
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		gap: 3.6rem 0;
	}
`;

const LanguagesList = styled.ul`
	display: flex;
	gap: 0 25px;
	animation: ${appearAnimation} 0.7s 0.3s cubic-bezier(0, 0.45, 0.15, 1) both;
	z-index: 1;
`;

const Language = styled.li`
	position: relative;
	opacity: ${({ active }) => (active ? "1" : "0.65")};
	cursor: pointer;
	transition: opacity 0.2s ease;
	line-height: 1.5;
	font-size: 1.5rem;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: ${({ active }) =>
			active
				? " translate(-50%, 50%) scaleX(1.1)"
				: "translate(-50%, 50%) scaleX(0)"};
		width: 100%;
		height: 2px;
		background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
		border-radius: 10px;
		transition: transform 0.2s cubic-bezier(0.61, 1, 0.88, 1);
	}

	&:hover {
		opacity: 1;
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 1.6rem;
	}
`;

const AuthorName = styled.span`
	font-size: 2rem;
	opacity: 0.85;
	font-weight: 400;
	animation: ${appearAnimation} 0.7s 0.35s cubic-bezier(0, 0.45, 0.15, 1) both;

	@media ${({ theme }) => theme.breakpoints.sm} {
		font-size: 2.1rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 2.2rem;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		font-size: 2.3rem;
	}
`;

const Title = styled.h2`
	font-weight: 600;
	font-size: 3.2rem;
	width: max-content;
	max-width: 100%;
	background: ${({ theme }) => `
	linear-gradient(
		121.57deg,
		${theme.colors.color.primary} 18.77%,
		rgba(255, 255, 255, 0.66) 60.15%
	)`};
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: ${appearAnimation} 0.7s 0.45s cubic-bezier(0, 0.45, 0.15, 1) both;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 4rem;
	}

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 4.8rem;
	}
	@media ${(props) => props.theme.breakpoints.lg} {
		font-size: 5.6rem;
	}
	@media ${(props) => props.theme.breakpoints.xl} {
		font-size: 5.9rem;
	}
`;

export const Subtitle = styled.p`
	max-width: 800px;
	font-size: 16px;
	line-height: 1.5;
	font-weight: 300;
	color: ${({ theme }) => theme.colors.primary1};
	opacity: 0.5;
	animation: ${appearAnimation} 0.7s 0.5s cubic-bezier(0, 0.45, 0.15, 1) both;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 20px;
		line-height: 1.6;
	}
	@media ${(props) => props.theme.breakpoints.md} {
		max-width: 670px;
		line-height: 1.7;
		font-size: 24px;
	}
`;

const AnimatedBackground = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	max-width: 300px;
	transform: translate(50px, -50px);
	width: 100%;
	animation: ${appearAnimatedBackgroundAnimation} 1s 0.7s ease both;

	@media ${({ theme }) => theme.breakpoints.sm} {
		transform: translate(35px, -40px);

		max-width: 350px;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		transform: translate(30px, -30px);
		max-width: 450px;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		transform: translate(-10px, -20px);
		max-width: 525px;
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		transform: translate(-50px, -20px);
		max-width: 550px;
	}
`;
