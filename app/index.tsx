import { Button, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { evaluate } from "mathjs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const HomeScreen = () => {
    const [numbers, setNumbers] = useState<string>('');
    const colorScheme = useColorScheme();

    const buttons = [
        ['7', '8', '9', '⌫'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['/', '0', '*', '='],
        ['CE', ','],
    ];

    const calculateResult = () => {
        try {
            setNumbers(evaluate(numbers).toString());
        } catch (error) {
            console.log(error);
            setNumbers('faz o L');
        }
    };

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <SafeAreaView>
                <View style={{  minHeight: '25%', backgroundColor: 'black', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{color: 'white', fontFamily: 'arial', fontSize: 80, marginRight: 20 }}>{numbers}</Text>
                </View>
                {buttons.map((row, index) => (
                        <View key={index} style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                            {row.map((button, buttonIndex) => (
                                <TouchableOpacity 
                                key={buttonIndex}
                                style={{
                                    flex: 1,
                                    borderRadius:360,
                                    margin: 5,
                                    padding: 27,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'purple',
                                }}
                                onPress={() => {
                                    if (button === '=') {
                                        calculateResult();
                                    } else if (button === '⌫') {
                                        setNumbers(numbers.slice(0, -1));
                                    }
                                    else if (button === ',') {
                                        setNumbers(numbers + '.');
                                    }
                                    else if (button === 'CE') {
                                        setNumbers('');
                                    } else {
                                        setNumbers(numbers + button);
                                    }
                                }}>
                                    <Text  style={{ fontSize: 32,fontWeight: 'bold', color: colorScheme === 'dark' ? 'white' : 'black' }}>{button}</Text>
                                </TouchableOpacity>
                                
                            ))}
                        </View>
                    ))}
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen