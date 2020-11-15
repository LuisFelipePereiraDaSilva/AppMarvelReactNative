import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
});

const DetailsCharacter = () => {
  return (
    <>
      <View style={styles.mainView} />
    </>
  );
};

export default DetailsCharacter;
