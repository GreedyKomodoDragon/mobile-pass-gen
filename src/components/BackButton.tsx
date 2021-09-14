import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

interface backProps {
    navigation: any;
}

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: "red"
    },
    buttonTitle: {
        color: "white",
        fontSize: 16,
        padding: 10
    },


});



const BackButton: React.FC<backProps> = (props: backProps) => {

    return (
        <View style={{ paddingTop: 20, width: "30%" }}>
            <Button
                titleStyle={styles.buttonTitle}
                title={"Back"}
                icon={{ name: 'back', type: 'antdesign', size: 30, color: "white" }}
                buttonStyle={styles.backButton}
                onPress={() => { props.navigation.navigate('Home') }} />
        </View>
    );
};

export default BackButton;