import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Image } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { ThemeContext } from 'styled-components'

import Home from '../pages/Home'

const App = createStackNavigator()

const AppRoutes: React.FC = () => {
  const { title, logo } = useContext(ThemeContext)
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: title === 'dark' ? '#000000' : '#EBEEF8',
        },
      }}
      initialRouteName="Home"
    >
      <App.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          // headerTitle: () => <Image source={logo} width={20} />,
        }}
        name="Home"
        component={Home}
      />
    </App.Navigator>
  )
}

export default AppRoutes
