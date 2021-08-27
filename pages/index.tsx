import Head from "next/head";
import React from "react";
import HomeTemplate from "src/templates/home";

export default function Home() {
	return (
		<>
			<Head>
				<title>Portfolio - Adrian Piątek</title>
			</Head>
			<HomeTemplate />
		</>
	);
}
