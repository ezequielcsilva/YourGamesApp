import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../pages/Home'

const App = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  )
}

export default AppRoutes
