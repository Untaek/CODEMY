import React from 'react'
import styled from 'styled-components'

const data = [
  { id: 'javascript', name: 'javascript' },
  { id: 'java', name: 'java' },
  { id: 'c++', name: 'c++' },
]

const ListAside = () => {
  return (
    <__ListAside>
      {data.map((e) => {
        return <ListAsideItem key={e.id}>{e.name}</ListAsideItem>
      })}
    </__ListAside>
  )
}

const __ListAside = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  border-right: 1px solid #eaebec;
  padding: 0 2rem;
`

const ListAsideItem = styled.a`
  font-weight: 700;
  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`

export default ListAside
