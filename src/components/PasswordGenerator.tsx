import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Switch, Slider } from 'react-native-elements'
import { Pie } from "react-native-progress";
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import hostname from "../../secrets";
import BackButton from "./BackButton";

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        paddingTop: 40,
        paddingLeft: 40,
        paddingRight: 40,
    },
    clipButton: {
        justifyContent: 'center',
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonView: {
        justifyContent: 'center',
        paddingTop: 80,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonTitle: {
        color: "white",
        fontSize: 16,
        padding: 10
    },
    title: {
        fontSize: 24
    },
    viewCenter: {
        justifyContent: 'center',
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

interface genProps {
    navigation: any;
}

const PasswordGenerator: React.FC<genProps> = (props: genProps) => {

    // Form
    const [hasSymbol, setHasSymbol] = useState<boolean>(false);
    const [length, setLength] = useState<number>(0.1);
    const [numberOfCharacters, setNumberOfCharacters] = useState<number>(8);

    // REST Conditions
    const [sentResponse, setSentResponse] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Password
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);


    useEffect(() => {
        const num = Math.round((16 - 8) * length + 8);

        setNumberOfCharacters(num);

    }, [length])

    const getPassword = () => {
        setPassword("");
        setSentResponse(true);
        setError(false);

        const numberFromBool = hasSymbol ? 1 : 0;

        axios.get(hostname + "/api/v1/passgen/" + numberOfCharacters + "/" + numberFromBool)
            .then(response => {
                setSentResponse(false);
                setPassword(response.data.password)
            })
            .catch(error => {
                setSentResponse(false);
                setError(true);
            });

    }

    return (
        <View style={styles.main}>
            <Text style={
                {
                    fontSize: 30
                }
            }>Generate a Password</Text>
            <View style={{ justifyContent: 'center', paddingTop: 20 }}>
                <Slider
                    value={length}
                    onValueChange={(length: React.SetStateAction<number>) => setLength(length)}
                    thumbStyle={
                        {
                            backgroundColor: "#00ABFF"
                        }
                    }
                />
                <Text style={styles.title}>Password Length: {numberOfCharacters}</Text>
            </View>
            <View style={{
                paddingTop: 20,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}>
                    <Text style={
                        {
                            fontSize: 20
                        }}
                    >Include Symbols:</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <Switch value={hasSymbol} onValueChange={(value) => setHasSymbol(value)} />
                </View>

            </View>
            <View style={styles.buttonView}>
                <Button
                    titleStyle={styles.buttonTitle}
                    title={"Generate Password"}
                    icon={{ name: 'grade', type: 'MaterialIcons', size: 30, color: "white" }}
                    onPress={() => { getPassword() }} />
            </View>


            {
                sentResponse ?
                    <View style={styles.viewCenter}>
                        <Pie progress={0.25} size={50} borderWidth={5} indeterminate={true} />
                        <Text> Creating password...</Text>
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
                                }}>Error occured, please try again</Text>
                        </View>
                    </View>
                    : null
            }
            {
                password ?
                    <View>
                        <View style={styles.viewCenter}>
                            <Text style={
                                {
                                    fontSize: 24
                                }}>Password: </Text>
                            <Text style={styles.title}>{password}</Text>
                        </View>
                        <View style={styles.clipButton}>
                            <Button
                                titleStyle={styles.buttonTitle}
                                title={"Copy to Clipboard"}
                                icon={{ name: 'copy', type: 'feather', size: 30, color: "white" }}
                                onPress={() => { Clipboard.setString(password); setVisible(true) }} />
                            <Dialog
                                visible={visible}
                                onTouchOutside={() => {
                                    setVisible(false)
                                }}
                            >
                                <DialogContent>
                                    <Text>{"\n"}Password has been copied to clipboard</Text>
                                </DialogContent>
                            </Dialog>
                        </View>
                    </View>

                    :
                    null
            }
           <BackButton navigation={props.navigation} />
        </View>
    );
};

export default PasswordGenerator;