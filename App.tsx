import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import  Easel  from './components/Easel/Easel'

/*
Материал для дополнительного изучения
https://www.cat-in-web.ru/switch-font-color/
*/ 

export default function App() {
  var p: number[] = [];
  for(let i = 0; i < 50; i++)
  {
    p.push(Math.trunc(Math.random() * 100));    
  }
  return (
    <Easel param = {p}/>
  );
}