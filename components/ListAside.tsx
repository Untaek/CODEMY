import React from 'react'
import styled from 'styled-components'

const data = [
  { id: 'javascript', name: 'javascript', amount: 2, language: 'javascript' },
  { id: 'java', name: 'java', amount: 1, language: 'java' },
  { id: 'c++', name: 'c++', amount: 1, language: 'cpp' },
]

const ListAside = () => {
  return (
    <__ListAside>
      {data.map((e) => {
        return (
          <ListAsideItem key={e.id}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`/ffont.symbol.svg#ffont-${e.language}`}></use>
            </svg>
            <Name>{e.name}</Name>
            <Amount>{e.amount}</Amount>
          </ListAsideItem>
        )
      })}
    </__ListAside>
  )
}

const __ListAside = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eaebec;
  padding: 0 2rem;
`

const ListAsideItem = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.3rem;
  }

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`

const Name = styled.span`
  font-size: 1rem;
  font-weight: 300;
`

const Amount = styled.span`
  font-size: 0.8rem;
  margin-left: 0.25rem;
`

export default ListAside
