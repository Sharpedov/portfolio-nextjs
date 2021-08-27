import React from "react";
import { useIntl } from "react-intl";
import { projectsData } from "src/data/projectsData";
import styled, { keyframes } from "styled-components";
import Project from "./project";

interface pageProps {}

const Projects = ({}: pageProps) => {
	const { formatMessage: f } = useIntl();

	return (
		<SectionContainer id="projects">
			<Title>{f({ id: "projects.title" })}</Title>
			<ProjectsList>
				{projectsData.map((project) => (
					<Project key={project.id} project={project} />
				))}
			</ProjectsList>
		</SectionContainer>
	);
};

export default Projects;

const appearAnimation = keyframes`
	0% {
		transform: skew(0, 5deg) rotate(5deg) translate(0px, 500px);
		opacity: 0;
	}

	100% {
		transform: skew(0, 0) rotate(0) translate(0, 0);
	}
`;

const SectionContainer = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 9rem 0 6rem;
	min-height: 100vh;
	overflow: hidden;

	@media ${({ theme }) => theme.breakpoints.lg} {
		padding: 11rem 0 7rem;
	}
`;

const Title = styled.h2`
	font-size: 58px;
	font-weight: 600;
	opacity: 0.9;
	color: transparent;
	-webkit-text-stroke: 1px ${({ theme }) => theme.colors.color.primary};
	-webkit-font-smoothing: antialiased;
	animation: ${appearAnimation} 0.7s 0.6s cubic-bezier(0, 0.45, 0.15, 1) both;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 80px;
	}

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 95px;
	}
	@media ${(props) => props.theme.breakpoints.lg} {
		font-size: 110px;
	}
	@media ${(props) => props.theme.breakpoints.xl} {
		font-size: 125px;
	}
`;

const ProjectsList = styled.ul`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	gap: 60px 30px;
	margin-top: 60px;
	animation: ${appearAnimation} 0.7s 0.65s cubic-bezier(0, 0.45, 0.15, 1) both;

	> article {
		width: 100%;
		margin: 0 auto;
		max-width: 600px;
		transition: all 0.2s ease;
	}

	> article:nth-child(even) {
		margin-top: 0px;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-template-columns: repeat(10, 1fr);
		gap: 60px 35px;
		margin-top: 70px;

		> article:nth-child(odd) {
			grid-column: 1 / 6;
		}
		> article:nth-child(even) {
			grid-column: 6 / 11;
			margin-top: 120px;
		}
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		gap: 70px 40px;
		margin-top: 80px;

		> article:nth-child(odd) {
			grid-column: 1 / 7;
			max-width: 750px;
		}
		> article:nth-child(even) {
			grid-column: 7 / 11;
			margin-top: 160px;
			max-width: 750px;
		}
	}
`;
