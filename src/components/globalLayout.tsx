import React from "react";
import Navbar from "./navbar";

interface pageProps {
	children: React.ReactNode;
}

const GlobalLayout = ({ children }: pageProps) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default GlobalLayout;
