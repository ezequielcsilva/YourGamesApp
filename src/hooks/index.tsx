import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

const AppProvider: React.FC = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}

export default AppProvider
