import {Constants} from "expo";
import {StatusBar, View} from "react-native";
import React from "react";

export function QuizStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
