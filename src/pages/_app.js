import { lazy, Suspense, useEffect, createContext, useReducer, Fragment } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import ThemeProvider from 'components/ThemeProvider';
import VisuallyHidden from 'components/VisuallyHidden';
import { tokens } from 'components/ThemeProvider/theme';
import { msToNum } from 'utils/style';
import { useLocalStorage } from 'hooks';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './reset.css';
import './index.css';

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const ProjectDM = lazy(() => import('pages/DeviceModels'));
const ProjectDTT = lazy(() => import('pages/DevTechTools'));
const Articles = lazy(() => import('pages/Articles'));
const Page404 = lazy(() => import('pages/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const repoPrompt = `\u00A9 2017-${new Date().getFullYear()} Cody Bennett\n\nCheck out the source code: https://github.com/CodyJasonBennett/portfolio`;

const App = () => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(
    (state, action) => {
      const { type, value } = action;

      switch (type) {
        case 'setTheme':
          return { ...state, theme: value };
        case 'toggleTheme': {
          const newThemeId = state.theme === 'dark' ? 'light' : 'dark';
          return { ...state, theme: newThemeId };
        }
        case 'toggleMenu':
          return { ...state, menuOpen: !state.menuOpen };
        default:
          throw new Error();
      }
    },
    {
      menuOpen: false,
      theme: 'dark',
    }
  );

  useEffect(() => {
    if (!prerender) {
      console.info(`${repoPrompt}\n\n`);
    }

    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://codyb.co${pathname}`} />
      </Helmet>
      <VisuallyHidden showOnFocus as="a" className="skip-to-main" href="#MainContent">
        Skip to main content
      </VisuallyHidden>
      <Navbar location={location} />
      <TransitionGroup component="main" className="app" tabIndex={-1} id="MainContent">
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}
        >
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <div className={classNames('app__page', `app__page--${status}`)}>
                <Suspense fallback={<Fragment />}>
                  <Routes key={pathname} location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/projects/device-models" element={<ProjectDM />} />
                    <Route path="/projects/devtech-tools" element={<ProjectDTT />} />
                    <Route path="/articles/*" element={<Articles />} />
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </Suspense>
              </div>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
};

// Disable SSR globally
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
