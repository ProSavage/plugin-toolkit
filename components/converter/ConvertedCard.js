import styled from "styled-components";
import Button from "../ui/Button";

export default function ConvertedCard(props) {
  const round = (num, decimalPlaces) => {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
  };

  const downloadObjectAsJson = (exportObj, exportName) => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj, null, 4));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <SubText>Took {round(props.time, 3)} nanoseconds</SubText>
      <SubText>{props.found}</SubText>
      <ButtonContainer>
        <Button secondary onClick={() => {
          downloadObjectAsJson(props.data, props.name)
        }}>Download</Button>
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  text-align: left;
  border: 2px solid #eaeaea;
  border-radius: 5px;

  margin-right: 15px;
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.025em;
`;

const SubText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.025em;
`;

const ButtonContainer = styled.div`
  padding: 5px 0;
`;
