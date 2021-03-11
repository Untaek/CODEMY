import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return <__Footer>Copyright by 하하맨.</__Footer>
}

const __Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-top: 1px solid #f2f3f4;
  height: 2.5rem;
  font-size: 0.75rem;
  color: #777;
`

export default Footer
