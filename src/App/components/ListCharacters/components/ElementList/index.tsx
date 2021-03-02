import React from 'react';
import styled from 'styled-components/native';
import {theme} from '../../../../shared/styles/theme';

const MainView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
  margin-horizontal: 25px;
`;

const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const Text = styled.Text`
  font-size: 18px;
  margin-left: 20px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.textNameCharacter};
`;

const Line = styled.View`
  height: 1px;
  background: ${theme.colors.textTertiary};
  margin-left: 7px;
  margin-bottom: 18px;
`;

interface Props {
  name: string;
  image?: string;
}

const ElementList = (props: Props) => {
  return (
    <>
      <MainView>
        <Image
          source={{
            uri: props.image
              ? props.image
              : 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg',
          }}
        />
        <Text>{props.name}</Text>
      </MainView>
      <Line />
    </>
  );
};

export default ElementList;
