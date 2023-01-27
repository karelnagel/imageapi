import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import useNextSeoProps from "./hooks/useNextSeoProps";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const config: DocsThemeConfig = {
  gitTimestamp: false,
  primaryHue: 321,
  footer: {
    component: () => <Footer />,
  },
  project: {
    icon: null,
  },
  toc: {
    component: null,
  },
  //fdsfsdfsd
  navigation: false,
  darkMode: false,
  nextThemes: { forcedTheme: "dark", defaultTheme: "dark" },
  navbar: {
    component: () => <Navbar />,
  },
  useNextSeoProps,
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter, title: configTitle } = useConfig();
    const basePath = process.env.NEXT_PUBLIC_URL;
    const title = frontMatter.title || configTitle || "Motionly";
    return (
      <>
        <link rel="icon" type="image/x-icon" href="/logo.png"></link>
        <meta property="og:url" content={`${basePath}${asPath}`} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={frontMatter.description || "Automate your content"}
        />
        <meta
          property="og:image"
          content={`${basePath}/api/og?title=${encodeURIComponent(title)}`}
        />
      </>
    );
  },
};

export default config;
