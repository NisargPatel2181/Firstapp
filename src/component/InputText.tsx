import React, { FC, RefObject } from "react";
import { StyleSheet, Text, TextInput, View ,  StyleProp, ViewStyle, KeyboardTypeOptions} from "react-native";

type InputTextProps = {
    placeholder: string,
    onChangeText : (text: string) => void
    onSubmitEditing ?:() => void ,
    ref?: RefObject<TextInput | null>,
    secureTextEntry?: boolean;
    containerStyle? : StyleProp <ViewStyle>
    keyboardType?: KeyboardTypeOptions;
    value? : string | any
}

const InputText: FC<InputTextProps> = ({ placeholder, onChangeText, onSubmitEditing, ref , containerStyle,  keyboardType, value}) => {
    console.log('check')

    return (
        <View style = {[styles.containerStyle , containerStyle]}>
            

            <TextInput placeholder={placeholder}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
                keyboardType = {keyboardType} 
                value={value}>
                </TextInput>
        </View>
    )

}

const styles = StyleSheet.create({

    containerStyle:{

    }
})

export default InputText;