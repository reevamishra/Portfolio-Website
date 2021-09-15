import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectSectionHeading,
} from 'components/ProjectLayout';
import { useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import dtt from 'assets/dtt.jpg';
import dttLarge from 'assets/dtt-large.jpg';
import dttPlaceholder from 'assets/dtt-placeholder.jpg';

const title = 'DevTech Tools';
const description = 'Creating the ultimate productivity platform.';
const roles = ['Research', 'UX and UI Design', 'Full Stack Development'];

const ProjectDTT = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>Projects | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer>
        <ProjectHeader title={title} description={description} roles={roles} />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${dtt} 1280w, ${dttLarge} 2560w`}
              placeholder={dttPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Landing page of DevTech Tools."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectDTT;
