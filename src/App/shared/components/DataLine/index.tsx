import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  margin-horizontal: 15px;
  margin-top: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const Text = styled.Text`
  margin-top: 2px;
  font-size: 16px;
  flex: 1;
`;

interface Props {
  title: string;
  text?: string;
}

const DataLine = (props: Props) => {
  return (
    <Container>
      <Title>{props.title}:</Title>
      <Text>{props.text ? props.text : ''}</Text>
    </Container>
  );
};

export default DataLine;
