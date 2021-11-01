import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { useTheme } from 'components/ThemeProvider';
import JetBrainsMono from 'assets/fonts/jetbrains-mono.woff2';
import './index.css';

const Code = ({ children, ...rest }) => {
  const theme = useTheme();
  const { preview } = children.props;

  return (
    <Fragment>
      <Helmet>
        {/* Conditionally load mono font since we only use it here */}
        <link rel="preload" href={JetBrainsMono} as="font" crossOrigin="" />
        <style>
          {`
            @font-face {
              font-family: "JetBrains Mono";
              src: url(${JetBrainsMono}) format("woff2");
              font-display: swap;
            }
          `}
        </style>
      </Helmet>
      <pre
        className={classNames('code', `code--${theme.themeId}`, {
          'code--has-preview': preview,
        })}
      >
        <pre className="code__content" {...rest}>
          {children}
        </pre>
      </pre>
      {preview && (
        <iframe
          className="code__preview"
          title="Preview"
          src={`https://codesandbox.io/embed/${preview}?hidenavigation=1&hidedevtools=1&view=preview`}
        />
      )}
    </Fragment>
  );
};

export default Code;
