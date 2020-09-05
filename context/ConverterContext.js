import { createContainer } from "unstated-next";
import { useState } from "react";

function useConverter() {
  let [selectedPlugin, setSelectedPlugin] = useState("");
  let [files, setFiles] = useState(0);
  let [converterFiles, setConverterFiles] = useState({});
  let [started, setStarted] = useState(false);

  let getSelectedPlugin = () => {
    if (selectedPlugin === "") return undefined;
    return selectedPlugin;
  };

  return {
    converterFiles,
    getSelectedPlugin,
    setSelectedPlugin,
    setConverterFiles,
    files,
    setFiles,
    started,
    setStarted
  };
}

const ConverterContainer = createContainer(useConverter);

export default ConverterContainer;
