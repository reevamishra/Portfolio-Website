import { useState, useRef, useEffect, Suspense } from 'react';
import classNames from 'classnames';
import { Vector2 } from 'three';
import { useThree, Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSpring } from '@react-spring/core';
import { useInViewport, usePrefersReducedMotion } from 'hooks';
import portraitModelPath from 'assets/portrait.glb';
import './index.css';

const PortraitModel = ({ isInViewport, reduceMotion }) => {
  const { scene, invalidate } = useThree();
  const [rotation, setRotation] = useState();
  const pause = !isInViewport || reduceMotion;
  const gltf = useGLTF(portraitModelPath);

  useSpring({
    from: {
      x: 0,
      y: 0,
    },
    to: rotation,
    config: {
      mass: 8,
      friction: 80,
    },
    pause,
    onChange({ value }) {
      const { x, y } = value;
      scene.rotation.x = x;
      scene.rotation.y = y;

      invalidate();
    },
  });

  useEffect(() => {
    if (pause) return;

    const tempVector = new Vector2();

    const onMouseMove = ({ clientX, clientY }) => {
      const { innerWidth, innerHeight } = window;

      const position = {
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      };

      tempVector.set(position.y / 2, position.x / 2);

      const { x, y } = tempVector;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [pause]);

  return <primitive object={gltf.scene} position={[0, -1.62, 0]} />;
};

const Portrait = ({ className, show = true, noStyle, delay, ...rest }) => {
  const canvas = useRef();
  const isInViewport = useInViewport(canvas);
  const reduceMotion = usePrefersReducedMotion();
  const visible = show || isInViewport;

  useEffect(() => {
    if (!noStyle) return;

    canvas.current.parentNode.style = `--delay: ${delay}`;
  }, [noStyle, delay]);

  return (
    <Canvas
      className={classNames('portrait', className)}
      ref={canvas}
      role="img"
      aria-label="A 3D portrait of myself."
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ antialias: false }}
      camera={{ fov: 45, near: 0.5, far: 2.25, position: [0, 0, 0.75] }}
      style={{ '--delay': delay }}
      {...rest}
    >
      <ambientLight intensity={0.2} />
      <spotLight intensity={2.2} angle={0.1} penumbra={1} position={[5, 2, 5]} />
      <spotLight intensity={2.4} angle={0.1} penumbra={1} position={[5, 2, 10]} />
      {visible && (
        <Suspense fallback={null}>
          <PortraitModel isInViewport={isInViewport} reduceMotion={reduceMotion} />
        </Suspense>
      )}
    </Canvas>
  );
};

export default Portrait;
