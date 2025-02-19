import React, { useRef, useState, memo } from 'react';
import styled, { css } from 'styled-components/macro';
import { NavLink, Link } from 'components/Link';
import { Transition } from 'react-transition-group';
import Monogram from 'components/Monogram';
import Icon from 'components/Icon';
import NavToggle from './NavToggle';
import ThemeToggle from './ThemeToggle';
import { media } from 'utils/style';
import { useWindowSize, useAppContext } from 'hooks';
import { navLinks, socialLinks } from './navData';
import { reflow } from 'utils/transition';
import { pxToRem, tokens, msToNum } from 'app/theme';

const HeaderIcons = () => (
  <HeaderNavIcons>
    {socialLinks.map(({ label, to, url, icon }) => (
      <HeaderNavIconLink as={to && Link} key={label} aria-label={label} to={to} href={url}>
        <HeaderNavIcon icon={icon} />
      </HeaderNavIconLink>
    ))}
  </HeaderNavIcons>
);

function Header(props) {
  const { menuOpen, dispatch } = useAppContext();
  const { location } = props;
  const [hashKey, setHashKey] = useState();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  const handleNavClick = () => {
    setHashKey(Math.random().toString(32).substr(2, 8));
  };

  const handleMobileNavClick = () => {
    handleNavClick();
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const isMatch = ({ match, hash = '' }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo
        to={{ pathname: '/', hash: '#intro', state: hashKey }}
        aria-label="Cody Bennett, Designer & Developer"
        onClick={handleMobileNavClick}
      >
        <Monogram highlight />
      </HeaderLogo>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <HeaderNav role="navigation">
        <HeaderNavList>
          {navLinks.map(({ label, pathname, hash }) => (
            <HeaderNavLink
              exact
              isActive={match => isMatch({ match, hash })}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash, state: hashKey }}
            >
              {label}
            </HeaderNavLink>
          ))}
        </HeaderNavList>
        <HeaderIcons />
      </HeaderNav>
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: msToNum(tokens.base.durationL) }}
        onEnter={reflow}
      >
        {status => (
          <HeaderMobileNav status={status}>
            {navLinks.map(({ label, pathname, hash }, index) => (
              <HeaderMobileNavLink
                key={label}
                delay={`calc(${tokens.base.durationS} + ${index}ms * 50ms)`}
                status={status}
                onClick={handleMobileNavClick}
                to={{ pathname, hash, state: hashKey }}
              >
                {label}
              </HeaderMobileNavLink>
            ))}
            <HeaderIcons />
            <ThemeToggle isMobile />
          </HeaderMobileNav>
        )}
      </Transition>
      {!isMobile &&
        <ThemeToggle />
      }
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  --headerNavFontSize: ${pxToRem(16)};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  width: var(--space2XL);
  position: fixed;
  top: var(--spaceOuter);
  left: var(--spaceOuter);
  bottom: var(--spaceOuter);
  z-index: 1024;

  @media (max-width: ${media.mobile}px) {
    --headerNavFontSize: ${pxToRem(22)};
  }

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    bottom: auto;
  }
`;

const HeaderLogo = styled(Link)`
  display: flex;
  position: relative;
  padding: var(--spaceS) var(--spaceS) var(--spaceL);
  z-index: 16;

  @media (max-width: ${media.mobile}px) {
    padding-bottom: var(--spaceS);
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  max-width: var(--space2XL);
  position: relative;
  top: calc(var(--spaceM) * -1);

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    display: none;
  }
`;

const HeaderNavList = styled.div`
  transform: rotate(-90deg) translate3d(-50%, 0, 0);
  display: flex;
  flex-direction: row-reverse;
`;

const HeaderNavLink = styled(NavLink)`
  padding: var(--spaceM);
  color: rgb(var(--rgbText) / 0.8);
  font-weight: var(--fontWeightMedium);
  font-size: var(--headerNavFontSize);
  text-decoration: none;
  position: relative;
  transition: color var(--durationS) ease 0.1s;
  line-height: 1;

  &:hover,
  &:active,
  &:focus,
  &.active {
    color: var(--colorTextBody);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: var(--spaceS);
    left: var(--spaceS);
    height: 4px;
    background: rgb(var(--rgbAccent));
    transform: scaleX(0) translateY(-2px);
    transition: transform var(--durationM) var(--bezierFastoutSlowin);
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after,
  &.active:after {
    transform: scaleX(1) translateY(-2px);
    transform-origin: left;
  }
`;

const HeaderNavIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 16;

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    flex-direction: row;
    position: absolute;
    bottom: var(--spaceXL);
    left: var(--spaceXL);
  }

  @media ${media.mobileLS} {
    left: var(--spaceL);
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavIconLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spaceS);
  width: var(--space2XL);
  height: var(--space2XL);
`;

const HeaderNavIcon = styled(Icon)`
  fill: var(--colorTextLight);
  transition: fill var(--durationM) ease;

  ${/* sc-selector */HeaderNavIconLink}:hover &,
  ${/* sc-selector */HeaderNavIconLink}:focus &,
  ${/* sc-selector */HeaderNavIconLink}:active & {
    fill: rgb(var(--rgbAccent));
  }
`;

const HeaderMobileNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(var(--rgbBackground) / 0.9);
  transform: translate3d(0, ${props => props.status === 'entered' ? 0 : '-100%'}, 0);
  transition-property: transform, background;
  transition-duration: var(--durationL);
  transition-timing-function: var(--bezierFastoutSlowin);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(var(--spaceM));

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    display: flex;
  }
`;

const HeaderMobileNavLink = styled(NavLink).attrs({
  active: 'active',
})`
  width: 100%;
  font-size: var(--headerNavFontSize);
  text-align: center;
  text-decoration: none;
  color: var(--colorTextBody);
  padding: var(--spaceL);
  transform: translate3d(0, calc(var(--spaceXL) * -1), 0);
  opacity: 0;
  transition-property: transform, opacity;
  transition-duration: var(--durationS);
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-delay: ${props => props.delay};
  position: relative;
  top: calc(var(--spaceM) * -1);

  @media ${media.mobileLS} {
    top: auto;
  }

  @media (max-width: 400px), (max-height: 360px) {
    --headerNavFontSize: ${pxToRem(18)};
  }

  ${props => props.status === 'entered' && css`
    opacity: 1;
    transform: translate3d(0, 0, 0);
  `}

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: var(--space3XL);
    left: var(--space3XL);
    height: 4px;
    background: rgb(var(--rgbAccent));
    transform: scaleX(0) translateY(-1px);
    transition: transform var(--durationM) var(--bezierFastoutSlowin);
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after {
    transform: scaleX(1) translateY(-1px);
    transform-origin: left;
  }
`;

export default memo(Header);
