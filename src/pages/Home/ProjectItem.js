import React, { Fragment, memo } from 'react';
import styled, { css } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { sectionPadding, media } from 'utils/style';
import { RouterButton, LinkButton } from 'components/Button';
import ProgressiveImage from 'components/ProgressiveImage';
import Divider from 'components/Divider';
import { useWindowSize } from 'hooks';
import phone from 'assets/phone.png';
import phoneLarge from 'assets/phone-large.png';
import phonePlaceholder from 'assets/phone-placeholder.png';
import { reflow } from 'utils/transition';

function ProjectItem({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  imageSrc,
  imageAlt,
  imageType,
  imagePlaceholder,
  buttonText,
  buttonLink,
  buttonTo,
  alternate,
  ...rest
}) {
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;

  const renderDetails = (status) => (
    <ProjectItemDetails>
      <ProjectItemIndex aria-hidden>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        />
        <ProjectItemIndexNumber status={status}>{index}</ProjectItemIndexNumber>
      </ProjectItemIndex>
      <ProjectItemTitle id={titleId} status={status}>{title}</ProjectItemTitle>
      <ProjectItemDescription status={status}>{description}</ProjectItemDescription>
      <ProjectItemButton status={status}>
        {buttonLink &&
          <LinkButton
            iconHoverShift
            href={buttonLink}
            target="_blank"
            iconRight="arrowRight"
          >
            {buttonText}
          </LinkButton>
        }
        {buttonTo &&
          <RouterButton
            iconHoverShift
            to={buttonTo}
            iconRight="arrowRight"
          >
            {buttonText}
          </RouterButton>
        }
      </ProjectItemButton>
    </ProjectItemDetails>
  );

  const renderPreview = (status) => (
    <ProjectItemPreview>
      {imageType === 'laptop' &&
        <ProjectItemPreviewContentLaptop>
          <ProjectItemImageLaptop
            status={status}
            srcSet={imageSrc[0]}
            alt={imageAlt[0]}
            placeholder={imagePlaceholder[0]}
            sizes={`(max-width: ${media.mobile}px) 300px,(max-width: ${media.tablet}px) 420px,(max-width: ${media.desktop}px) 860px, 900px`}
          />
        </ProjectItemPreviewContentLaptop>
      }
      {imageType === 'phone' &&
        <ProjectItemPreviewContentPhone>
          {imageSrc?.map((src, index) => (
            <ProjectItemPhone first={index === 0} status={status} key={`img_${index}`}>
              <ProjectItemPhoneFrame
                srcSet={`${phone} 414w, ${phoneLarge} 828w`}
                sizes={`(max-width: ${media.tablet}px) 248px, 414px`}
                alt=""
                role="presentation"
                placeholder={phonePlaceholder}
              />
              <ProjectItemPhoneImage
                srcSet={imageSrc[index]}
                alt={imageAlt[index]}
                placeholder={imagePlaceholder[index]}
                sizes={`(max-width: ${media.tablet}px) 152px, 254px`}
              />
            </ProjectItemPhone>
          ))}
        </ProjectItemPreviewContentPhone>
      }
    </ProjectItemPreview>
  );

  return (
    <ProjectItemSection
      aria-labelledby={titleId}
      index={index}
      ref={sectionRef}
      id={id}
      alternate={alternate}
      tabIndex={-1}
      {...rest}
    >
      <ProjectItemContent>
        <Transition
          in={visible}
          timeout={0}
          onEnter={reflow}
        >
          {status => (
            <Fragment>
              {!alternate && !isMobile &&
                <Fragment>
                  {renderDetails(status)}
                  {renderPreview(status)}
                </Fragment>
              }
              {(alternate || isMobile) &&
                <Fragment>
                  {renderPreview(status)}
                  {renderDetails(status)}
                </Fragment>
              }
            </Fragment>
          )}
        </Transition>
      </ProjectItemContent>
    </ProjectItemSection>
  );
}

const ProjectItemContent = styled.div`
  width: 100%;
  max-width: var(--maxWidthL);
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 43% 55%;
  grid-column-gap: 2%;

  @media (max-width: 1245px) {
    grid-template-columns: 50% 50%;
  }

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 100%;
    flex-direction: column-reverse;
    height: auto;
  }
`;

const ProjectItemDetails = styled.div`
  flex: 0 0 410px;
  max-width: 410px;
  z-index: 1;
  position: relative;

  @media (max-width: ${media.tablet}px) {
    flex: 0 0 auto;
    max-width: 410px;
    grid-row: 2;
    grid-column: 1;
    justify-self: center;
  }
`;

const ProjectItemSection = styled.section`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  padding-right: 80px;
  padding-bottom: var(--spaceL);
  padding-left: 220px;
  margin-top: ${props => (props.index === '01' ? '0' : '120px')};
  margin-bottom: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  ${sectionPadding}

  @media (min-width: ${media.desktop}px) {
    margin-bottom: 0;
    margin-top: 0;
  }

  @media (max-width: ${media.tablet}px) {
    height: auto;
    margin-top: ${props => (props.index === '01' ? '0' : '60px')};
    margin-bottom: 60px;
  }

  @media (max-width: ${media.mobile}px) {
    padding-bottom: var(--space4XL);
    margin-bottom: 0;
    overflow-x: hidden;
  }

  ${props => props.alternate && css`
    ${ProjectItemContent} {
      grid-template-columns: 55% 40%;

      @media (max-width: ${media.tablet}px) {
        grid-template-columns: 100%;
      }
    }
  `}
`;

const ProjectItemPreview = styled.div`
  flex: 0 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ProjectItemPreviewContentPhone = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const ProjectItemPreviewContentLaptop = styled.div`
  position: relative;

  @media (max-width: ${media.tablet}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ProjectItemIndex = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-gap: var(--spaceM);
  align-items: center;
  margin-bottom: var(--spaceXL);
`;

const ProjectItemIndexNumber = styled.span`
  font-size: var(--fontSizeBodyS);
  font-weight: var(--fontWeightMedium);
  color: rgb(var(--rgbPrimary));
  transform: translateX(calc(var(--spaceM) * -1));
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-duration: var(--durationM);
  transition-delay: 1.3s;

  ${props => props.status === 'entered' && css`
    transform: translateX(0);
    opacity: 1;
  `}
`;

const ProjectItemTitle = styled.h2`
  font-size: var(--fontSizeH2);
  font-weight: var(--fontWeightMedium);
  color: var(--colorTextTitle);
  line-height: var(--lineHeightTitle);
  margin: 0 0 var(--spaceL) 0;
  padding: 0;
  transition-property: transform, opacity;
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-duration: var(--durationXL);
  transition-delay: var(--durationM);
  transform: translate3d(0, var(--spaceL), 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemDescription = styled.p`
  font-size: var(--fontSizeBodyL);
  line-height: var(--lineHeightBody);
  color: var(--colorTextBody);
  font-weight: var(--fontWeightRegular);
  margin: 0 0 var(--spaceXL) 0;
  transition-property: transform, opacity;
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-duration: var(--durationXL);
  transition-delay: var(--durationL);
  transform: translate3d(0, var(--spaceL), 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemButton = styled.div`
  transition-property: transform, opacity;
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-duration: var(--durationXL);
  transition-delay: var(--durationXL);
  transform: translate3d(0, var(--spaceL), 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemImageLaptop = styled(ProgressiveImage)`
  width: 862px;
  height: 531px;
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-delay: var(--durationM);
  transition-timing-function: var(--bezierFastoutSlowin);
  transform: translate3d(var(--spaceL), 0, 0);
  opacity: 0;
  position: relative;
  right: -140px;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.theme.themeId === 'light' && css`
    z-index: 1;
  `}

  @media(min-width: 1440px) {
    width: 880px;
    height: 542px;
  }

  @media (max-width: ${media.laptop}px) {
    width: 761px;
    height: 491px;
  }

  @media (max-width: ${media.tablet}px) {
    width: 420px;
    height: 258px;
    margin-bottom: var(--space5XL);
    right: 0;
  }

  @media (max-width: ${media.mobile}px) {
    width: 336px;
    height: 206px;
    margin-bottom: var(--space3XL);
  }
`;

const ProjectItemPhone = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition-duration: 1s;
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-property: transform, opacity;
  width: 100%;
  max-width: 100%;
  flex: 1 0 100%;

  ${props => props.first
    ? css`
        left: calc(50% - 140px);
        top: -120px;
        transform: translate3d(0, 80px, 0);
        transition-delay: 0s;

        @media (max-width: ${media.tablet}px) {
          left: calc(50% - 48px);
          top: -60px;
        }
      `
    : css`
        left: calc(-50% + 20px);
        top: 120px;
        transform: translate3d(0, 80px, 0);
        transition-delay: 0.2s;

        @media (max-width: ${media.tablet}px) {
          left: calc(-50% + var(--spaceL));
          top: 60px;
        }
      `}

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemPhoneFrame = styled(ProgressiveImage)`
  position: absolute;
  width: 414px;
  height: 721px;

  @media (max-width: ${media.tablet}px) {
    width: 248px;
    height: 431px;
  }
`;

const ProjectItemPhoneImage = styled(ProgressiveImage)`
  box-shadow: 0 0 0 2px #1c1c1c;
  position: relative;
  top: -14px;
  width: 254px;
  height: 452px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${media.tablet}px) {
    box-shadow: 0 0 0 1px #1c1c1c;
    width: 152px;
    height: 270px;
    top: -9px;
  }
`;

export default memo(ProjectItem);
