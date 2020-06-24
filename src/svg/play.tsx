import React from 'react';
import styled from 'styled-components';

const Polygon = styled.polygon`
  fill: none;
  stroke-miterlimit: 10;
  fill-rule: evenodd;
`;

type Props = {};

export const Play: React.FC<Props> = () => {
  return (
    <g>
      <Polygon points="16.2 37.3 37.9 25 16.2 12.7 16.2 37.3" />
    </g>
  );
};
