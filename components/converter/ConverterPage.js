import styled from "styled-components";
import ConverterContainer from "./../../context/ConverterContext";
import PluginSelectionSection from "../../components/converter/PluginSelectionSection";
import FileUploadSection from "../../components/converter/FileUploadSection";
import ResultsSection from "./ResultsSection";
import Head from "next/head";

export default function ConverterPage(props) {
    return (
        <Wrapper>
            <Head>
                <title>FactionsX Converter</title>
            </Head>
            <ContentContainer>
                <ConverterContainer.Provider>
                    <PluginSelectionSection/>
                    <FileUploadSection/>
                    <ResultsSection/>
                </ConverterContainer.Provider>
            </ContentContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  background:  #ffa439;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100%;
`;

const ContentContainer = styled.div`
  background: white;
  padding: 100px;
  border-radius: 12px;
  border: 4px solid #eaeaea;

`
