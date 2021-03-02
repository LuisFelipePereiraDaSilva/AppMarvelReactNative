import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getComic} from '../../services/requests/comic/comicMarvel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Comic} from '../../types/comic';
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

  route?: {
    params?: {
      resourceURI?: string;
    };
  };
}

const DetailsComic = (props: Props) => {
  const dispatch = useDispatch();
  const [comic, setComic] = useState<Comic>();

  useEffect(() => {
    dispatch({type: types.SET_LOADING, payload: true});
    if (props.route?.params?.resourceURI) {
      getComic(props.route?.params?.resourceURI)
        .then((comic) => {
          if (comic) {
            setComic(comic);
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
    Alert.alert('Ocorreu um error ao carregar o quadrinho');
    props.navigation.goBack();
  };

  return (
    <>
      <MainView>
        <Header title={'Quadrinho'} goBack={() => props.navigation.goBack()} />
        {comic && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <>
              <Image image={comic.image} />
              <DataLine title={'Id'} text={comic.id} />
              <DataLine title={'Nome'} text={comic.name} />
              <DataLine title={'Descrição'} text={comic.description} />
              <ListAux
                navigation={props.navigation}
                title={'Séries'}
                list={comic.series}
              />
              <ListAux
                navigation={props.navigation}
                title={'Criadores'}
                list={comic.creators}
              />
              <ListAux
                navigation={props.navigation}
                title={'Personagens'}
                list={comic.characters}
              />
              <ListAux
                navigation={props.navigation}
                title={'Histórias'}
                list={comic.stories}
              />
              <ListAux
                navigation={props.navigation}
                title={'Eventos'}
                list={comic.events}
              />
            </>
          </ScrollView>
        )}
      </MainView>
    </>
  );
};

export default DetailsComic;
