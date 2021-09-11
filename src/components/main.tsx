import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Divider from "./Divider";

interface mainProps {
    navigation: any;
}

const Main: React.FC<mainProps> = (props: mainProps) => {

    return (
        <View style={{
            flex: 1,
            flexDirection: "column"
        }}>

            <View style={{
                flex: 1,
                width: '100%'

            }}>
                <Button
                    titleStyle={{
                        color: "white",
                        fontSize: 32,
                    }}
                    buttonStyle={
                        {
                            height: "100%",
                            borderRadius: 0
                        }
                    }
                    title={"Password Strength Checker"}
                    icon={{ name: 'grade', type: 'MaterialIcons', size: 100, color: "white" }} 
                    
                    onPress={() =>
                        props.navigation.navigate('Strength')
                    } />
            </View>

            <Divider title={"or"} />

            <View style={{
                flex: 1,
                width: '100%'
            }}>
                <Button
                    titleStyle={{
                        color: "#268ad9",
                        fontSize: 32,
                    }}
                    buttonStyle={
                        {
                            backgroundColor: "white",
                            height: "100%"
                        }
                    }
                    title={"Generate a new \n Password"}
                    icon={{ name: 'create', type: 'MaterialIcons', size: 100, color: "#268ad9" }} 
                    onPress={() =>
                        props.navigation.navigate('Generator')
                    } 
                    />
            </View>

        </View>
    );
};

export default Main;