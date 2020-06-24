import React from 'react';
import styled from 'styled-components';

const Circle = styled.circle`
  fill: none;
  stroke-miterlimit: 10;
`;

const Path = styled.path`
  fill: none;
  stroke-miterlimit: 10;
`;

const Polyline = styled.polyline`
  fill: none;
  stroke-miterlimit: 10;
`;

const Rect = styled.rect`
  fill: none;
  stroke-miterlimit: 10;
`;

type Props = {};

export const Screenshot: React.FC<Props> = () => {
  return (
    <g>
      <Circle cx="25" cy="26.5" r="7.7" />
      <Path d="M38.5,20.7H30.1a7.8,7.8,0,0,0-10.2,0H11.5V32.3h8.4a7.5,7.5,0,0,0,10.2,0h8.4Z" />
      <Polyline points="38.5 20.6 38.5 16 11.5 16 11.5 20.6" />
      <Polyline points="11.5 32.3 11.5 37 38.5 37 38.5 32.3" />
      <Rect x="11.5" y="13" width="6.3" height="3" />
      <Circle cx="25" cy="26.5" r="7.7" />
    </g>
  );
};
