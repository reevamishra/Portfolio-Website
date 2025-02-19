import React, { Suspense, lazy, useMemo, useEffect, useState, Fragment, memo } from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components/macro';
import { TransitionGroup, Transition } from 'react-transition-group';
import { AnimFade, sectionPadding, media } from 'utils/style';
import DecoderText from 'components/DecoderText';
import Icon from 'components/Icon';
import { useInterval, usePrevious, useWindowSize } from 'hooks';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import { pxToRem, tokens } from 'app/theme';

const DisplacementSphere = lazy(() => import('components/DisplacementSphere'));

function Intro(props) {
  const theme = useTheme();
  const { id, sectionRef, disciplines, scrollIndicatorHidden, ...rest } = props;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const windowSize = useWindowSize();
  const prevTheme = usePrevious(theme);
  const introLabel = useMemo(() => [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(', and '), [disciplines]);
  const currentDisciplines = useMemo(() => disciplines.filter((item, index) => index === disciplineIndex), [disciplineIndex, disciplines]);
  const titleId = `${id}-title`;

  useInterval(() => {
    const index = (disciplineIndex + 1) % disciplines.length;
    setDisciplineIndex(index);
  }, 5000, theme.themeId);

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  return (
    <IntroContent
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition
        key={theme.themeId}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
        onEnter={reflow}
      >
        {status => (
          <Fragment>
            {!prerender &&
              <Suspense fallback={null}>
                <DisplacementSphere />
              </Suspense>
            }
            <IntroText>
              <IntroName status={status} id={titleId}>
                <DecoderText text="Namita Dash" start={!prerender} offset={120} />
              </IntroName>
              <IntroTitle>
                <IntroTitleLabel>{`Architect + ${introLabel}`}</IntroTitleLabel>
                <IntroTitleRow aria-hidden prerender={prerender}>
                  <IntroTitleWord status={status} delay={tokens.base.durationXS}>Architect</IntroTitleWord>
                  <IntroTitleLine status={status} />
                </IntroTitleRow>
                <TransitionGroup component={IntroTitleRow} prerender={prerender}>
                  {currentDisciplines.map((item, index) => (
                    <Transition
                      appear
                      timeout={{ enter: 3000, exit: 2000 }}
                      key={item}
                      onEnter={reflow}
                    >
                      {wordStatus => (
                        <IntroTitleWord
                          plus
                          aria-hidden
                          delay={tokens.base.durationL}
                          status={wordStatus}
                        >
                          {item}
                        </IntroTitleWord>
                      )}
                    </Transition>
                  ))}
                </TransitionGroup>
              </IntroTitle>
            </IntroText>
            {windowSize.width > media.tablet &&
              <MemoizedScrollIndicator
                isHidden={scrollIndicatorHidden}
                status={status}
              />
            }
            {windowSize.width <= media.tablet &&
              <MemoizedMobileScrollIndicator
                isHidden={scrollIndicatorHidden}
                status={status}
              >
                <Icon icon="arrowDown" />
              </MemoizedMobileScrollIndicator>
            }
          </Fragment>
        )}
      </Transition>
    </IntroContent>
  );
}

const IntroContent = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  outline: none;
  ${sectionPadding}
`;

const IntroText = styled.header`
  max-width: 780px;
  width: 100%;
  position: relative;
  top: calc(var(--spaceL) * -1);

  @media (min-width: ${media.desktop}px) {
    max-width: 920px;
  }

  @media (max-width: ${media.mobile}px) {
    top: calc(var(--space3XL) * -1);
  }

  @media (max-width: 400px) {
    top: calc(var(--spaceXL) * -1);
  }

  @media ${media.mobileLS} {
    top: calc(var(--spaceM) * -1);
  }
`;

const IntroName = styled.h1`
  text-transform: uppercase;
  font-size: ${pxToRem(24)};
  letter-spacing: 0.3em;
  color: var(--colorTextBody);
  margin-bottom: var(--space2XL);
  margin-top: 0;
  font-weight: var(--fontWeightMedium);
  line-height: 1;
  opacity: 0;

  ${props => props.status === 'entering' && css`
    animation: ${css`${AnimFade} var(--durationL) ease 0.2s forwards`};
  `}

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  @media (min-width: ${media.desktop}px) {
    font-size: ${pxToRem(28)};
    margin-bottom: var(--space2XL);
  }

  @media (max-width: ${media.tablet}px) {
    font-size: ${pxToRem(18)};
    margin-bottom: var(--space2XL);
  }

  @media (max-width: ${media.mobile}px) {
    margin-bottom: 20px;
    letter-spacing: 0.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  @media ${media.mobileLS} {
    margin-bottom: 20px;
    margin-top: 30px;
  }
`;

const IntroTitle = styled.h2`
  display: flex;
  flex-direction: column;
  font-size: ${pxToRem(100)};
  margin: 0;
  letter-spacing: -0.005em;
  font-weight: var(--fontWeightMedium);

  @media (min-width: ${media.desktop}px) {
    font-size: ${pxToRem(120)};
  }

  @media (max-width: 860px) {
    font-size: ${pxToRem(80)};
  }

  @media (max-width: 600px) {
    font-size: ${pxToRem(56)};
  }

  @media (max-width: 400px) {
    font-size: ${pxToRem(42)};
  }
`;

const IntroTitleLabel = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

const IntroTitleRow = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  ${props => props.prerender && css`
    opacity: 0;
  `}
`;

const AnimTextReveal = keyframes`
  0% {
    color: rgb(var(--rgbText) / 0);
  }
  50% {
    color: rgb(var(--rgbText) / 0);
  }
  60% {
    color: var(--colorTextTitle);
  }
  100% {
    color: var(--colorTextTitle);
  }
`;

const AnimTextRevealMask = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
  }
  51% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: right;
  }
`;

const IntroTitleWord = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: var(--bezierFastoutSlowin);
  color: rgb(var(--rgbText) / 0);
  transition: opacity 0.5s ease 0.4s;

  ${props => props.status === 'entering' && css`
    animation-name: ${AnimTextReveal};
  `}

  ${props => props.status === 'entered' && css`
    color: var(--colorTextTitle);
  `}

  ${props => props.status === 'exiting' && css`
    color: var(--colorTextTitle);
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 0;
  `}

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background: rgb(var(--rgbAccent));
    opacity: 0;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function: var(--bezierFastoutSlowin);
    transform-origin: left;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    ${props => props.status === 'entering' && css`
      animation-name: ${AnimTextRevealMask};
    `}

    ${props => props.status === 'entered' && css`
      opacity: 1;
      transform: scaleX(0);
      transform-origin: right;
    `}
  }

  ${props => props.delay && css`
    animation-delay: ${props.delay};

    &::after {
      animation-delay: ${props.delay};
    }
  `}

  ${props => props.plus && css`
    &::before {
      content: '+';
      margin-right: 10px;
      opacity: 0.4;
    }
  `}
`;

const AnimLineIntro = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const IntroTitleLine = styled.span`
  content: '';
  height: 2px;
  background: rgb(var(--rgbText) / 0.3);
  width: 120%;
  display: flex;
  margin-left: 20px;
  animation-duration: 0.8s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: var(--bezierFastoutSlowin);
  transform-origin: left;
  opacity: 0;

  ${props => props.status === 'entering' && css`
    animation-name: ${AnimLineIntro};
  `}

  ${props => props.status === 'entered' && css`
    transform: scaleX(1);
    opacity: 1;
  `}
`;

const AnimScrollIndicator = keyframes`
  0% {
    transform: translate3d(-1px, 0, 0);
    opacity: 0;
  }
  20% {
    transform: translate3d(-1px, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(-1px, 8px, 0);
    opacity: 0;
  }
`;

const ScrollIndicator = styled.div`
  border: 2px solid rgb(var(--rgbText) / 0.4);
  border-radius: 20px;
  width: 26px;
  height: 38px;
  position: fixed;
  bottom: 64px;
  transition-property: opacity, transform;
  transition-duration: var(--durationL);
  transition-timing-function: ease;
  opacity: ${props => props.status === 'entered' && !props.isHidden ? 1 : 0};
  transform: translate3d(0, ${props => props.isHidden ? '20px' : 0}, 0);

  &::before {
    content: '';
    height: 7px;
    width: 2px;
    background: rgb(var(--rgbText) / 0.4);
    border-radius: 4px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-1px);
    animation: ${css`${AnimScrollIndicator} 2s ease infinite`};
  }

  @media ${media.mobileLS} {
    display: none;
  }
`;

const AnimMobileScrollIndicator = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MobileScrollIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  opacity: ${props => props.status === 'entered' && !props.isHidden ? 1 : 0};
  transform: translate3d(0, ${props => props.isHidden ? '20px' : 0}, 0);
  animation-name: ${AnimMobileScrollIndicator};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(.8, .1, .27, 1);
  transition-duration: var(--durationM);

  @media ${media.mobileLS} {
    display: none;
  }

  svg {
    stroke: rgb(var(--rgbText) / 0.5);
  }
`;

const MemoizedScrollIndicator = memo(ScrollIndicator);
const MemoizedMobileScrollIndicator = memo(MobileScrollIndicator);

export default memo(Intro);
