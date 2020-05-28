import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SquareProps {
    text: string,
    random: number,
    isSingle: boolean
}
interface SquareState {
    
}
const ousting = 8;
// генерация псевдо рендомного числа, с учётом выбранного базисного цвета
let getPseudoRandom = (random: number, baseColor: number) =>
  ( random * baseColor) % 255;
// генерация псевдо случайного цвета
function getPseudoRandomColor(a: number) {
  var color = '#';    
  for (let i = 0; i < 3; i++)
  {
    let b = getPseudoRandom(a, i + ousting );
    color += b > 15 ? b.toString(16) : "0" + b.toString(16);
  }
  return color;
}
// подбор цвета текста в зависимости от случайного цвета, по которому генерировался фон
function getTextColor(rendom: number){    
  let red = getPseudoRandom(rendom, ousting );
  let green = getPseudoRandom(rendom, ousting + 1);
  let blue = getPseudoRandom(rendom, ousting + 2);
  let l = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
  return l > 0.5 ? '#000000' : '#FFFFFF';
} 
const styles = StyleSheet.create({
  square: {
    width: 300, 
    height: 110,
  },
  text: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center'    
  },
  margin20: {marginBottom: 20},
  margin0: {marginBottom: 0}
});

  export default class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
      super(props);
    }
    render() { 
        const { text, random, isSingle } = this.props; 
        // корерктировка отсутпов в зависимости от того, квадрат ли это в ряду. или тот, который единственный       
        let marginBottomStyle = isSingle ? styles.margin0 : styles.margin20;
        return (
            <View style={{  
              ...marginBottomStyle, 
              ...styles.square,
              backgroundColor: getPseudoRandomColor(random), 
               }}>
                  <Text style = {{
                    ...styles.text,
                    color: getTextColor(random),                     
                    }}>
                       {text } 
                  </Text>                
            </View>
        )
    }
  };