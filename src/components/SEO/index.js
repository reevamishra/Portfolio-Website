import { Helmet } from 'react-helmet';

const SEO = ({ title, description, socialImage, children }) => {
  // Make relative Webpack paths absolute for crawlers
  if (socialImage && !socialImage.startsWith('https://'))
    socialImage = `https://codyb.co${socialImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      {socialImage && <meta itemProp="image" content={socialImage} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {socialImage && <meta property="og:image" content={socialImage} />}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {socialImage && <meta name="twitter:image" content={socialImage} />}

      {children}
    </Helmet>
  );
};

export default SEO;
