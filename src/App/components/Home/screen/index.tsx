import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

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
