import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Character} from '../../../types/character';
import {Comic} from '../../../types/comic';
import {Event} from '../../../types/event';
import {Storie} from '../../../types/storie';
import {Serie} from '../../../types/serie';
import {Creator} from '../../../types/creator';
import {theme} from '../../styles/theme';
import {NavigationContainerRef} from '@react-navigation/native';

const MainContainer = styled.View`
  margin-horizontal: 15px;
  margin-top: 10px;
`;

const Container = styled.View`
  flex-direction: row;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-left: 10px;
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

const MoreDetails = styled.Text`
  margin-top: 2px;
  font-size: 16px;
  color: ${theme.colors.textSecondary};
`;

interface Props {
  title: string;
  list?: Character[] | Comic[] | Event[] | Storie[] | Serie[] | Creator[] | any;
  navigation: NavigationContainerRef;
}

const ListAux = (props: Props) => {
  const mountList = () => {
    let result = props.list?.map((item: any, index: number) => (
      <Container key={index}>
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => clickMoreDetails(item.resourceURI)}>
          <MoreDetails>{'Mais detalhes'}</MoreDetails>
        </TouchableOpacity>
      </Container>
    ));
    return result;
  };

  const clickMoreDetails = (resourceURI: string) => {
    if (props.title === 'Personagens') {
      props.navigation.navigate('DetailsCharacter', {resourceURI: resourceURI});
    } else if (props.title === 'Quadrinhos') {
      props.navigation.navigate('DetailsComic', {resourceURI: resourceURI});
    } else if (props.title === 'Criadores') {
      props.navigation.navigate('DetailsCreator', {resourceURI: resourceURI});
    } else if (props.title === 'Eventos') {
      props.navigation.navigate('DetailsEvent', {resourceURI: resourceURI});
    } else if (props.title === 'História') {
      props.navigation.navigate('DetailsStorie', {resourceURI: resourceURI});
    } else if (props.title === 'Séries') {
      props.navigation.navigate('DetailsSerie', {resourceURI: resourceURI});
    }
  };

  return (
    <MainContainer>
      <Title>{props.title}:</Title>
      {mountList()}
    </MainContainer>
  );
};

export default ListAux;
