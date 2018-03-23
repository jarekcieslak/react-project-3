import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {red} from "../utils/colors";
import {Icon} from "react-native-elements";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        reverse
        name='emoji-sad'
        type='entypo'
        color={red}
      />
      <Text>Unfortunately error has occurred.</Text>
      <Text>{!!this.props && this.props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default Error;
