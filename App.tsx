import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import  Easel  from './components/Easel/Easel'

/*
Материал для дополнительного изучения
https://www.cat-in-web.ru/switch-font-color/
*/ 
/*
handleScroll: function(event: Object) {
  console.log(event.nativeEvent.contentOffset.y);
 }
*/
/*
 function a2(event: Object)
 {
  console.log('!!!!', event.nativeEvent.contentOffset.y)
 }

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.homeView} onScroll={a2} scrollEventThrottle={16}>
        
        <Square text = '1' random = {Math.trunc(Math.random() * 100)} flag = {false}/>
        <Square text = '2' random = {Math.trunc(Math.random() * 100)} flag = {false}/>
        <Square text = '3' random = {Math.trunc(Math.random() * 100)} flag = {false}/>
        <Square text = '20' random = {Math.trunc(Math.random() * 100)} flag = {false} />
        <Square text = '21' random = {Math.trunc(Math.random() * 100)} flag = {false}/>
        <Square text = '22' random = {Math.trunc(Math.random() * 100)} flag = {false}/>
        <Square text = '23' random = {Math.trunc(Math.random() * 100)} flag = {false}/>
        <Square text = '24' random = {Math.trunc(Math.random() * 100)} flag = {false}/>

        
      </ScrollView>

      <Square text = '20' random = {Math.trunc(Math.random() * 100)} flag = {true} />
    </View>
  );
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
}
});
*/
export default function App() {
  var p: number[] =[];
  for(let i = 0; i < 50; i++)
  {
    p.push(Math.trunc(Math.random() * 100));    
  }
  return (
    <Easel param = {p}/>
  );
}