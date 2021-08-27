import React from "react";
import styled from "styled-components";
import Hero from "./hero";

interface pageProps {}

const HomeTemplate = ({}: pageProps) => {
	return (
		<Container>
			<Wrapper>
				<Hero />
			</Wrapper>
		</Container>
	);
};

export default HomeTemplate;

const Container = styled.div`
	display: flex;
	padding: 2rem;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
`;
