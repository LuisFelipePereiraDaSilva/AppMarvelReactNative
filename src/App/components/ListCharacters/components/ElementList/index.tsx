import React, {useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainView: {
    elevation: 5,
  },
  image: {
    resizeMode: 'contain',
  },
});

const MainView = styled.View`
  width: ${width / 2 - 20}px;
  height: 210px;
  border-radius: 10px;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Image = styled.Image`
  margin-top: 10px;
  width: 80%;
  flex: 1;
`;

const Text = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;

interface Props {
  name: string;
  image?: string;
}

const ElementList = (props: Props) => {
  return (
    <>
      <MainView style={styles.mainView}>
        <Image
          source={{
            uri: props.image
              ? props.image
              : 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg',
          }}
        />
        <Text>{props.name}</Text>
      </MainView>
    </>
  );
};

export default ElementList;
