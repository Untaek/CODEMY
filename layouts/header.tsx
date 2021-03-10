import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return <__Header>Header</__Header>
}

const __Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #f2f3f4;
  height: 5rem;
`

export default Header
