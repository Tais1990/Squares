import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import  Square  from '../Square/Square.tsx'
import { Platform } from 'react-native'
import ReactDom from 'react-dom'
// номер особенного квадрата
const numberSingle = 19;
// перечисление с положениями особенного квадрата
enum StateSquare {
    Up,
    Center,
    Down
  } 
// стили
const styles = StyleSheet.create({
    easel: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginTop: 20
    },
    easel__scrollView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,        
    },
    easel__scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    singleSquareUp: {
        position: 'absolute',
        top: 0 
    },
    singleSquareDown: {
        position: 'absolute',
        bottom: 0
    },
    singleSquareCenter: {
        display: 'none'
    }
});
// массив со стилями, в ависимости от положения особенного квадрата
let stylesSingle: {[id: StateSquare] : any} = {};
stylesSingle[StateSquare.Up] = styles.singleSquareUp;
stylesSingle[StateSquare.Center] = styles.singleSquareCenter;
stylesSingle[StateSquare.Down] = styles.singleSquareDown;

interface EaselState {
    data: string,
    position: StateSquare,
    isLoading: boolean,
    ySingle: number,
    yTwenty: number
}
interface EaselProps {
    param: number[],
}

export default class Easel extends React.Component<EaselProps, EaselState>
{
    elementRef: any = React.createRef();
    changeState(event: Object) {
        // вычисление позиции плавающего квадрата
        if (this.state.yTwenty && this.state.ySingle && event.nativeEvent.contentOffset.y <= this.state.yTwenty - this.state.ySingle)
        {
            if (this.state.position != StateSquare.Down)
            {
                this.setState({position: StateSquare.Down})
            }
            return;
        }
        if (this.state.yTwenty && event.nativeEvent.contentOffset.y > this.state.yTwenty) 
        {
            if (this.state.position != StateSquare.Up)
            {
                this.setState({position: StateSquare.Up})
            }
            return;
        }
        if (this.state.position != StateSquare.Center)
        {
            this.setState({position: StateSquare.Center})
        }
    }
    constructor(props: EaselProps) {      
        super(props);  
        // инициализация стайта  
        this.state = {
          data: "Данных ещё нет",
          position: StateSquare.Down,
          isLoading: true
        };
        fetch('https://api.exmo.me/v1.1/ticker')
            .then(response => response.json())
            .then((json) => {
                this.setState({ data: json.result == false ? "Ой, что-то пошло не так" : json.ETH_BTC.buy_price  });
            })
            .catch((error) => 
                {
                    console.error(error);
                    this.setState({ data: "Ой, что-то пошло не так" });
                })
            .finally(() => {
                this.setState({ isLoading: false });
            });   
        this.changeState = this.changeState.bind(this);
    }
    render() { 
        const { data, position } = this.state; 
        const {param} = this.props;
        let text = data + '\r\n' + Platform.OS; // проверить, как будет на ios        
        let singleStyle = stylesSingle[position];  
        return (
            <View style={styles.easel}>
                <ScrollView 
                    style={styles.easel__scrollView} 
                    contentContainerStyle={styles.easel__scrollViewContent} 
                    onScroll={this.changeState} scrollEventThrottle={16}>
                    {param.map((item, index) => 
                        <View key = {index} 
                            onLayout={(index == numberSingle)
                                ? (event: any) => { if (!this.state.yTwenty) { this.setState({yTwenty: event.nativeEvent.layout.y});}} 
                                : null}>
                            <Square 
                                text = {text}                           
                                random = {item}/>
                        </View>)}                             
                </ScrollView> 
                {/*  Мможно ли данный слой сделать прозрачным для жестов? Т.е. при начале движения с элемента этого слоя делать так, чтобы жест проваливался, до  слоя с меньшим индексом */}              
                <View style={{...singleStyle}} 
                    onLayout={(event: any) => { if (!this.state.ySingle) { this.setState({ySingle: event.nativeEvent.layout.y});}} }>
                    <Square 
                        text = {text} 
                        random = {param[numberSingle]} 
                        isSingle = {true}/>
                </View>
            </View>
        );
    }
}

