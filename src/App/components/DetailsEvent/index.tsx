import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getEvent} from '../../services/requests/event/eventMarvel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Event} from '../../types/event';
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

const DetailsEvent = (props: Props) => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    dispatch({type: types.SET_LOADING, payload: true});
    if (props.route?.params?.resourceURI) {
      getEvent(props.route?.params?.resourceURI)
        .then((event) => {
          if (event) {
            setEvent(event);
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
    Alert.alert('Ocorreu um error ao carregar o evento');
    props.navigation.goBack();
  };

  return (
    <>
      <MainView>
        <Header title={'Evento'} goBack={() => props.navigation.goBack()} />
        {event && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <>
              <Image image={event.image} />
              <DataLine title={'Id'} text={event.id} />
              <DataLine title={'Nome'} text={event.name} />
              <DataLine title={'Descrição'} text={event.description} />
              <DataLine title={'Data de início'} text={event.startDate} />
              <DataLine title={'Data de fim'} text={event.endDate} />
              <ListAux
                navigation={props.navigation}
                title={'Criadores'}
                list={event.creators}
              />
              <ListAux
                navigation={props.navigation}
                title={'Personagens'}
                list={event.characters}
              />
              <ListAux
                navigation={props.navigation}
                title={'Histórias'}
                list={event.stories}
              />
              <ListAux
                navigation={props.navigation}
                title={'Quadrinhos'}
                list={event.comics}
              />
              <ListAux
                navigation={props.navigation}
                title={'Séries'}
                list={event.series}
              />
            </>
          </ScrollView>
        )}
      </MainView>
    </>
  );
};

export default DetailsEvent;
