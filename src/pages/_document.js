import Document, { Html, Head, Main, NextScript } from 'next/document';

class _Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (navigator.doNotTrack !== '1' && navigator.userAgent !== 'ReactSnap') {
                  const script = document.createElement('script');
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-19ZKYVHWKV';
                  script.async = true;
                  document.head.appendChild(script);
                  window.dataLayer = window.dataLayer || [];
                  function gtag() {
                    dataLayer.push(arguments);
                  }
                  gtag('js', new Date());
                  gtag('config', 'G-19ZKYVHWKV');
                }
              `.replace(/\s*\n\s*/g, ''),
            }}
          />
          <meta
            name="keywords"
            content="creative, design, designer, developer, 3d, ui, ux, animation, website, guitar, music, musician"
          />
          <meta name="theme-color" content="#111111" />
          <meta name="author" content="Cody Bennett" />
          <meta name="googlebot" content="follow, index, noarchive" />
          <meta name="robots" content="follow, index, noarchive" />
          <meta name="distribution" content="web" />

          <link rel="manifest" href="https://codyb.co/manifest.json" />
          <link rel="shortcut icon" href="https://codyb.co/favicon.svg" />
          <link rel="apple-touch-icon" href="https://codyb.co/icon-256.png" />
          <link type="text/plain" rel="author" href="https://codyb.co/humans.txt" />

          <meta property="og:site_name" content="codyb.co" />
          <meta property="og:url" content="https://codyb.co" />

          <meta name="twitter:site" content="@Cody_J_Bennett" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
