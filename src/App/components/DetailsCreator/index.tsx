import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getCreator} from '../../services/requests/creator/creatorMavel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Creator} from '../../types/creator';
import Loading from '../../shared/components/Loading';
import {NavigationContainerRef} from '@react-navigation/native';
import DataLine from '../../shared/components/DataLine';
import Image from '../../shared/components/Image';
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

const DetailsCreator = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState<Creator>();

  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
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
        {loading || !creator ? (
          <Loading />
        ) : (
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
