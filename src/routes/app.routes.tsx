import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'

const App = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: '#000000',
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
    </App.Navigator>
  )
}

export default AppRoutes
