import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {getSerie} from '../../services/requests/serie/serieMarvel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';
import {Serie} from '../../types/serie';
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

const DetailsSerie = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [serie, setSerie] = useState<Serie>();

  useEffect(() => {
    setLoading(true);
    if (props.route?.params?.resourceURI) {
      getSerie(props.route?.params?.resourceURI)
        .then((serie) => {
          if (serie) {
            setSerie(serie);
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
    Alert.alert('Ocorreu um error ao carregar a série');
    props.navigation.goBack();
  };

  return (
    <>
      <MainView>
        <Header title={'Série'} goBack={() => props.navigation.goBack()} />
        {loading || !serie ? (
          <Loading />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <>
              <Image image={serie.image} />
              <DataLine title={'Id'} text={serie.id} />
              <DataLine title={'Nome'} text={serie.name} />
              <DataLine title={'Descrição'} text={serie.description} />
              <DataLine title={'Ano de início'} text={serie.startYear} />
              <DataLine title={'Ano de fim'} text={serie.endYear} />
              <ListAux
                navigation={props.navigation}
                title={'Criadores'}
                list={serie.creators}
              />
              <ListAux
                navigation={props.navigation}
                title={'Personagens'}
                list={serie.characters}
              />
              <ListAux
                navigation={props.navigation}
                title={'Histórias'}
                list={serie.stories}
              />
              <ListAux
                navigation={props.navigation}
                title={'Quadrinhos'}
                list={serie.comics}
              />
              <ListAux
                navigation={props.navigation}
                title={'Eventos'}
                list={serie.events}
              />
            </>
          </ScrollView>
        )}
      </MainView>
    </>
  );
};

export default DetailsSerie;
