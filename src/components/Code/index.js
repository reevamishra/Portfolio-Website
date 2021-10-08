import { Fragment } from 'react';
import classNames from 'classnames';
import { useTheme } from 'components/ThemeProvider';
import './index.css';

const Code = ({ children, ...rest }) => {
  const theme = useTheme();
  const { preview } = children.props;

  return (
    <Fragment>
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
