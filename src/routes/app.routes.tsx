import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Image } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { ThemeContext } from 'styled-components'

import Home from '../pages/Home'
import Cart from '../pages/Cart'

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
        }}
        name="Home"
        component={Home}
      />
      <App.Screen
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },

          headerBackImage: () => (
            <FeatherIcon
              name="chevron-left"
              size={24}
              color={title === 'dark' ? '#EBEEF8' : '#0d0d0d'}
            />
          ),
        }}
        name="Cart"
        component={Cart}
      />
    </App.Navigator>
  )
}

export default AppRoutes
