import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const chars = [
  'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z',
];

function shuffle(content, chars, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: 'actual', value };
    }

    const rand = Math.floor(Math.random() * chars.length);
    return { type: 'code', value: chars[rand] };
  });
};

function DecoderText(props) {
  const { text, start, offset = 100, delay = 300, fps = 24, ...rest } = props;
  const [position, setPosition] = useState(0);
  const [started, setStarted] = useState(false);
  const [output, setOutput] = useState([{ type: 'code', value: '' }]);
  const content = useRef(text.split(''));
  const startTime = useRef(0);
  const elapsedTime = useRef(0);

  useEffect(() => {
    let timeout;

    if (start && !started) {
      timeout = setTimeout(() => {
        startTime.current = Date.now();
        elapsedTime.current = 0;
        setStarted(true);
      }, delay);
    }

    return function cleanUp() {
      clearTimeout(timeout);
    };
  }, [delay, start, started]);

  useEffect(() => {
    let animation;

    const animate = () => {
      if (!started) return;
      const elapsed = Date.now() - startTime.current;
      const deltaTime = elapsed - elapsedTime.current;
      const needsUpdate = 1000 / fps <= deltaTime;

      if (needsUpdate) {
        elapsedTime.current = elapsed;
        setPosition(elapsedTime.current / offset);

        if (position <= content.current.length) {
          setOutput(shuffle(content.current, chars, position));
        }
      } else {
        animation = requestAnimationFrame(animate);
      }
    };

    animation = requestAnimationFrame(animate);

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [fps, offset, position, started]);

  return (
    <span {...rest}>
      <DecoderLabel>{text}</DecoderLabel>
      {output.map((item, index) => item.type === 'actual'
        ? <span aria-hidden key={`${item.value}-${index}`}>{item.value}</span>
        : <DecoderCode aria-hidden key={`${item.value}-${index}`}>{item.value}</DecoderCode>
      )}
    </span>
  );
};

const DecoderLabel = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

const DecoderCode = styled.span`
  opacity: 0.8;
  font-weight: 400;
  font-family: 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'Hiragino Sans', Osaka, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  line-height: 0;
`;

export default React.memo(DecoderText);
