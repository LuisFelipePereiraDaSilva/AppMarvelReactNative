import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getStorie} from '../../services/requests/storie/storieMarvel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Storie} from '../../types/storie';
import Loading from '../../shared/components/Loading';
import {NavigationContainerRef} from '@react-navigation/native';
import DataLine from '../../shared/components/DataLine';
import ListAux from '../../shared/components/ListAux';

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

const DetailsStorie = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [storie, setStorie] = useState<Storie>();

  useEffect(() => {
    setLoading(true);
    if (props.route?.params?.resourceURI) {
      getStorie(props.route?.params?.resourceURI)
        .then((storie) => {
          if (storie) {
            setStorie(storie);
          } else {
            errorLoadData();
          }
        })
        .catch(() => {
          errorLoadData();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      errorLoadData();
    }
  }, [props]);

  const errorLoadData = () => {
    Alert.alert('Ocorreu um error ao carregar a história');
    props.navigation.goBack();
  };

  return (
    <>
      <MainView>
        <Header title={'História'} goBack={() => props.navigation.goBack()} />
        {loading || !storie ? (
          <Loading />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <>
              <DataLine title={'Id'} text={storie.id} />
              <DataLine title={'Nome'} text={storie.name} />
              <DataLine title={'Descrição'} text={storie.description} />
              <ListAux
                navigation={props.navigation}
                title={'Criadores'}
                list={storie.creators}
              />
              <ListAux
                navigation={props.navigation}
                title={'Personagens'}
                list={storie.characters}
              />
              <ListAux
                navigation={props.navigation}
                title={'Séries'}
                list={storie.series}
              />
              <ListAux
                navigation={props.navigation}
                title={'Quadrinhos'}
                list={storie.comics}
              />
              <ListAux
                navigation={props.navigation}
                title={'Eventos'}
                list={storie.events}
              />
            </>
          </ScrollView>
        )}
      </MainView>
    </>
  );
};

export default DetailsStorie;
