import React from 'react'
import styled from 'styled-components'

type IconProps = {
  src: string
  width: number | string
  height: number | string
  round?: boolean
}

const Icon = (props: IconProps) => {
  return <__Icon {...props} />
}

const __Icon = styled.div<IconProps>`
  background-image: url('${(props) => props.src}');
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  border-radius: ${(props) => (props.round ? '50%' : '0')};
`

export default Icon
