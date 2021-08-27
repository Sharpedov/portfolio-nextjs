import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyles from "styles/globalStyles";
import { defaultTheme } from "styles/theme";
import { StylesProvider } from "@material-ui/core";
import GlobalLayout from "src/components/globalLayout";
import { IntlProvider } from "react-intl";
import pl from "src/locales/pl/pl.json";
import en from "src/locales/en/en.json";
import { useRouter } from "next/dist/client/router";

const messages = {
	pl,
	en,
};

function MyApp({ Component, pageProps }) {
	const { locale } = useRouter();

	return (
		<StyledThemeProvider theme={defaultTheme}>
			<StylesProvider injectFirst>
				<GlobalStyles />
				<IntlProvider locale={locale} messages={messages[locale]}>
					<GlobalLayout>
						<Component {...pageProps} />
					</GlobalLayout>
				</IntlProvider>
			</StylesProvider>
		</StyledThemeProvider>
	);
}

export default MyApp;
