import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook'

 const App =()=> {

  const [isLoggedin, SetLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, SetImageLoadStatus] = useState(false);

  const FacebookLogIn = async () => {
    try {   
      await Facebook.initializeAsync({
        appId: '539546077557605',
      });

      const{
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
        .then(response => response.json())
        .then(data =>{
          SetLoggedinStatus(true);
          setUserData(data);
          console.log(data);
       //   handleSignUp(data);
        })
        .catch(e => console.log(e))
      } else {
        type === 'cancel'
      }
      
    } catch (message) {
      alert(`Facebook Login Error: ${message}`);
    }

  }


  const logout = () => {
    SetLoggedinStatus(false);
    setUserData(null);
    SetImageLoadStatus(false);
  }

  return (
    isLoggedin ?
    userData ? 
      <View style= {styles.container}>
        <Image style={{width: 200, height:200, borderWidth: 50}} source={{uri: userData.picture.data.url}} onLoadEnd={() => SetImageLoadStatus(true)}></Image>
        <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{position: 'absolute'}}></ActivityIndicator>
        <Text style={{fontSize:22, marginVertical:10}}>
          Hi {userData.name}!
        </Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={{ color: '#fff'}}>
          logout
        </Text>
        </TouchableOpacity>
      </View> : null
      :
      <View style={styles.container}>
        <Image style= {{width: 200, height: 200, borderRadius: 50, marginVertical: 20}} source={require("../assets/fb.png")}>

        </Image>
        <TouchableOpacity style={styles.loginBtn} onPress={FacebookLogIn}>
          <Text style= {{color: '#fff'}}>
            Login With Facebook
          </Text>
        </TouchableOpacity>
      </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 20,
  }, 
  logoutBtn: {
    backgroundColor: 'green',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 20,
    position: 'absolute',
    bottom:0,
    marginBottom:200,
  }
});
export default App;
