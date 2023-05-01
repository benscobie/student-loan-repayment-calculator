import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Open_Sans } from "next/font/google";
import { Tooltip } from "react-tooltip";
import Script from "next/script";

// If loading a variable font, you don't need to specify the font weight
const inter = Open_Sans({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout className={inter.className}>
      <Script
        src="https://umami.benscobie.com/script.js"
        data-website-id="bc37a9e4-da7b-4e96-a848-120ab3d33703"
      />
      <Component {...pageProps} />
      <Tooltip
        id="tooltip"
        style={{
          backgroundColor: "rgb(71, 85, 105)",
          color: "#fff",
          opacity: 1,
        }}
      />
    </Layout>
  );
}

export default MyApp;
