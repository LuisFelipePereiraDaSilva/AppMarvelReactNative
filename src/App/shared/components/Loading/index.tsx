import React from 'react';
import styled from 'styled-components/native';

const MainView = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
`;

const Text = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;

const Loading = () => {
  return (
    <MainView>
      <Text>Carregando Dados...</Text>
    </MainView>
  );
};

export default Loading;
