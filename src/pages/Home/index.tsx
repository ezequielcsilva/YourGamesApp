import React, { useEffect, useState } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { View } from 'react-native'

import api from '../../services/api'

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
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('products')

      setProducts(response.data)
    }

    loadProducts()
  }, [])

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
              <ProductImage source={item.image} />
              <ProductTitle>{item.name}</ProductTitle>
              <ProductTitle>{`Score ${item.score}`}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{item.price}</ProductPrice>
                <ProductButton>
                  <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
    </Container>
  )
}

export default Home
