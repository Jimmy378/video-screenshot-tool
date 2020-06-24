import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div<{ height: string }>`
  width: 100%;
  box-sizing: border-box;
  height: ${(p) => p.height};
  position: relative;
  background-color: rgb(80, 80, 80);
`;

const Slider = styled.input`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  height: 100%;
  outline: none;
  background-color: transparent;
  ::-webkit-slider-thumb {
    opacity: 0;
  }
  position: relative;
  box-sizing: border-box;
`;

const Loaded = styled.div<{ value: number }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(200, 200, 200);
  box-sizing: border-box;
  transform: scaleX(${(p) => p.value});
  transform-origin: left;
`;

const Buffered = styled.div<{ value: number }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(230, 230, 230);
  box-sizing: border-box;
  transform: scaleX(${(p) => p.value});
  transform-origin: left;
`;

type Props = {
  height: string;
  position: number;
  onClick(value: number): void;
};

export const VideoSlider: React.FC<Props> = ({ height, position, onClick }) => {
  const [value, setValue] = useState(0);

  const sliderUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  useEffect(() => {
    onClick(value);
  }, [value]);

  return (
    <Container height={height}>
      <Loaded value={position / 100} />
      <Slider
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={sliderUpdate}
      />
    </Container>
  );
};
