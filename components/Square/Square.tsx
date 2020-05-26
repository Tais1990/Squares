import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import style from './Square.scss'

interface SquareProps {
    text?: string,
    random: number,
    flag: boolean
}
interface SquareState {
    data: string,
    isLoading: boolean
}

const ousting = 8;
export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let getPseudoRandom = (random: number, order: number) =>
    ( random * order) % 255;
  
  function getPseudoRandomColor(a: number) {
    var color = '#';    
    for (let i = 0; i < 3; i++)
    {
        let b = getPseudoRandom(a, i + ousting );
        color += b > 15 ? b.toString(16) : "0" + b.toString(16);
    }
    return color;
  }
  function getPseudoRandomColorInvert(a: number) {
    var color = '#';
    for (let i = 0; i < 3; i++)
    {
        let b = 255 - getPseudoRandom(a, i + ousting);
        color += b > 15 ? b.toString(16) : "0" + b.toString(16);
    }
    return color;
  }
  function getTextColor(a: number){    
    let red = getPseudoRandom(a, ousting );
    let green = getPseudoRandom(a, ousting + 1);
    let blue = getPseudoRandom(a, ousting + 2);
    let l = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
    return l > 0.5 ? '#000000' : '#FFFFFF';
  } 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //fontSize: 30
    //alignItems: 'center',
    //justifyContent: 'center',    
  },
  sq20: {
    position: 'absolute',
    //top: 0,
    bottom: 0,
    //paddingTop: 60
    
        
  },
  sq: {},
  t20: {fontSize: 10},
  t: {fontSize: 30}
});



 export default class Square extends React.Component<SquareProps, SquareState> {
    
    constructor(props: SquareProps) {
      super(props);
      // инициализация стайта  
      this.state = {
        data: "К сожалению, данные ещё не полученны",
        isLoading: true
      };
      // запрос на получене данных о курсе
      
      fetch('https://api.exmo.me/v1.1/ticker')
        .then(response => response.json())
        .then((json) => {
            this.setState({ data: /*json.ETH_BTC.buy_price*/'' });
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({ isLoading: false });
        });
        
    }
  /*
    componentDidMount() {
      fetch('https://reactnative.dev/movies.json')
        .then((response) => response.json())
        .then((json) => {
          this.setState({ data: json.movies });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
 
    render() {
      const { data, isLoading } = this.state;
  
      return (
        <View style={{ flex: 1, padding: 24 }}>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>{item.title}, {item.releaseYear}</Text>
              )}
            />
          )}
        </View>
      );
    } */
    render() { 
        const { data, isLoading } = this.state;
        const { text, random, flag } = this.props;        
        let s = flag ? styles.sq20 : styles.sq;
        let t = flag ? styles.t20 : styles.t;
        //console.log(random, flag, s, t);
        return (
            <View style={{  
              ...s,
              padding: 20, 
              margin: 20,
              width: 300, 
              height: 200,
              backgroundColor: getPseudoRandomColor(random),
              
               }}>
                {/*{isLoading ? <Text>Данные ещё не подгруженны</Text> : <Text>{data}</Text>}*/}
                <Text style = {{
                    ...styles.container,
                    ...t, 
                    backgroundColor: getPseudoRandomColor(random),
                    color: getTextColor(random)}}
                    //className={style.square}                    
                    >
                       {text} {data} {random}
                </Text>
                
            </View>
        )
    }
  };