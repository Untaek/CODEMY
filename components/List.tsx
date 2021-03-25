import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Icon from './Icon'

const data = [
  {
    id: 1,
    title: '리사이클러뷰에서 요소 제거하기',
    like: 35,
    assoc: [
      { name: '안드로이드', imageURL: '/android.jpeg' },
      { name: '자바', imageURL: '/java.png' },
    ],
  },
  { id: 2, title: '배열의 모든 숫자 더하기', like: 24, assoc: [{ name: '자바스크립트', imageURL: '/js.png' }] },
  {
    id: 3,
    title: '안드로이드 권한 요청 플로우',
    like: 8,
    assoc: [
      { name: '안드로이드', imageURL: '/android.jpeg' },
      { name: '자바', imageURL: '/java.png' },
    ],
  },
  {
    id: 4,
    title: '원하는 요소까지 스크롤 하기',
    like: 4,
    assoc: [{ name: '자바스크립트', imageURL: '/js.png' }],
  },
]

const List = () => {
  return (
    <__List>
      {data.map((e) => {
        return (
          <Link key={e.id} href={`/doc/${e.id}`} passHref>
            <ListItem>
              <div style={{ marginRight: '1rem', flexDirection: 'column', alignItems: 'center' }}>
                <Icon src="/up.png" width="1.5rem" height="1.5rem" />
                {e.like}
              </div>
              <div style={{ flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.25rem' }}>{e.title}</div>
                <div style={{ display: 'flex' }}>
                  {e.assoc.map((assocItem) => {
                    return <Icon key={assocItem.name} src={assocItem.imageURL} width="1.75rem" height="1.75rem" />
                  })}
                </div>
              </div>
            </ListItem>
          </Link>
        )
      })}
    </__List>
  )
}

const __List = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0 2rem;
  font-size: 1.25rem;
`

const ListItem = styled.a`
  display: flex;
  box-shadow: 0px 0px 4px rgba(96, 116, 150, 0.25);
  border: 1px solid #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    background-color: #f4f5f6;
    border: 1px solid #e5e6e7;
  }
`

export default List
