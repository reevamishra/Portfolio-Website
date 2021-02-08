import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'components/Image';
import Link from 'components/Link';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectBackground,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectSectionHeading,
  ProjectSectionColumns,
  ProjectTextRow,
  ProjectSectionText,
} from 'components/ProjectLayout';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext, useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import prerender from 'utils/prerender';
import deviceModelsBackground from 'assets/device-models-background.jpg';
import deviceModelsBackgroundLarge from 'assets/device-models-background-large.jpg';
import deviceModelsBackgroundPlaceholder from 'assets/device-models-background-placeholder.jpg';
import deviceModels from 'assets/device-models.jpg';
import deviceModelsLarge from 'assets/device-models-large.jpg';
import deviceModelsPlaceholder from 'assets/device-models-placeholder.jpg';
import deviceModelsBranding from 'assets/device-models-branding.png';
import deviceModelsBrandingLarge from 'assets/device-models-branding-large.png';
import deviceModelsBrandingPlaceholder from 'assets/device-models-branding-placeholder.png';
import deviceModelsComponentsDark from 'assets/device-models-components-dark.jpg';
import deviceModelsComponentsDarkLarge from 'assets/device-models-components-dark-large.jpg';
import deviceModelsComponentsDarkPlaceholder from 'assets/device-models-components-dark-placeholder.jpg';
import deviceModelsComponentsLight from 'assets/device-models-components-light.jpg';
import deviceModelsComponentsLightLarge from 'assets/device-models-components-light-large.jpg';
import deviceModelsComponentsLightPlaceholder from 'assets/device-models-components-light-placeholder.jpg';
import deviceModelsLanding from 'assets/device-models-landing.jpg';
import deviceModelsLandingLarge from 'assets/device-models-landing-large.jpg';
import deviceModelsLandingPlaceholder from 'assets/device-models-landing-placeholder.jpg';

const title = 'Device Models';
const description =
  'Design and development of a Figma plugin to create mockups with 3D device models.';
const roles = ['Visual Identity', 'UX and UI Design', 'Front-end & App Development'];

const ProjectDM = () => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  useScrollRestore();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Projects | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${deviceModelsBackground} 1080w, ${deviceModelsBackgroundLarge} 2160w`}
          placeholder={deviceModelsBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://devicemodels.com"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${deviceModels} 1280w, ${deviceModelsLarge} 2560w`}
              placeholder={deviceModelsPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Device Models plugin interface."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                I complimented the 3D feel of Device Models with a low poly monogram and
                bright, modern colors. The typeface and accents matched while remaining
                consistent with Figma's design system.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${deviceModelsBranding} 400w, ${deviceModelsBrandingLarge} 898w`}
              placeholder={deviceModelsBrandingPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The Device Models color palette and logo, featuring a low poly monogram to convey its 3D allure."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={themeId}
              srcSet={`${
                isDark ? deviceModelsComponentsDark : deviceModelsComponentsLight
              } 800w, ${
                isDark
                  ? deviceModelsComponentsDarkLarge
                  : deviceModelsComponentsLightLarge
              } 1000w`}
              placeholder={
                isDark
                  ? deviceModelsComponentsDarkPlaceholder
                  : deviceModelsComponentsLightPlaceholder
              }
              alt={`A set of ${themeId} themed components for the Device Models design system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(themeId)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>Design and Development</ProjectSectionHeading>
              <ProjectSectionText>
                Ranging from promotional material to a website and its software, I had to
                keep Device Models' look and feel consistent.
              </ProjectSectionText>
              <ProjectSectionText>
                Keeping to a universal,{' '}
                <Link href="https://storybook.devicemodels.com">
                  component-based design
                </Link>
                , this would inform both the aesthetics and user experience across the
                board.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Time to Launch</ProjectSectionHeading>
              <ProjectSectionText>
                With the launch of Device Models on Figma, it needed an online presence. I
                designed and developed a minimal introduction to what was to offer with
                clean and tidy interactions.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${deviceModelsLanding} 1280w, ${deviceModelsLandingLarge} 2560w`}
              placeholder={deviceModelsLandingPlaceholder}
              alt="A screenshot of the landing page in production."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectDM;
