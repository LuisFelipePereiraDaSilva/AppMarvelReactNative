import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  getStorie,
  getListStories,
} from '../../services/requests/storie/storieMarvel';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
  bodyView: {
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

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
      <View style={styles.mainView}>
        <View style={styles.bodyView}>
          <Text>Tela Home</Text>
        </View>
      </View>
    </>
  );
};

export default Home;
