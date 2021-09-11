import React from "react";
import { Text, View } from "react-native";

interface dividerProps {
    title: string;
}

const Divider: React.FC<dividerProps> = (props: dividerProps) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:"white" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            <View>
                <Text style={{ width: 50, textAlign: 'center', fontSize: 30 }}>{props.title}</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
    );
};

export default Divider;