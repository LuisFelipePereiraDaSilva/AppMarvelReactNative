import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {getListCharacters} from '../../../services/requests/character/characterMarvel';
import styled from 'styled-components/native';
import ElementList from '../components/ElementList';
import {Character} from '../../../types/character';
import {NavigationContainerRef} from '@react-navigation/native';
import BottomNumber from '../components/BottomNumber';
import {theme} from '../../../shared/styles/theme';
import {useDispatch} from 'react-redux';
import * as types from '../../../redux/types';

import ArrowLeft from '../assets/arrow-left.png';
import ArrowRight from '../assets/arrow-right.png';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

const MainView = styled.View`
  flex: 1;
  background: ${theme.colors.background};
`;

const ContainerHeader = styled.View`
  margin-horizontal: 30px;
  margin-top: 12px;
`;

const Title = styled.Text`
  color: ${theme.colors.textTertiary};
  font-size: 16px;
  font-family: bold;
  font-weight: bold;
  line-height: 19px;
`;
const TitleAux = styled.Text`
  color: ${theme.colors.textTertiary};
  font-size: 16px;
  font-family: normal;
  font-weight: normal;
  line-height: 19px;
`;
const LineTitle = styled.View`
  width: 55px;
  height: 3px;
  background: ${theme.colors.textTertiary};
  margin-top: 3px;
`;

const TitleTextInput = styled.Text`
  color: ${theme.colors.textTertiary};
  font-size: 16px;
  line-height: 19px;
  font-weight: 900;
  margin-top: 12px;
`;
const TextInput = styled.TextInput`
  border-width: 1.5px;
  border-radius: 7px;
  border-color: ${theme.colors.borderTextInput};
  height: 40px;
  margin-top: 3px;
`;

const Menu = styled.View`
  margin-top: 12px;
  margin-bottom: 18px;
  background: ${theme.colors.textTertiary};
  width: 100%;
  height: 40px;
  justify-content: center;
`;
const Name = styled.Text`
  color: ${theme.colors.textFourth};
  font-size: 16px;
  line-height: 19px;
  margin-left: 125px;
`;

const ContainerFooter = styled.View`
  margin-top: 18px;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const LineFooter = styled.View`
  height: 12px;
  background: ${theme.colors.textTertiary};
`;

const ScrollViewNumbers = styled.ScrollView``;
const ContainerNumbers = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-self: center;
  min-height: 40px;
`;

const ImageArrow = styled.Image`
  margin-horizontal: 30px;
`;

interface Props {
  navigation: NavigationContainerRef;
  resourceURI: string;
}

const ListPersonagens = (props: Props) => {
  const dispatch = useDispatch();
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [list, setList] = useState<Character[]>([]);
  const [page, setPage] = useState(0);
  const scrollView: any = useRef();

  useEffect(() => {
    getListCharacters()
      .then((list) => {
        const newList: Character[] = [];
        list.some((element) => {
          newList.push(element);
          if (newList.length === 4) {
            return true;
          }
        });
        setList(newList);
        setCharacters(list);
        setAllCharacters(list);
      })
      .catch(() => {
        Alert.alert('Ocorreu um erro ao carregar os personagens');
      })
      .finally(() => {
        dispatch({type: types.SET_LOADING, payload: false});
      });
  }, []);

  const mountListPagination = (i: number, charactersAux?: Character[]) => {
    const newList: Character[] = [];
    (charactersAux ? charactersAux : characters).some((element, index) => {
      if (index >= i * 4) newList.push(element);
      if (newList.length === 4) {
        return true;
      }
    });
    setList(newList);
    setPage(i);
    scrollView.current?.scrollTo({
      x: i * 50,
      y: 0,
      animated: true,
    });
  };

  const mountPagination = () => {
    let result = [];
    for (let i = 0; i < characters.length / 4; i++) {
      result.push(
        <TouchableOpacity onPress={() => mountListPagination(i)}>
          <BottomNumber
            number={(i + 1).toString()}
            selected={page === i ? true : false}
          />
        </TouchableOpacity>,
      );
    }
    return result.map((element, index) => {
      return <View key={index}>{element}</View>;
    });
  };

  const nextPage = () => {
    if (page + 1 < characters.length / 4) {
      mountListPagination(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      mountListPagination(page - 1);
    }
  };

  const search = (text: string) => {
    const listSeach: Character[] = [];
    allCharacters.map((element) => {
      if (element.name.toLowerCase().includes(text.toLowerCase()))
        listSeach.push(element);
    });
    setCharacters(listSeach);
    mountListPagination(0, listSeach);
  };

  return (
    <>
      <MainView>
        <ContainerHeader>
          <Title>
            BUSCA MARVEL<TitleAux>TESTE FRONT-END</TitleAux>
          </Title>
          <LineTitle />
          <TitleTextInput>Nome do Personagem</TitleTextInput>
          <TextInput onChangeText={(text) => search(text)} />
        </ContainerHeader>
        <Menu>
          <Name>Nome</Name>
        </Menu>

        <FlatList
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={true}
          data={list}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              delayPressIn={100}
              onPress={() =>
                props.navigation.navigate('DetailsCharacter', {
                  resourceURI: item.resourceURI,
                })
              }>
              <ElementList name={item.name} image={item.image} />
            </TouchableOpacity>
          )}
        />

        <ContainerFooter>
          <TouchableOpacity onPress={() => previousPage()}>
            <ImageArrow source={ArrowLeft} />
          </TouchableOpacity>
          <ScrollViewNumbers
            keyboardShouldPersistTaps={'handled'}
            ref={scrollView}
            horizontal={true}
            contentContainerStyle={styles.scrollView}>
            <ContainerNumbers>{mountPagination()}</ContainerNumbers>
          </ScrollViewNumbers>
          <TouchableOpacity onPress={() => nextPage()}>
            <ImageArrow source={ArrowRight} />
          </TouchableOpacity>
        </ContainerFooter>
        <LineFooter />
      </MainView>
    </>
  );
};

export default ListPersonagens;
