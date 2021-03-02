import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getCreator} from '../../services/requests/creator/creatorMavel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Creator} from '../../types/creator';
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

const DetailsCreator = (props: Props) => {
  const dispatch = useDispatch();
  const [creator, setCreator] = useState<Creator>();

  useEffect(() => {
    dispatch({type: types.SET_LOADING, payload: true});
    if (props.route?.params?.resourceURI) {
      getCreator(props.route?.params?.resourceURI)
        .then((creator) => {
          if (creator) {
            setCreator(creator);
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
    Alert.alert('Ocorreu um error ao carregar o criador');
    props.navigation.goBack();
  };

  return (
    <>
      <MainView>
        <Header title={'Criador'} goBack={() => props.navigation.goBack()} />
        {creator && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <>
              <Image image={creator.image} />
              <DataLine title={'Id'} text={creator.id} />
              <DataLine title={'Nome'} text={creator.name} />

              <ListAux
                navigation={props.navigation}
                title={'Quadrinhos'}
                list={creator.comics}
              />
              <ListAux
                navigation={props.navigation}
                title={'Séries'}
                list={creator.series}
              />
              <ListAux
                navigation={props.navigation}
                title={'Histórias'}
                list={creator.stories}
              />
              <ListAux
                navigation={props.navigation}
                title={'Eventos'}
                list={creator.events}
              />
            </>
          </ScrollView>
        )}
      </MainView>
    </>
  );
};

export default DetailsCreator;
