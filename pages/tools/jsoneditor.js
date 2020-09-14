import styled from "styled-components";
import {useState} from "react";
import Button from "../../components/ui/Button";

export default function JSONEditor(props) {

    const [data, setData] = useState(JSON.stringify(dummyData, null, 4))


    const renderGUI = () => {
        const JSONData = JSON.parse(data)
        const keys = Object.keys(JSONData, true);


        return keys.map(key => {
            const value = JSONData[key];
            return <Control>
                <p>{key}</p>
                <input type={"text"} value={value} />
            </Control>
        })
    }

    return <Wrapper>
        <h3>Enter Data:</h3>
        <DataEntry value={data} onChange={(e) => setData(e.target.value)}/>

        <GUIContainer>
            <h3>Renderer</h3>
            {renderGUI()}
        </GUIContainer>

    </Wrapper>
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

const DataEntry = styled.textarea`
  width: 80%;
  min-height: 300px;
`

const GUIContainer = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const dummyData = {
    someData: "string",
    someNumber: 1
}

const Control = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

`