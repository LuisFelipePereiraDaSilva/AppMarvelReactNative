import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';
import {getListCharacters} from '../../../services/requests/character/characterMarvel';
import Header from '../../../shared/components/Header';
import styled from 'styled-components/native';
import ElementList from '../components/ElementList';
import {Character} from '../../../types/character';
import Loading from '../../../shared/components/Loading';

const styles = StyleSheet.create({
  flatList: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

const MainView = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListCharacters()
      .then((list) => {
        setCharacters(list);
      })
      .catch(() => {
        Alert.alert('Ocorreu um erro ao carregar os personagens');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MainView>
        <Header title={'Início'} />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            ListHeaderComponent={() => {
              return <Title>Personagens</Title>;
            }}
            contentContainerStyle={styles.flatList}
            scrollEnabled={true}
            data={characters}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            numColumns={2}
            renderItem={({item}) => (
              <ElementList name={item.name} image={item.image} />
            )}
          />
        )}
      </MainView>
    </>
  );
};

export default Home;
