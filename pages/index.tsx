import Head from 'next/head'
import styled from 'styled-components'

import Content from '@/layouts/content'
import ListAside from '@/components/ListAside'
import List from '@/components/List'

const Home = () => {
  return (
    <Content>
      <Head>
        <title>코드더미.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListWrapper>
        <ListAside />
        <List />
      </ListWrapper>
    </Content>
  )
}

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 60rem;
  padding: 1rem 0;
`

export default Home
