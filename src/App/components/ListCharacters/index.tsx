import React, {useEffect} from 'react';
import {
  getStorie,
  getListStories,
} from '../../services/requests/storie/storieMarvel';
import Header from '../../shared/components/Header';
import styled from 'styled-components/native';

const MainView = styled.View`
  flex: 1;
`;

const Home = () => {
  useEffect(() => {
    getStorie('http://gateway.marvel.com/v1/public/stories/44422')
      .then((list) => {
        console.log(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <MainView>
        <Header title={'Início'} goBack={() => {}} />
      </MainView>
    </>
  );
};

export default Home;
