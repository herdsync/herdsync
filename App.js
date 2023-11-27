import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './App.js';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import {
         StyleSheet,
         Text,
         View,
         Image,
         TouchableHighlight,
         TextInput,
         Button
} from 'react-native';

// comment
//const Logo = require('/assets/Screenshot_2023-08-09_192841-removebg-preview.png');

const Stack = createStackNavigator();

export default function App({navigation}) {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LogIn" component={LogInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Options" component={Options}/>
                <Stack.Screen name="Animals" component={Animals}/>
                <Stack.Screen name="Land" component={Land}/>
                <Stack.Screen name="ToDo" component={ToDo}/>
            </Stack.Navigator>

        </NavigationContainer>

    );
}
function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>
            <TouchableHighlight
                style ={{
                    height: 40,
                    width:240,
                    borderRadius:10,
                    backgroundColor : "#576e18",
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
                <Button
                    title={"Log In"}
                    onPress={() => navigation.navigate( "LogIn")}
                />

            </TouchableHighlight>
            <TouchableHighlight
                style ={{
                    height: 40,
                    width:240,
                    borderRadius:10,
                    backgroundColor : "#576e18",
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
                <Button
                    title={"Sign Up"}
                    onPress={() => navigation.navigate("SignUp")}
                />

            </TouchableHighlight>


            </View>

    );
}
function LogInScreen(navigation){
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>
         <Text>'My Username:'</Text>
         <TextInput
           placeholder={'Username'}
           style={styles.input}
           backgroundColor='#f2f2f2'

         />
         <Text>'My Password:'</Text>
         <TextInput
             placeholder={'Password'}
             style={styles.input}
             backgroundColor='#f2f2f2'

         />
         <TouchableHighlight
           style ={{
             height: 40,
             width:240,
             borderRadius:10,
             backgroundColor : "#576e18",
             marginLeft :50,
             marginRight:50,
             marginTop :20
           }}>
           <Button
             title={"Log In"}
             onPress={() => navigation.navigate( "Options")}
           />

         </TouchableHighlight>
    </View>

    );
}
function SignUpScreen(navigation){
    return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>
               < Text>'My Username:'</Text>
                         <TextInput
                           placeholder={'Username'}
                           style={styles.input}
                           backgroundColor='#f2f2f2'

                         />
                         <Text>'My Password:'</Text>
                         <TextInput
                             placeholder={'Password'}
                             style={styles.input}
                             backgroundColor='#f2f2f2'
                         />
                         <TouchableHighlight
                           style ={{
                             height: 40,
                             width:240,
                             borderRadius:10,
                             backgroundColor : "#576e18",
                             marginLeft :50,
                             marginRight:50,
                             marginTop :20
                           }}>
                           <Button
                             title={"Log In"}
                             onPress={() => navigation.navigate( "Options")}
                           />

                         </TouchableHighlight>
            </View>
    );
}
function Options(navigation){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>
           <TouchableHighlight
             style ={{
                height: 40,
                width:240,
                borderRadius:10,
                backgroundColor : "#576e18",
                marginLeft :50,
                marginRight:50,
                marginTop :20
             }}>
             <Button
                title={"Animals"}
                onPress={() => navigation.navigate( "Animals")}
             />
           </TouchableHighlight>
           <TouchableHighlight
             style ={{
                height: 40,
                width:240,
                borderRadius:10,
                backgroundColor : "#576e18",
                marginLeft :50,
                marginRight:50,
                marginTop :20
             }}>
             <Button
                title={"Land"}
                onPress={() => navigation.navigate( "Land")}
             />
           </TouchableHighlight>
           <TouchableHighlight
             style ={{
                height: 40,
                width:240,
                borderRadius:10,
                backgroundColor : "#576e18",
                marginLeft :50,
                marginRight:50,
                marginTop :20
             }}>
             <Button
                title={"To Do"}
                onPress={() => navigation.navigate( "ToDo")}
             />
           </TouchableHighlight>
        </View>
    );
}
function Animals(navigation){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>

        </View>
    );
}
function Land(navigation){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>

        </View>
    );
}
function ToDo(navigation){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4ffd5' }}>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        width: 260,
        height: 260,
        alignSelf: 'center'
    },
     input: {
            height: 40,
            width: 200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },

});
