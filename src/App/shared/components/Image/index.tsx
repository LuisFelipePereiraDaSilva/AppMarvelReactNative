import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});

const Image = styled.Image`
  height: 400px;
  width: 100%;
`;

interface Props {
  image?: string;
}

const ComponentImage = (props: Props) => {
  return <Image style={styles.image} source={{uri: props.image}} />;
};

export default ComponentImage;
