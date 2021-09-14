import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import axios from 'axios';
import hostname from "../../secrets";
import { Pie } from "react-native-progress";
import BackButton from "./BackButton";

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        paddingTop: 140,
        paddingLeft: 40,
        paddingRight: 40,
    },
    titleView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 25
    },
    inputView: {
        paddingTop: 30
    },
    scoreView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40
    },
    scoreMessage: {
        fontSize: 20
    },
    viewCenter: {
        justifyContent: 'center',
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

interface strengthProp {
    navigation: any;
}

const PasswordStrength: React.FC<strengthProp> = (props: strengthProp) => {

    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>();

    const [score, setScore] = useState<string>("-1")

    // REST Conditions
    const [sentResponse, setSentResponse] = useState<boolean>(false);

    const getScore = () => {
        setScore("-1");
        setSentResponse(true)
        setError("");

        if (password) {

            var data = new FormData();
            data.append('password', password);

            let config = {
                method: 'post' as const,
                url: hostname+'api/v1/strength',
                headers: {},
                data: data
            };

            axios(config)
                .then(response => {
                    setSentResponse(false);
                    setScore(response.data.score)
                })
                .catch(error => {
                    setSentResponse(false);
                    setError("Try again, was unable to get your password graded");
                });

        } else {
            setSentResponse(false);
            setError("Please provide a password");
        }

    };




    return (
        <View style={styles.main}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Password Strength Checker</Text>
            </View>
            <View style={styles.inputView}>
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'feather', name: 'lock' }}
                    onChangeText={value => setPassword(value)}
                />
                <Button
                    title={"Grade Password"}
                    icon={{ name: 'checkcircleo', type: 'antdesign', size: 30, color: "white" }}
                    onPress={() => { getScore() }}
                />

            </View>
            {
                sentResponse ?
                    <View style={styles.viewCenter}>
                        <Pie progress={0.25} size={50} borderWidth={5} indeterminate={true} />
                        <Text> Grading password...</Text>
                    </View>
                    :
                    null
            }
            {
                score != "-1" ?
                    <View style={styles.scoreView}>
                        <Text style={styles.scoreMessage}>Score: {score}/50</Text>
                    </View>
                    :
                    null
            }
            {
                error ?
                    <View>
                        <View style={styles.viewCenter}>
                            <Text style={
                                {
                                    fontSize: 24,
                                    color: "red"
                                }}>{error}</Text>
                        </View>
                    </View>
                    : null
            }
            <BackButton navigation={props.navigation} />

        </View>
    );
};

export default PasswordStrength;