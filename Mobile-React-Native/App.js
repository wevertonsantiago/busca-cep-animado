import { StyleSheet, Text, 
TextInput, View, SafeAreaView, Alert,TouchableOpacity, Pressable, Keyboard, Dimensions} from 'react-native';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

import LottieView from 'lottie-react-native'


export default function App() {
  const [cep,setCep] = useState()
  const [dados,setDados] = useState({})
  
  const windowHeight = Dimensions.get('window').height;

  //viacep.com.br/ws/{cep}/json
  const api = axios.create({
    baseURL: "https://viacep.com.br/ws"
  });

  useEffect(()=>{

  },[])

  async function press() {
    
    try{
      const response = await api.get(`${cep}/json`);
      setDados(response.data)
      console.log(response.data)
      // setCep('') Para apagar o que foi digitado na busca
      setCep('')
    }catch{
      Alert.alert('Erro ao buscar, digite apenas os números, ou verifique o cep.')
    }
  }



  return (
    
      <Pressable onPress={Keyboard.dismiss}> 
      <View style={{backgroundColor:'#69aff0',height:windowHeight}}>
      <View style={{
      marginTop:40,
      marginBottom:10, 
      paddingLeft:55,
      height:200,
      justifyContent:'center',
      }}>
        <LottieView
          source={require('./cepAnimation2')}
          autoPlay={true}
          loop={true}
          resizeMode='cover'
          style={{width:280,height:280}}
          />
      </View> 
      <View style={{alignItems:'center'}}>
        <Text style={{fontSize:30, marginBottom:10, color:'#fff', marginTop:-30}}>Buscador de Cep</Text>
      </View>
      <View style={{alignItems:'center'}}>
        <TextInput
          style={styles.input}
          placeholder="Digite o cep Ex: 01034903"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={cep}
          selectionColor={'#fff'}
          onChangeText={text => setCep(text.replace(/\D+/g,'').replace('-',''))}
          clearButtonMode='always'/>
          <TouchableOpacity style={styles.btnArea} onPress={press}> 
            <Text style={styles.btnText}>PESQUISAR</Text>
          </TouchableOpacity>
      </View>
      {Object.keys(dados).length > 0 && (
        <View style={{backgroundColor:'#1E90FF',margin:10, borderRadius:20, }}>
        <Text style={styles.text}>Cep: {dados.cep}</Text>
        <Text style={styles.text}>Rua: {dados.logradouro}</Text>
        <Text style={styles.text}>Bairro: {dados.bairro} </Text>
        <Text style={styles.text}>Cidade: {dados.localidade} - {dados.uf}</Text>
      </View>
        )}
      </View>
     </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    padding:10,
    marginBottom:15,
    width:300,
    height:50,
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    fontSize:20,
    color:'#fff'
  },
  text:{
    width: 360,
    fontSize:25,
    color:"#fff",
    padding:4,
  },

  btnArea: {
    borderWidth: 3,
    borderRadius: 25,
    alignItems:'center',
    justifyContent: 'center',
    height:50,
    width:300,
    borderColor: '#fff',
  },
  btnText: {
    // backgroundColor:'#fff',
    color:'#fff',
    fontWeight:'bold',
    fontSize:18,
  },
});
