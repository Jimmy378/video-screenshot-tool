import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  position: fixed;
  :focus {
    outline: none;
  }
  cursor: pointer;
`;

const Flex = styled.div<{ isDrag: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: 3px dashed;
  outline-offset: -50px;
  outline-color: ${(p) => (p.isDrag ? "rgb(0, 0, 0, 1)" : "rgb(0, 0, 0, 0.5)")};
  color: ${(p) => (p.isDrag ? "black" : "grey")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

type Props = {
  selectFile(file: File): void;
};

const VideoDropzone: FC<Props> = ({ children, selectFile }) => {
  const onDrop = useCallback((acceptedFiles: []) => {
    acceptedFiles.forEach((file) => {
      selectFile(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    accept: "video/*",
    multiple: false,
    noClick: false,
  });

  return (
    <Container {...getRootProps()}>
      <Flex isDrag={isDragActive}>
        <Text>Drop video</Text>
      </Flex>
      <input {...getInputProps()} />
      {children}
    </Container>
  );
};

export default VideoDropzone;
