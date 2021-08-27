import React from "react";
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
			<ScrollToTopButton />
		</>
	);
};

export default GlobalLayout;
