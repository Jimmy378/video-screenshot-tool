import React, { useState } from "react";
import Dropzone from "./components/Dropzone";
import { VideoPlayer } from "./components/Player";

function App() {
  const [file, setFile] = useState<File>();

  return (
    <Dropzone selectFile={setFile}>
      {file && (
        <VideoPlayer fileName={file.name} url={URL.createObjectURL(file)} />
      )}
    </Dropzone>
  );
}

export default App;
