import React from 'react';
import styled from 'styled-components';

const Line = styled.line`
  fill: none;
  stroke-miterlimit: 10;
`;

type Props = {};

export const Pause: React.FC<Props> = () => {
  return (
    <g>
      <Line x1="18.3" y1="11.5" x2="18.3" y2="38.5" />
      <Line x1="31.7" y1="11.5" x2="31.7" y2="38.5" />
    </g>
  );
};
