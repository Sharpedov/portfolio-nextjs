import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import ScrollToTopButton from "./scrollToTopButton";

interface pageProps {
	children: React.ReactNode;
}

const GlobalLayout = ({ children }: pageProps) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
			<ScrollToTopButton />
		</>
	);
};

export default GlobalLayout;
