import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyles from "styles/globalStyles";
import { defaultTheme } from "styles/theme";
import { StylesProvider } from "@material-ui/core";

function MyApp({ Component, pageProps }) {
	return (
		<StyledThemeProvider theme={defaultTheme}>
			<StylesProvider injectFirst>
				<GlobalStyles />
				<Component {...pageProps} />
			</StylesProvider>
		</StyledThemeProvider>
	);
}

export default MyApp;
