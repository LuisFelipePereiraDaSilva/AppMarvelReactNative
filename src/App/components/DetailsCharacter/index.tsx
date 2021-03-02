import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getCharacter} from '../../services/requests/character/characterMarvel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Character} from '../../types/character';
import {NavigationContainerRef} from '@react-navigation/native';
import DataLine from '../../shared/components/DataLine';
import Image from '../../shared/components/Image';
import ListAux from '../../shared/components/ListAux';
import {useDispatch} from 'react-redux';
import * as types from '../../redux/types';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

const MainView = styled.View`
  flex: 1;
`;

interface Props {
  navigation: NavigationContainerRef;

  route: {
    params: {
      resourceURI: string;
    };
  };
}

const DetailsCharacter = (props: Props) => {
  const dispatch = useDispatch();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    dispatch({type: types.SET_LOADING, payload: true});
    if (props.route?.params?.resourceURI) {
      getCharacter(props.route?.params?.resourceURI)
        .then((character) => {
          if (character) {
            setCharacter(character);
          } else {
            errorLoadData();
          }
        })
        .catch(() => {
          errorLoadData();
        })
        .finally(() => {
          dispatch({type: types.SET_LOADING, payload: false});
        });
    } else {
      errorLoadData();
    }
  }, [props]);

  const errorLoadData = () => {
    Alert.alert('Ocorreu um error ao carregar o personagem');
    props.navigation.goBack();
  };

  return (
    <>
      <MainView>
        <Header title={'Personagem'} goBack={() => props.navigation.goBack()} />
        {character && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <>
              <Image image={character.image} />
              <DataLine title={'Id'} text={character.id} />
              <DataLine title={'Nome'} text={character.name} />
              <DataLine title={'Descrição'} text={character.description} />
              <ListAux
                navigation={props.navigation}
                title={'Quadrinhos'}
                list={character.comics}
              />
              <ListAux
                navigation={props.navigation}
                title={'Séries'}
                list={character.series}
              />
              <ListAux
                navigation={props.navigation}
                title={'Histórias'}
                list={character.stories}
              />
              <ListAux
                navigation={props.navigation}
                title={'Eventos'}
                list={character.events}
              />
            </>
          </ScrollView>
        )}
      </MainView>
    </>
  );
};

export default DetailsCharacter;
