import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Icon } from "./Icon";
import styled from "styled-components";
import { VideoSlider } from "./Slider";
import path from "path";

const BGStyle = styled.div`
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Grid = styled.div`
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  max-width: 1000px;
  cursor: default;
`;

const Container = styled.div`
  grid-column: 1/-1;
  padding: 0;
  margin: 0;
`;

const TopBar = styled.div`
  display: flex;
  background-color: rgb(50, 50, 50);
  height: 40px;
  grid-column: 1/-1;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
`;

const Duration = styled.p`
  && {
    flex-shrink: 0;
    color: white;
    width: 200px;
  }
  user-select: all;
  cursor: text;
`;

const VidTitle = styled.p`
  && {
    text-align: right;
    color: white;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  user-select: all;
  cursor: text;
`;

const BottomBar = styled.div`
  display: flex;
  background-color: rgb(50, 50, 50);
  margin-top: -5px;
  height: 40px;
  grid-column: 1/-1;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1;
  transform: translateY(-2px);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  && {
    flex-grow: 1;
    height: 70%;
    width: 100%;
    padding: 0;
  }
`;

type Props = {
  fileName: string;
  url: string;
};

type LoadType = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

export const VideoPlayer: React.FC<Props> = ({ fileName, url }) => {
  const player = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [played, setPlayed] = useState(0);
  const [timeText, setTimeText] = useState("");

  const playHandle = () => {
    setPlaying(!playing);
  };

  const screenShot = async () => {
    const videoPlayer: HTMLVideoElement = (player.current! as ReactPlayer).getInternalPlayer() as HTMLVideoElement;
    var canvas = document.createElement("canvas");
    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;
    var ctx = canvas.getContext("2d");
    ctx!.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
    var dataURI = canvas.toDataURL("image/jpeg");

    let byteString = atob(dataURI.split(",")[1]);
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    let arrayBuffer = new ArrayBuffer(byteString.length);
    let _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    let dataView = new DataView(arrayBuffer);
    let blob = new Blob([dataView], { type: mimeString });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${path.basename(
      fileName,
      path.extname(fileName)
    )} - screenshot - ${timeText}.jpg`;

    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };

    a.addEventListener("click", clickHandler, false);

    a.click();
  };

  const secondsToTime = (seconds: number): string => {
    let secs = Math.round(seconds);
    let hours = Math.floor(secs / (60 * 60)).toString();

    let divisorForMins = secs % (60 * 60);
    let mins = Math.floor(divisorForMins / 60).toString();

    let divisorForSecs = divisorForMins % 60;
    let Seconds = Math.ceil(divisorForSecs).toString();

    return `${hours.length > 1 ? hours : `0${hours}`}:${
      mins.length > 1 ? mins : `0${mins}`
    }:${Seconds.length > 1 ? Seconds : `0${Seconds}`}`;
  };

  const loadHandle = (state: LoadType) => {
    setPlayed(state.played * 100);

    const currentlyPlayed: string = secondsToTime(
      Math.round(state.playedSeconds)
    );

    const currentDuration: string = secondsToTime(
      Math.round((player.current! as ReactPlayer).getDuration())
    );
    setTimeText(`${currentlyPlayed} - ${currentDuration}`);
  };

  const onTouch = (value: number) => {
    (player.current! as ReactPlayer).seekTo(value / 100);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <a id="download" />
      <BGStyle>
        <Grid onClick={stopPropagation}>
          <TopBar>
            <Duration>{timeText}</Duration>
            <div style={{ width: "10px" }} />
            <VidTitle>{fileName}</VidTitle>
          </TopBar>
          <Container>
            <ReactPlayer
              url={url}
              playing={playing}
              width="100%"
              height="100%"
              onProgress={loadHandle}
              ref={player}
              progressInterval={100}
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous",
                  },
                },
              }}
            />
          </Container>
          <BottomBar>
            {playing ? (
              <Icon style={"pause"} onClick={playHandle} />
            ) : (
              <Icon style={"play"} onClick={playHandle} />
            )}
            <div style={{ width: "10px" }} />
            <SliderContainer>
              <VideoSlider
                height={"100%"}
                onClick={onTouch}
                position={played}
              />
            </SliderContainer>
            <div style={{ width: "10px" }} />
            <Icon style={"screenshot"} onClick={screenShot} />
          </BottomBar>
        </Grid>
      </BGStyle>
    </>
  );
};
