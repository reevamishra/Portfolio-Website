import React, { lazy, Suspense, useEffect, createContext, useReducer, Fragment } from 'react';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components/macro';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup, config as transitionConfig } from 'react-transition-group';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from 'components/Header';
import { theme, tokens, createThemeProperties, msToNum } from 'app/theme';
import { cornerClip, media } from 'utils/style';
import { useLocalStorage, usePrefersReducedMotion } from 'hooks';
import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { initialState, reducer } from 'app/reducer';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const ProjectModern = lazy(() => import('pages/ProjectModern'));
const ProjectDevTechTools = lazy(() => import('pages/DevTechTools'));
const ProjectMystGang = lazy(() => import('pages/MystGang'));
//const Articles = lazy(() => import('pages/Articles'));
const NotFound = lazy(() => import('pages/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const repoPrompt = `\u00A9 2018-${new Date().getFullYear()} Cody Bennett\n\nCheck out the source code: https://github.com/CodyJasonBennett/portfolio-website`;

export const fontStyles = `
  @font-face {
    font-family: "Gotham";
    font-weight: 400;
    src: url(${GothamBook}) format("woff");
    font-display: swap;
  }
  @font-face {
    font-family: "Gotham";
    font-weight: 500;
    src: url(${GothamMedium}) format("woff2");
    font-display: swap;
  }
`;

function App() {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { currentTheme } = state;

  useEffect(() => {
    if (prefersReducedMotion) {
      transitionConfig.disabled = true;
    } else {
      transitionConfig.disabled = false;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prerender) {
      console.info(`%c${repoPrompt}`, 'font-size: 18px');
      document.body.removeAttribute('class');
      const markupComment = document.createComment(repoPrompt);
      document.documentElement.prepend(markupComment);
    }

    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: theme[storedTheme] });
  }, [storedTheme]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://codyb.co${pathname}`} />
        <link rel="preload" href={GothamBook} as="font" crossorigin="" />
        <link rel="preload" href={GothamMedium} as="font" crossorigin="" />
        <style>{fontStyles}</style>
      </Helmet>
      <GlobalStyles />
      <SkipToMain href="#MainContent">Skip to main content</SkipToMain>
      <Header location={location} />
      <TransitionGroup
        component={AppMainContent}
        tabIndex={-1}
        id="MainContent"
        role="main"
      >
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}
        >
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <AppPage status={status}>
                <Suspense fallback={<Fragment />}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/projects/modern" component={ProjectModern} />
                    <Route path="/projects/dtt" component={ProjectDevTechTools} />
                    <Route path="/projects/mystgang" component={ProjectMystGang} />
                    {/* <Route path="/articles" component={Articles} /> */}
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </AppPage>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
}

export const GlobalStyles = createGlobalStyle`
  :root {
    ${createThemeProperties(tokens.base)}

    @media (max-width: ${media.laptop}px) {
      ${createThemeProperties(tokens.laptop)}
    }

    @media (max-width: ${media.tablet}px) {
      ${createThemeProperties(tokens.tablet)}
    }

    @media (max-width: ${media.mobile}px) {
      ${createThemeProperties(tokens.mobile)}
    }

    @media (max-width: ${media.mobileSmall}px) {
      ${createThemeProperties(tokens.mobileSmall)}
    }
  }

  .dark {
    ${createThemeProperties(theme.dark)}
  }

  .light {
    ${createThemeProperties(theme.light)}
  }

  ${!prerender && css`
    body.light,
    body.dark,
    body {
      ${props => createThemeProperties(props.theme)}
    }
  `}

  html,
  body {
    box-sizing: border-box;
    font-family: var(--fontStack);
    font-weight: var(--fontWeightRegular);
    background: rgb(var(--rgbBackground));
    color: var(--colorTextBody);
    border: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::selection {
    background: rgb(var(--rgbAccent));
    color: rgb(var(--rgbBlack));
  }

  #root *,
  #root *::before,
  #root *::after {
    @media (prefers-reduced-motion: reduce) {
      animation-duration: 0s;
      animation-delay: 0s;
      transition-duration: 0s;
      transition-delay: 0s;
    }
  }
`;

const AppMainContent = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background: rgb(var(--rgbBackground));
  transition: background var(--durationM) ease;
  outline: none;
  display: grid;
  grid-template: 100% / 100%;
`;

const AppPage = styled.div`
  overflow-x: hidden;
  opacity: 0;
  grid-area: 1 / 1;
  transition: opacity var(--durationS) ease;

  ${props => (props.status === 'exiting' || props.status === 'entering') && css`
    opacity: 0;
  `}

  ${props => props.status === 'entered' && css`
    transition-duration: var(--durationL);
    transition-delay: var(--durationXS);
    opacity: 1;
  `}
`;

const SkipToMain = styled.a`
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  color: rgb(var(--rgbBackground));
  background: rgb(var(--rgbPrimary));
  z-index: 99;

  &:focus {
    padding: var(--spaceS) var(--spaceM);
    position: fixed;
    top: var(--spaceM);
    left: var(--spaceM);
    clip: auto;
    width: auto;
    height: auto;
    text-decoration: none;
    font-weight: var(--fontWeightMedium);
    line-height: 1;
    ${cornerClip(8)}
  }
`;

export default App;
