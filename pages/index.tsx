import { GetServerSideProps } from 'next'
import styled from 'styled-components'

import { API } from '@/utils'
import { Document } from '@/types'

import Content from '@/layouts/content'
import ListAside from '@/components/ListAside'
import DocumentList from '@/components/DocumentList'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: documents } = await API.get('/')

  return {
    props: {
      documents,
    },
  }
}

type MainPageProps = {
  documents: Document[]
}

const MainPage = (props: MainPageProps) => {
  return (
    <Content>
      <ListWrapper>
        <ListAside />
        <DocumentList documents={props.documents} />
      </ListWrapper>
    </Content>
  )
}

const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 60rem;
  padding: 1rem 0;
`

export default MainPage
