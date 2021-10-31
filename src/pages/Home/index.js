import { useState, useEffect, useRef } from 'react';
import SEO from 'components/SEO';
import Intro from './Intro';
import ProjectSummary from './ProjectSummary';
import Profile from './Profile';
import Footer from 'components/Footer';
import { useSmoothScroll } from 'hooks';
import deviceModelsTexture from 'assets/device-models-phone.jpg';
import deviceModelsTextureLarge from 'assets/device-models-phone-large.jpg';
import deviceModelsTexturePlaceholder from 'assets/device-models-phone-placeholder.jpg';
import dttTexture from 'assets/dtt.jpg';
import dttTextureLarge from 'assets/dtt-large.jpg';
import dttTexturePlaceholder from 'assets/dtt-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import portrait from 'assets/portrait.glb';
import './index.css';

const title = 'Cody Bennett | Designer + Developer';
const description =
  'Portfolio of Cody Jason Bennett – a multidisciplinary designer & developer with a focus on motion and user experience.';

const disciplines = ['Developer', 'Creator', 'Animator', 'Illustrator', 'Musician'];

const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const about = useRef();
  useSmoothScroll(intro, projectOne, projectTwo, about);

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, about];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className="home">
      <SEO
        title={title}
        description={description}
        socialImage="https://codyb.co/social-image.png"
      >
        <link rel="prefetch" href={iphone11} as="fetch" crossOrigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossOrigin="" />
        <link rel="prefetch" href={portrait} as="fetch" crossOrigin="" />
      </SEO>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Device Models"
        description="Design and development of a Figma plugin to create mockups with 3D device models."
        buttonText="View Project"
        buttonLink="/projects/device-models"
        model={{
          type: 'phone',
          alt: "Device Model's default image",
          textures: [
            {
              src: deviceModelsTexture,
              srcSet: `${deviceModelsTexture} 254w, ${deviceModelsTextureLarge} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: deviceModelsTexture,
              srcSet: `${deviceModelsTexture} 254w, ${deviceModelsTextureLarge} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="DevTech Tools"
        description="Creating the ultimate productivity platform."
        buttonText="View Project"
        buttonLink="/projects/devtech-tools"
        model={{
          type: 'laptop',
          alt: 'DevTech Tools Landing Page',
          textures: [
            {
              src: dttTexture,
              srcSet: `${dttTexture} 800w, ${dttTextureLarge} 1440w`,
              placeholder: dttTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </div>
  );
};

export default Home;
