import React, { useEffect, useState } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { View } from 'react-native'

import { useCart } from '../../hooks/cart'
import formatValue from '../../utils/formatValue'
import FloatingCart from '../../components/FloatingCart'
import api from '../../services/api'
import games from '../../assets/games'

import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from './styles'

interface Product {
  id: number
  name: string
  price: number
  score: number
  image: string
}

const Home: React.FC = () => {
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('products')

      setProducts(response.data)
    }

    loadProducts()
  }, [])

  function handleAddToCart(item: Product): void {
    addToCart(item)
  }

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={games[String(item.id)]} />
              <ProductTitle>{item.name}</ProductTitle>
              <ProductTitle>{`Score ${item.score}`}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton onPress={() => handleAddToCart(item)}>
                  <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  )
}

export default Home
