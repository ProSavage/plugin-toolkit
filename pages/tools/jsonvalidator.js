import styled from "styled-components";
import {useState, useEffect} from "react";
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs'
import "prismjs/components/prism-json"

export default function JSONValidator(props) {


    const [content, setContent] = useState(JSON.stringify(dummydata, null, 4))
    const [status, setStatus] = useState("Valid JSON.")

    useEffect(() => {
        validate(content)
    }, [content])

    const validate = async (string) => {
        try {
            JSON.parse(string);
            setStatus("Valid JSON.")
        } catch (e) {
           setStatus(e.name + ': ' + e.message)
        }
    }

    return <Wrapper>
        <h4>JSON Validator</h4>
        <p>Status: {status}</p>
        <CodeEditor
            value={content}
            onValueChange={code => setContent(code)}
            highlight={code => highlight(code, languages.json, "json")}
            padding={10}
        />

    </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

const CodeEditor = styled(Editor)`
  width: 80%;
  min-height: 500px;
  background: #f5f2f0;
  outline: none;
  border: 2px solid #eaeaea;
  border-radius: 5px;
  font-family: "Minecraft-Regular";
`





const dummydata = {
    someData: "cool string",
    someNumber: 5,
    someObject: {
        coolProperty: 42
    }
}