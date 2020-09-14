import styled from "styled-components";
import axios from "axios";
import {useEffect, useState} from "react";


export default function XMaterial(props) {
    const [search, setSearch] = useState("")
    const [xmaterials, setXmaterials] = useState([])
    useEffect(() => {
        axios.get("/api/xmaterials").then(res => setXmaterials(res.data))
    }, [])
    const renderableXMaterials = () => {
        if (search === "") return xmaterials;
        let term = search.toLowerCase();
        return xmaterials.filter(name => name.niceName.toLowerCase().includes(term))
    }
    return <Wrapper>
        <Input placeholder={"Search for a material."} type={"text"} value={search} onChange={(e) => setSearch(e.target.value)}/>
        <Container>
            {renderableXMaterials().map(material => <Card>
                <Content>
                    <p>Name: {material.niceName}</p>
                    <Row>
                        <p>ID: {material.ID}</p>
                        <CopyText>Copy</CopyText>
                    </Row>
                </Content>
            </Card>)}
        </Container>
    </Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`


const Card = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 350px;
    margin: 10px;
    border: 2px solid #eaeaea;
    border-radius: 5px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const CopyText = styled.p`
  border: 2px dashed #eaeaea;
  border-radius: 5px;
  padding: 0 5px;
  margin-left: 10px;
  
  
  &:hover {
   border: 2px solid #06d6a0;
  }
`
const Row = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  padding: 10px;
  width: 350px;
  border: 4px solid #eaeaea;
  border-radius: 5px;
   outline: none;
   &:hover, &:focus {
   border: 4px solid #06d6a0;
  }
`