import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <__Header>
      <Link href="/" passHref>
        <Brand />
      </Link>
      <NavBar>
        <SearchBar>
          <input type="text" placeholder="검색" />
        </SearchBar>
        <Right>로그인</Right>
      </NavBar>
    </__Header>
  )
}

const __Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 5rem;
`

const Brand = styled.a`
  width: 3rem;
  height: 3rem;
  background-image: url('/app-icons-twitch.png');
  background-position: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-right: 1rem;
`

const NavBar = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.25em;
  font-weight: 700;
`

const Right = styled.div`
  margin-left: auto;
`

const SearchBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  input {
    height: 2.5rem;
    width: 20rem;
    padding: 0 1.25rem;
    font-size: 1.1rem;
    border: 1px solid #c2c3c4;
    border-radius: 1.1rem;
    outline: none;
  }
`

export default Header
