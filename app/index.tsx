import { Button, Dimensions, Text, TouchableOpacity, useColorScheme, View } from "react-native";
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

    const calcularResultado = () => {
        try {
            const resultado = evaluate(numbers);
            setNumbers(resultado.toString());
        } catch (error) {
            setNumbers("");
        }
    };

    const handleButtonPress = (button: string) => {
        console.log(`handleButtonPress: button = ${button}, numbers = ${numbers}`);
        // Verifica se o caractere final da string de numeros é um operador
        const lastChar = numbers.slice(-1);
        const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

        // Se o botao for um operador, o tratamento é diferente
        if (isOperator(button)) {
            console.log(`handleButtonPress: isOperator(button) = ${isOperator(button)}`);
            // Se o caractere final eh um operador, substitui ele pelo novo operador
            setNumbers(isOperator(lastChar) ? numbers.slice(0, -1) + button : numbers + button);
        } else {
            // Tratamento para cada botao
            switch (button) {
                case '=':
                    console.log(`handleButtonPress: button = ${button}`);
                    // Calcula o resultado da expressao
                    calcularResultado();
                    break;
                case ' ':
                    console.log(`handleButtonPress: button = ${button}`);
                    // Remove o caractere final da string de numeros
                    setNumbers(numbers.slice(0, -1));
                    break;
                case ',':
                    console.log(`handleButtonPress: button = ${button}`);
                    // Substitui a virgula (ponto decimal) pelo ponto
                    setNumbers(numbers + '.');
                    break;
                case 'CE':
                    console.log(`handleButtonPress: button = ${button}`);
                    // Limpa a string de numeros
                    setNumbers('');
                    break;
                default:
                    console.log(`handleButtonPress: button = ${button}`);
                    // Adiciona o botao pressionado ao final da string de numeros
                    setNumbers(numbers + button);
            }
        }
    };

    const { height, width } = Dimensions.get('window');

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <SafeAreaView>
                <View style={{ height: height / 4, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: colorScheme === 'dark' ? 'white' : 'black', fontFamily: 'arial', fontSize: 80, marginRight: 0 }}>
                        {numbers || ""}
                    </Text>
                </View>

                {buttons.map((row, index) => (
                    <View key={index} style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        {row.map((button, buttonIndex) => (
                            <TouchableOpacity
                                key={buttonIndex}
                                style={{
                                    flex: 1,
                                    borderRadius: 360,
                                    margin: 5,
                                    padding: 27,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#6b21a8',
                                }}
                                onPress={() => { handleButtonPress(button) }}>
                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>{button}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
