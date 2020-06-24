import React, { useEffect } from "react";
import styled from "styled-components";

//icons
import { Play } from "../svg/play";
import { Screenshot } from "../svg/screenshot";
import { Pause } from "../svg/pause";

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const Inner = styled.g`
  stroke-width: 2px;
  stroke: white;
`;

const Outer = styled.g`
  stroke-width: 2px;
  stroke: white;
`;

const Polygon = styled.polygon`
  fill: none;
  stroke-miterlimit: 10;
`;

const Container = styled.div`
  min-height: 25px;
  min-width: 25px;
  height: 25px;
  width: 25px;
  box-sizing: border-box;
  cursor: pointer;
  :hover ${Inner} {
    stroke: rgb(220, 220, 220);
  }
  :hover ${Outer} {
    stroke: rgb(220, 220, 220);
  }
  :active ${Inner} {
    stroke: rgb(200, 200, 200);
  }
  :active ${Outer} {
    stroke: rgb(200, 200, 200);
  }
`;

type Props = {
  style: "play" | "screenshot" | "pause";
  onClick(): void;
};

export const Icon: React.FC<Props> = ({ style, onClick }) => {
  const switchIcon = (): JSX.Element => {
    switch (style) {
      case "play":
        return <Play />;

      case "pause":
        return <Pause />;

      case "screenshot":
        return <Screenshot />;

      default:
        return <Play />;
    }
  };

  return (
    <Container onClick={onClick}>
      <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <Inner>{switchIcon()}</Inner>
        <Outer>
          <Polygon points="25 0.5 0.5 0.5 0.5 49.5 49.5 49.5 49.5 0.5 25 0.5" />
        </Outer>
      </SVG>
    </Container>
  );
};
