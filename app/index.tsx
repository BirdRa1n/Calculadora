import { Button, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { evaluate } from "mathjs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const HomeScreen = () => {
    // Estado que armazena os números e expressão atual do usuário
    const [numbers, setNumbers] = useState<string>('');
    // Define o esquema de cores com base nas configurações do sistema (claro/escuro)
    const colorScheme = useColorScheme();

    // Matriz que define os botões exibidos na calculadora
    const buttons = [
        ['7', '8', '9', '⌫'], // ⌫ representa o símbolo de apagar
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['/', '0', '*', '='],
        ['CE', ','], // CE limpa a expressão, ',' adiciona um ponto decimal
    ];

    // Função para calcular o resultado da expressão atual
    const calcularResultado = () => {
        try {
            // Avaliar a expressão usando a biblioteca mathjs
            const resultado = evaluate(numbers);

            // Atualiza o estado com o resultado convertido para string
            setNumbers(resultado.toString());
        } catch (error) {
            // Caso ocorra erro na avaliação, exibe mensagem de erro
            setNumbers("");
        }
    };

    // Lida com os eventos de clique nos botões
    const handleButtonPress = (button: string) => {
        switch (button) {
            case '=':
                // Chama a função para calcular o resultado
                calcularResultado();
                break;

            case '⌫':
                // Remove o último caractere da expressão
                setNumbers(numbers.slice(0, -1));
                break;

            case ',':
                // Substitui a vírgula por ponto para decimal
                setNumbers(numbers + '.');
                break;

            case 'CE':
                // Limpa a expressão atual
                setNumbers('');
                break;

            default:
                // Evita operadores duplicados consecutivos
                if (numbers.slice(-1) === button && ['+', '-', '*', '/'].includes(button)) {
                    return;
                }

                // Adiciona o botão pressionado à expressão
                setNumbers(numbers + button);
        }
    };

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <SafeAreaView>
                {/* Tela de exibição da expressão e resultado */}
                <View style={{ minHeight: '25%', backgroundColor: 'black', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: 'white', fontFamily: 'arial', fontSize: 80, marginRight: 0 }}>
                        {numbers}
                    </Text>
                </View>

                {/* Renderização dos botões */}
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
                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: colorScheme === 'dark' ? 'white' : 'black' }}>{button}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;
