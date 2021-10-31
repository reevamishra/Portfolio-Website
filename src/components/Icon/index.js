import classNames from 'classnames';
import ArrowRight from 'assets/icons/arrow-right.svg';
import ChevronRight from 'assets/icons/chevron-right.svg';
import Close from 'assets/icons/close.svg';
import Dribbble from 'assets/icons/dribbble.svg';
import Email from 'assets/icons/email.svg';
import Error from 'assets/icons/error.svg';
import Figma from 'assets/icons/figma.svg';
import Github from 'assets/icons/github.svg';
import Linkedin from 'assets/icons/linkedin.svg';
import Menu from 'assets/icons/menu.svg';
import Pause from 'assets/icons/pause.svg';
import Play from 'assets/icons/play.svg';
import Send from 'assets/icons/send.svg';
import Twitter from 'assets/icons/twitter.svg';
import './index.css';

export const icons = {
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
  close: Close,
  dribbble: Dribbble,
  email: Email,
  error: Error,
  figma: Figma,
  github: Github,
  linkedin: Linkedin,
  menu: Menu,
  pause: Pause,
  play: Play,
  send: Send,
  twitter: Twitter,
};

const Icon = ({ icon, style, className, ...rest }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden className={classNames('icon', className)} {...rest} />
  );
};

export default Icon;
