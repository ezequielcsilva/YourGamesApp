import styled from 'styled-components/native'

export const Container = styled.View`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 30px;
  right: 7px;
`
export const Button = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: ${props => props.theme.colors.li};
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 5px black;
  elevation: 5;
  top: 20px;
`
