import { CardActionArea } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import CustomIconButton from "src/components/customIconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import CustomButton from "src/components/customButton";
import { useIntl } from "react-intl";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ImageModal from "src/components/modal/imageModal";

interface pageProps {
	project;
}

const Project = ({ project }: pageProps) => {
	const {
		id,
		title,
		description,
		href,
		source,
		images,
		framework,
		technologies,
	} = project;
	const [selectedImage, setSelectedImage] = useState<number>(0);
	const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
	const { formatMessage: f } = useIntl();
	const { locale } = useRouter();
	const imagesLength = images.length;

	const navigationArrowHandler = useCallback(
		(typeAction: "prev" | "next") =>
			typeAction === "prev"
				? setSelectedImage((prev) => (prev === 0 ? 0 : prev - 1))
				: typeAction === "next"
				? setSelectedImage((prev) =>
						prev === imagesLength - 1 ? imagesLength - 1 : prev + 1
				  )
				: setSelectedImage(0),
		[imagesLength]
	);

	const navigationDotHandler = useCallback(
		(index: number) => setSelectedImage(index),
		[]
	);

	return (
		<>
			<ArticleContainer component="article">
				<ImageWrapper>
					{images.map((image, i) => (
						<ImageSlide
							key={image}
							style={{ transform: `translateX(${selectedImage * -100}%)` }}
							onClick={() => setShowImagePreview(true)}
						>
							<Image
								alt={title}
								src={image}
								layout="fill"
								objectFit="cover"
								draggable={false}
							/>
						</ImageSlide>
					))}
				</ImageWrapper>
				<Content>
					<Navigation>
						<NavigationArrow
							onClick={() => navigationArrowHandler("prev")}
							disabled={selectedImage === 0}
						>
							<NavigateBeforeRoundedIcon className="imageNavigationArrow__icon" />
						</NavigationArrow>
						<NavigationDots>
							{images.map((_, i) => (
								<NavigationDot
									key={`navigationDot-${i}`}
									active={i === selectedImage}
									onClick={() => navigationDotHandler(i)}
								/>
							))}
						</NavigationDots>
						<NavigationArrow
							onClick={() => navigationArrowHandler("next")}
							disabled={selectedImage === imagesLength - 1}
						>
							<NavigateNextRoundedIcon className="imageNavigationArrow__icon" />
						</NavigationArrow>
					</Navigation>
					<ProjectNumberAndFramework>
						<span>{`0${id}`}</span>
						<span />
						<span>framework {framework}</span>
					</ProjectNumberAndFramework>
					<ProjectTitle>{title}</ProjectTitle>
					<ProjectDescription>{description[locale]}</ProjectDescription>
					<ProjectTechnologies>
						{technologies.map((tech, i) => (
							<ProjectTech key={`${tech}-${i}`}>{tech}</ProjectTech>
						))}
					</ProjectTechnologies>
					<ButtonsRow>
						<CustomButton href={href} targetBlank={true}>
							{f({ id: "button.project.visitWebsite" })}
						</CustomButton>
						<CustomIconButton
							ariaLabel={source}
							href={source}
							Icon={GitHubIcon}
							targetBlank={true}
						/>
					</ButtonsRow>
				</Content>
			</ArticleContainer>
			<ImageModal
				isOpen={showImagePreview}
				onClose={() => setShowImagePreview(false)}
			>
				<ImageWrapper showImagePreview>
					{images.map((image) => (
						<ImageSlide
							key={image}
							style={{ transform: `translateX(${selectedImage * -100}%)` }}
							onClick={() => setShowImagePreview(true)}
						>
							<TransformWrapper>
								<TransformComponent>
									<PreviewImage
										alt={title}
										src={image}
										objectFit="contain"
										className="imagePreview"
									/>
								</TransformComponent>
							</TransformWrapper>
						</ImageSlide>
					))}
					<Navigation showImagePreview>
						<NavigationArrow
							onClick={() => navigationArrowHandler("prev")}
							disabled={selectedImage === 0}
						>
							<NavigateBeforeRoundedIcon className="imageNavigationArrow__icon" />
						</NavigationArrow>
						<NavigationDots>
							{images.map((_, i) => (
								<NavigationDot
									key={`navigationDot-${i}`}
									active={i === selectedImage}
									onClick={() => navigationDotHandler(i)}
								/>
							))}
						</NavigationDots>
						<NavigationArrow
							onClick={() => navigationArrowHandler("next")}
							disabled={selectedImage === imagesLength - 1}
						>
							<NavigateNextRoundedIcon className="imageNavigationArrow__icon" />
						</NavigationArrow>
					</Navigation>
				</ImageWrapper>
			</ImageModal>
		</>
	);
};

export default Project;

const ArticleContainer = styled(CardActionArea)`
	display: flex;
	flex-direction: column;
	position: relative;
	color: ${({ theme }) => theme.colors.color.primary};
	width: 100%;
	align-self: flex-start;
	border: 1px solid rgba(255, 255, 255, 0.04);
	cursor: default;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		z-index: -1;

		background: linear-gradient(
				to bottom right,
				transparent calc(50% - 1px),
				rgba(255, 255, 255, 0.03) calc(50% - 1px),
				rgba(255, 255, 255, 0.03) 50%,
				transparent 50%
			),
			linear-gradient(
				to bottom left,
				transparent calc(50% - 1px),
				rgba(255, 255, 255, 0.03) calc(50% - 1px),
				rgba(255, 255, 255, 0.03) 50%,
				transparent 50%
			);
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	display: flex;
	margin: 0 auto;
	max-height: ${({ showImagePreview }) =>
		showImagePreview ? "auto" : "375px"};
	height: ${({ showImagePreview }) => (showImagePreview ? "100%" : "60vw")};
	width: 100%;
	overflow: hidden;
	cursor: ${({ showImagePreview }) =>
		showImagePreview ? "default" : "zoom-in"};
`;

const ImageSlide = styled.div`
	position: relative;
	display: grid;
	place-items: center;
	min-width: 100%;
	height: 100%;
	transition: transform 0.3s cubic-bezier(0.61, 1, 0.88, 1);
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px 15px 25px;
	gap: 16px 0;

	@media ${({ theme }) => theme.breakpoints.sm} {
		gap: 18px 0;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		gap: 20px 0;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		gap: 22px 0;
	}
`;
const Navigation = styled.div`
	position: ${({ showImagePreview }) => showImagePreview && "absolute"};
	bottom: ${({ showImagePreview }) => showImagePreview && "0"};
	left: ${({ showImagePreview }) => showImagePreview && "50%"};
	transform: ${({ showImagePreview }) =>
		showImagePreview && "translate(-50%, -15px)"};
	display: flex;
	gap: ${({ showImagePreview }) => showImagePreview && "0 3rem"};
	align-items: center;
	justify-content: space-between;
	pointer-events: none;

	@media ${({ theme }) => theme.breakpoints.sm} {
		padding: 0 0.75rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		padding: 0 1rem;
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		padding: 0 1.5rem;
	}
`;

const NavigationArrow = styled.div`
	pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
	opacity: ${({ disabled }) => (disabled ? "0.15" : "0.65")};
	cursor: pointer;

	transition: opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1),
		transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);

	.imageNavigationArrow__icon {
		font-size: 3.2rem;
	}

	&:hover {
		opacity: 1;
		transform: scale(1.1);
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		.imageNavigationArrow__icon {
			font-size: 3.4rem;
		}
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		.imageNavigationArrow__icon {
			font-size: 3.6rem;
		}
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		.imageNavigationArrow__icon {
			font-size: 3.8rem;
		}
	}
`;

const NavigationDots = styled.ul`
	display: flex;
	gap: 15px;

	@media ${({ theme }) => theme.breakpoints.sm} {
		gap: 20px;
	}
`;

const NavigationDot = styled.li`
	background: ${({ theme }) => theme.colors.color.primary};
	height: 8px;
	width: 8px;
	border-radius: 50%;
	opacity: ${({ active }) => (active ? "0.85" : "0.15")};
	cursor: pointer;
	pointer-events: all;
	transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);

	&:hover {
		opacity: ${({ active }) => (active ? "0.85" : "0.7")};
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		height: 9px;
		width: 9px;
	}
`;

const ProjectNumberAndFramework = styled.div`
	display: flex;
	align-items: center;
	> span {
		font-size: 16px;
		color: ${({ theme }) => theme.colors.color.primary};
		opacity: 0.6;
		transition: opacity 0.3s cubic-bezier(0.5, 1, 0.89, 1),
			transform 0.3s cubic-bezier(0.5, 1, 0.89, 1);

		${ArticleContainer}:hover & {
			opacity: 1;
		}

		&:nth-child(2) {
			position: relative;
			display: inline-block;
			width: 40px;
			height: 1px;
			background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
			margin: 0 20px;
			transition: transform 0.3s cubic-bezier(0.5, 1, 0.89, 1);
			transform-origin: left;

			&::after,
			&::before {
				content: "";
				position: absolute;
				top: 0;
				right: 0;
				height: 1px;
				width: 10px;
				background: inherit;
			}

			&::before {
				transform: rotate(-35deg) translate(-1px, 3px);
				opacity: 0;
				transition: opacity 0.2s cubic-bezier(0.5, 1, 0.89, 1);
			}
			&::after {
				transform: rotate(35deg) translate(-1px, -3px);
				opacity: 0;
				transition: opacity 0.2s cubic-bezier(0.5, 1, 0.89, 1);
			}
		}

		${ArticleContainer}:hover & {
			&:nth-child(2) {
				transform: scaleX(1.2);

				&::before {
					opacity: 1;
				}
				&::after {
					opacity: 1;
				}
			}
			&:nth-child(3) {
				background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
				transform: scale(1.08);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}
`;

const ProjectTitle = styled.h3`
	font-size: 20px;
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

	@media (min-width: 480px) {
		font-size: 22px;
	}
	@media (min-width: 768px) {
		font-size: 23px;
	}
	@media (min-width: 1024px) {
		font-size: 24px;
	}
`;

const ProjectDescription = styled.p`
	color: ${({ theme }) => theme.colors.color.primary};
	opacity: 0.5;
	font-weight: 300;
	font-size: 15px;
	line-height: 1.5;
	z-index: 2;

	@media (min-width: 1024px) {
		max-width: 550px;
		font-size: 16px;
		line-height: 1.7;
	}
`;

const ProjectTechnologies = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
`;

const ProjectTech = styled.li`
	opacity: 0.85;
	font-size: 1.4rem;
	user-select: none;
`;

const ButtonsRow = styled.div`
	display: flex;
	gap: 0 25px;
`;

const PreviewImage = styled.img`
	display: block;
	width: 100%;
	max-height: 650px;
	height: 100%;
	object-fit: contain;
`;
