import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import  Square  from '../Square/Square.tsx'

interface EaselState {
    data: string,
    position: boolean
}
interface EaselProps {
    param: number[]
}


export default class Easel extends React.Component<EaselProps, EaselState>
{
    
    changeState(event: Object) {
        //this.setState({data: event.nativeEvent.contentOffset.y})
        console.log(event.nativeEvent.contentOffset.y)
        if (event.nativeEvent.contentOffset.y > 220*19 && this.state.position)
        {
            this.setState({position: false})
        }
        if (event.nativeEvent.contentOffset.y <= 220*19 && !this.state.position)
        {
            this.setState({position: true})
        }
    }
    constructor(props: EaselProps) {      
        super(props);  
        // инициализация стайта  
        this.state = {
          data: "-1",
          position: true
        };
        this.changeState = this.changeState.bind(this);
    }
    render() { 
        const { data, position } = this.state; 
        const {param} = this.props;
        let text = '!!!!';
        let s = position ? styles.s2 : styles.s1;  
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.homeView} onScroll={this.changeState} scrollEventThrottle={16}>
                    {param.map((item, index) => <Square text = {item} key = {index} random = {item} flag = {false}/>)}                             
                </ScrollView>                
                <View style={{...s}}>
                    <Square text = {text}  random = {param[19]} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   //paddingTop: 60
   //justifyContent: 'center',
 },
 headerTextStyle: {
   fontSize: 40,
   alignSelf: 'center'
},
scrollViewStyle: {
   position: 'absolute',
   top: 20,
   bottom: 0,
   left: 0,
   right: 0,
   //paddingTop: 60
},
homeView: {
   alignItems: 'center',
   justifyContent: 'center'
},
textStyle: {
   fontSize: 96
},
mainView: {
   flex: 1,
   position: 'relative'
},

s1: {
    position: 'absolute',
    top: 0

},
s2: {
    position: 'absolute',
    bottom: 0
}
});