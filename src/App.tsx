import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/main';
import PasswordStrength from './components/PasswordStrength';
import PasswordGenerator from './components/PasswordGenerator';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navTheme = DefaultTheme;
  navTheme.colors.background = 'white';

  React.useEffect(() => {

    // For now is a place holder for code
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);

  }, [])

  return (
    <NavigationContainer
      theme={navTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, }}
      >
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Strength" component={PasswordStrength} />
        <Stack.Screen name="Generator" component={PasswordGenerator} />
      </Stack.Navigator>
    </NavigationContainer>


  );
};



export default App;
