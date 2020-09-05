import styled from "styled-components";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";
import ConverterContainer from "./../../context/ConverterContext";
import { formatDistance } from "date-fns";

export default function FileUploadSection(props) {
  const converterContext = ConverterContainer.useContainer();

  // valid -> 0 needs to be validated
  // valid -> 1 validated
  // valid -> -1 not valid
  const setFile = (name, file) => {
    const files = converterContext.converterFiles;
    const datafile = { file, valid: 0 };
    files[name] = datafile;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      if (isValidJSON(text)) {
        datafile.valid = 1;
      } else {
        datafile.valid = -1;
      }
      const filesWhenValidated = converterContext.converterFiles;
      filesWhenValidated[name] = datafile;
      converterContext.setConverterFiles(filesWhenValidated);
      converterContext.setFiles(converterContext.files + 1);
    };
    reader.readAsText(file)
  };

  const getFileMetadata = (name, file, valid) => {
      if (valid === -1) {
          return <ContentWrapper>
              <HeaderText>
                  {name} is an invalid file.
              </HeaderText>
              <p>Please upload a valid JSON file.</p>
          </ContentWrapper>
      }
    return (
      <ContentWrapper>
        <HeaderText>{name} Data File</HeaderText>
        <p>Name: {file.name}</p>
        <p>
          Last Modified: {formatDistance(file.lastModifiedDate, new Date())} ago
        </p>
        <p>Size: {numberPrettyBytesSI(file.size)}</p>
      </ContentWrapper>
    );
  };

  const renderFileInput = (name) => {
    const file = converterContext.converterFiles[name];

    // just need to set to 0 if no file,
    let validState;
    if (file) {
      validState = file.valid;
    } else {
      validState = 0;
    }

    return (
      <Item key={name}>
        <FileInput
          valid={validState}
          name={`${name}.json`}
          onChange={(e) => {
            e.preventDefault();
            setFile(name, e.target.files[0]);
          }}
        >
          {file ? (
            getFileMetadata(name, file.file, validState)
          ) : (
            <p>Upload {name}.json from your Factions folder</p>
          )}
        </FileInput>
      </Item>
    );
  };

  const allValid = () => {
      const keys = Object.keys(converterContext.converterFiles)
      if (keys.length !== 3) return false;
      for (const key of keys) {
          if (converterContext.converterFiles[key].valid === -1) return false
      }
      return true;
    }

  return (
    <Wrapper>
      <Header>Upload Data Files</Header>
      <Container>
        {["Factions", "Fplayers", "Board"].map((file) => renderFileInput(file))}
      </Container>
      {allValid() && <Button onClick={() => {
          console.log("hit converter button")
          converterContext.setStarted(true)
          console.log(converterContext.started)
      }}>Convert</Button>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Header = styled.h2`
  font-weight: normal;
  font-size: 20px;
`;

const Container = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  padding: 5px 5px;
  min-width: 350px;
`;

const HeaderText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.025em;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const numberPrettyBytesSI = (num = 0, dec = 2) => {
  if (num < 1000) return num + " Bytes";
  num = ("0".repeat(((num += "").length * 2) % 3) + num).match(/.{3}/g);
  return (
    Number(num[0]) +
    "." +
    num[1].substring(0, dec) +
    " " +
    "  kMGTPEZY"[num.length] +
    "B"
  );
};

const isValidJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
