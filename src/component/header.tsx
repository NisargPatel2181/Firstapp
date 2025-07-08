import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  SafeAreaView,
} from 'react-native';

type Headerprops = {
  title: string;
  headerstyle?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
  imagestyle?: StyleProp<ImageStyle>;
  source?: any;
  bell?: any;
  onPress? : () => void | undefined
};

export const Header: FC<Headerprops> = ({
  title,
  headerstyle,
  text,
  source,
  imagestyle,
  bell,
  onPress
}) => {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={[style.headview]}>
        <View style={[style.headerstyle, headerstyle]}>
           <TouchableOpacity onPress={onPress}>
          <Image source={source} style={[style.imagestyle, imagestyle]} />
          </TouchableOpacity>
          <Text style={[style.text, text]}>{title}</Text>
        
        </View>

        <View>
          <Image source={bell} style={[style.imagestyle, imagestyle]} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  safeArea: {
    backgroundColor: '#577d95',
  },
  headview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#577d95',
    paddingHorizontal: 10,
  },
  headerstyle: {
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
    height: 30,
    textAlignVertical: 'center',
  },
  imagestyle: {
    height: 30,
    width: 30,
    marginRight: 7,
  },
});