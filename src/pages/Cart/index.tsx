import React, { useMemo } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { View } from 'react-native'
import { FRETE, FRETE_MAXIMO } from '../../config/constants'
import games from '../../assets/games'

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles'

import { useCart } from '../../hooks/cart'

import formatValue from '../../utils/formatValue'

interface Product {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart()

  function handleIncrement(id: string): void {
    increment(id)
  }

  function handleDecrement(id: string): void {
    decrement(id)
  }

  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productsSubtotal = product.price * product.quantity

      return accumulator + productsSubtotal
    }, 0)

    return total
  }, [products])

  const freteTotal = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productsSubtotal = FRETE * product.quantity

      if (cartTotal >= FRETE_MAXIMO) {
        return 0
      }

      return accumulator + productsSubtotal
    }, 0)

    return total
  }, [products])

  const totalItensInCart = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productsQuantity = product.quantity

      return accumulator + productsQuantity
    }, 0)

    return total
  }, [products])

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item: Product) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={games[String(item.id)]} />
              <ProductTitleContainer>
                <ProductTitle>{item.name}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => handleIncrement(item.id)}
                >
                  <FeatherIcon name="plus" color="#e83f5b" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => handleDecrement(item.id)}
                >
                  <FeatherIcon name="minus" color="#e83f5b" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={20} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{formatValue(cartTotal)}</SubtotalValue>
      </TotalProductsContainer>
      <TotalProductsContainer>
        <FeatherIcon name="truck" color="#fff" size={20} />
        <TotalProductsText>Frete</TotalProductsText>
        <SubtotalValue>{formatValue(freteTotal)}</SubtotalValue>
      </TotalProductsContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-bag" color="#fff" size={20} />
        <TotalProductsText>Total do pedido</TotalProductsText>
        <SubtotalValue>{formatValue(cartTotal + freteTotal)}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  )
}

export default Cart
