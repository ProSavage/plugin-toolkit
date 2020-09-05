import styled from "styled-components";
import ConverterContainer from "./../../context/ConverterContext";
import PluginSelectionSection from "../../components/converter/PluginSelectionSection";
import FileUploadSection from "../../components/converter/FileUploadSection";
import ResultsSection from "./ResultsSection";

export default function ConverterPage(props) {
  return (
    <Wrapper>
      <ConverterContainer.Provider>
        <PluginSelectionSection />
        <FileUploadSection />
        <ResultsSection/>
      </ConverterContainer.Provider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 50px;

  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
