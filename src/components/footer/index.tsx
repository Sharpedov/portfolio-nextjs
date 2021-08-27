import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

interface pageProps {}

const Footer = ({}: pageProps) => {
	const { formatMessage: f } = useIntl();

	return (
		<FooterContainer>
			<Wrapper>
				<span>
					Copyright &copy; {new Date().getFullYear()} Adrian Piątek.{" "}
					{f({ id: "footer.copyright" })}
				</span>
			</Wrapper>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.footer`
	display: flex;
	padding: 4rem 2rem;
	border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	gap: 25px 0;
	text-align: center;
`;
