import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import styled from 'styled-components/native';
import {theme} from '../../styles/theme';

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.headerSimple.background,
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    elevation: 30,
  },
  arrowGoBack: {
    marginRight: 0,
  },
});

const Container = styled.View``;

const Title = styled.Text`
  font-size: 18px;
`;

interface Props {
  title?: string;
  goBack?: () => void;
}

const header = (props: Props) => {
  const goBack = () => {
    try {
      if (props.goBack) {
        props.goBack();
      }
    } catch (err) {}
  };

  return (
    <>
      <Container>
        <Appbar.Header style={styles.header}>
          {props.goBack && (
            <Appbar.BackAction
              style={styles.arrowGoBack}
              color={theme.colors.headerSimple.arrowGoBack}
              onPress={() => goBack()}
            />
          )}
          <Appbar.Content
            color={theme.colors.headerSimple.content}
            title={<Title>{props.title}</Title>}
          />
        </Appbar.Header>
      </Container>
    </>
  );
};

export default header;
