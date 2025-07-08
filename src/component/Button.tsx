import React , {FC} from "react";
import { Button, View ,ViewStyle , StyleProp, StyleSheet} from "react-native";

type Buttonprops = {

    title : string,
    onPress : () => void
    containerStyle? : StyleProp <ViewStyle>
    Buttoncolor : string
}


export const Butt: FC<Buttonprops> =({title , onPress , containerStyle , Buttoncolor}) => {
 

return(
    <View style={[styles.containerStyle , containerStyle]}>
        <Button title={title} onPress={onPress} color={Buttoncolor} ></Button>
    </View>
);

}
const styles = StyleSheet.create({

    containerStyle:{

    }
})

