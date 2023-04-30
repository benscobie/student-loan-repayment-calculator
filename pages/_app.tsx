import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Open_Sans } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Open_Sans({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout className={inter.className}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
