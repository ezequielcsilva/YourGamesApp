/* eslint-disable import/first */

import React from 'react'

import { mocked } from 'ts-jest/utils'
import { render, fireEvent, act } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native')

  return {
    __esModule: true,
    ...originalModule,
    useNavigation: jest.fn(),
  }
})

jest.mock('../../hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: jest.fn().mockReturnValue({
    addToCart: jest.fn(),
    products: [],
  }),
}))

jest.mock('../../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}))

import FloatingCart from '../../components/FloatingCart'
import { useCart } from '../../hooks/cart'

const useCartMocked = mocked(useCart)

useCartMocked.mockReturnValue({
  addToCart: jest.fn(),
  products: [
    {
      id: 1234,
      name: 'Mario',
      image: 'name',
      price: 400,
      quantity: 5,
    },
    {
      id: 12345,
      name: 'Zelda',
      image: '',
      price: 600,
      quantity: 10,
    },
  ],
  increment: jest.fn(),
  decrement: jest.fn(),
})

const useNavigationMocked = mocked(useNavigation)

const navigate = jest.fn()

useNavigationMocked.mockReturnValue({
  navigate,
} as any)

describe('Home', () => {
  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<FloatingCart />)

    expect(getByText('8000')).toBeTruthy()
  })

  it('should be able to show the total quantity of itens in the cart', async () => {
    const { getByText } = render(<FloatingCart />)

    expect(getByText('15 itens')).toBeTruthy()
  })

  it('should be able to navigate to the cart', async () => {
    const { getByTestId } = render(<FloatingCart />)

    act(() => {
      fireEvent.press(getByTestId('navigate-to-cart-button'))
    })

    expect(navigate).toHaveBeenCalledWith('Cart')
  })
})
