import React, { useRef } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { ButtonBase } from "@material-ui/core";
import Image from "next/image";
import { CopyToClipboard } from "src/utils/copyToClickboard";
import { socialData } from "src/data/socialData";
import Link from "next/link";

interface pageProps {}

const Contact = ({}: pageProps) => {
	const { formatMessage: f } = useIntl();
	const copyEmailRef = useRef(null);
	const { isCopied, copyHandler } = CopyToClipboard();

	return (
		<SectionContainer id="contact">
			<Title>{f({ id: "contact.title" })}</Title>
			<Content>
				<ContentColumn1>
					<CopyEmailButton
						onClick={() => copyHandler(copyEmailRef.current.textContent)}
					>
						<span ref={copyEmailRef}>adr654231@gmail.com</span>
						<CopyIconWrapper copiedEmail={isCopied}>
							<FileCopyIcon className="contactCopyEmailButton__icon" />
							<span> {f({ id: "copied" })}</span>
						</CopyIconWrapper>
					</CopyEmailButton>

					<SocialList>
						{socialData.map((item) => (
							<Link key={`${item.title}-${item.id}`} passHref href={item.href}>
								<a href={item.href} target="_blank" rel="noopener noreferrer">
									<SocialItem>
										<item.icon className="contentSocialItem__icon" />
										<span>{item.title}</span>
									</SocialItem>
								</a>
							</Link>
						))}
					</SocialList>
				</ContentColumn1>
				<ContentColumn2>
					<Image
						src="/contactSvg.svg"
						layout="fill"
						alt="Contact svg"
						objectFit="contain"
						draggable="false"
					/>
				</ContentColumn2>
			</Content>
		</SectionContainer>
	);
};

export default Contact;

const SectionContainer = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: 6rem 0 2rem 0;

	@media ${(props) => props.theme.breakpoints.lg} {
		padding: 6rem 0 12rem 0;
	}
`;

const Title = styled.h2`
	font-size: 5.8rem;
	font-weight: 600;
	opacity: 0.9;
	color: transparent;
	-webkit-text-stroke: 1px ${({ theme }) => theme.colors.color.primary};
	-webkit-font-smoothing: antialiased;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 8rem;
	}
	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 9.5rem;
	}
	@media ${(props) => props.theme.breakpoints.lg} {
		font-size: 11rem;
	}
	@media ${(props) => props.theme.breakpoints.xl} {
		font-size: 12.5rem;
	}
`;

const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 35px;
	padding: 0 1.6rem 4rem;

	@media ${({ theme }) => theme.breakpoints.sm} {
		padding: 2.4rem 3rem 5rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		padding: 3.2rem 4.8rem 6rem;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const ContentColumn1 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px 0;
	margin-top: 60px;

	@media ${({ theme }) => theme.breakpoints.lg} {
		gap: 45px 0;
		align-items: flex-start;
		margin-top: 70px;
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		margin-top: 80px;
	}
`;

const ContactDescription = styled.p`
	font-size: 15px;
	line-height: 1.5;
	font-weight: 300;
	color: ${({ theme }) => theme.colors.color.primary};
	opacity: 0.5;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 16px;
		line-height: 1.4;
	}
	@media ${(props) => props.theme.breakpoints.md} {
		line-height: 1.5;
		font-size: 17px;
	}
`;

const CopyEmailButton = styled(ButtonBase)`
	display: flex;
	border: 2px solid;
	border-image-slice: 1;
	border-image-source: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
	padding: 0;
	height: 50px;
	font-size: 1.5rem;

	> span {
		padding: 0 0.8rem;
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		font-size: 1.6rem;

		height: 60px;

		> span {
			padding: 0 2rem;
		}
	}
`;

const CopyIconWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-left: 2px solid #2ab3e1;
	height: inherit;
	width: 57px;
	overflow: hidden;
	transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1),
		opacity 0.25s cubic-bezier(0.33, 1, 0.68, 1);

	.contactCopyEmailButton__icon {
		position: absolute;
		font-size: 2rem;
		transform: ${({ copiedEmail }) =>
			copiedEmail ? "translateY(-200%)" : "none"};
		opacity: ${({ copiedEmail }) => (copiedEmail ? "0" : "1")};
		transition: inherit;
	}

	> span {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		height: inherit;
		width: inherit;
		font-size: 1.15rem;
		transform: ${({ copiedEmail }) =>
			copiedEmail ? "none" : "translateY(100%)"};
		opacity: ${({ copiedEmail }) => (copiedEmail ? "1" : "0")};
		transition: inherit;
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		width: 65px;
		.contactCopyEmailButton__icon {
			font-size: 2.3rem;
		}

		> span {
			font-size: 1.4rem;
		}
	}
`;

const SocialList = styled.ul`
	display: flex;
	flex-direction: row;
	gap: 0 40px;

	@media ${({ theme }) => theme.breakpoints.lg} {
		gap: 30px 0;
		flex-direction: column;
	}
`;

const SocialItem = styled.li`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.colors.color.primary};
	cursor: pointer;
	align-self: flex-start;
	opacity: 0.9;
	transition: opacity 0.2s ease;

	.contentSocialItem__icon {
		font-size: 3.3rem;
	}

	> span {
		display: none;
		font-size: 1.6rem;
		margin-left: 20px;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		> span {
			display: inline-block;
		}
	}

	&:hover {
		opacity: 1;
	}
`;

const ContentColumn2 = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px 0;
	min-height: 250px;
	width: 100%;

	@media ${({ theme }) => theme.breakpoints.lg} {
		gap: 45px 0;
		align-items: flex-start;
	}
`;
