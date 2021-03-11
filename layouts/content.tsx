import React from 'react'
import styled from 'styled-components'

const Content = ({ children }) => {
  return <__Content>{children}</__Content>
}

const __Content = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 2rem 0;
`

export default Content
