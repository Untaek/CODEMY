import React from 'react'
import styled from 'styled-components'
import { File } from '@/types/index'
import { observer } from 'mobx-react-lite'
import { useStores } from '../stores'

const Finder = observer(() => {
  const { docStore } = useStores()

  const onClickDirectory = (dir: File) => {
    docStore.toggleDirectory(dir)
  }
  const onClickFile = (file: File) => {
    docStore.setCurrentFile(file)
  }

  return (
    <__Finder>
      <section>
        <Header>Fly@recyclerview1</Header>
        <Tree>
          {docStore.currentDoc.root.map((file) => {
            if (file.type === 'Directory') {
              return (
                <React.Fragment key={file.type + file.name}>
                  <Directory className="No-Select" onClick={() => onClickDirectory(file)}>
                    <img src={file.open ? '/folder-open-regular.svg' : '/folder-regular.svg'} alt="folder" />
                    <span>{file.name}</span>
                  </Directory>
                  {file.open && file.children ? (
                    <SubTree>
                      {file.children.map((child) => {
                        return (
                          <React.Fragment key={file.name + child.type + child.name}>
                            <FileRow className="No-Select" onClick={() => onClickFile(child)}>
                              <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`/ffont.symbol.svg#ffont-${child.language}`}></use>
                              </svg>
                              <span>{child.name}</span>
                            </FileRow>
                          </React.Fragment>
                        )
                      })}
                    </SubTree>
                  ) : undefined}
                </React.Fragment>
              )
            } else if (file.type === 'File') {
              return (
                <FileRow className="No-Select" onClick={() => onClickFile(file)} key={file.type + file.name}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`/ffont.symbol.svg#ffont-${file.language}`}></use>
                  </svg>
                  <span>{file.name}</span>
                </FileRow>
              )
            }
          })}
        </Tree>
      </section>
    </__Finder>
  )
})

const __Finder = styled.div`
  min-width: 13rem;
  width: 13rem;
  max-width: 13rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: none;
  font-family: Menlo, Monaco, 'Courier New', monospace;
`

const Row = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  height: 2rem;
  max-height: 2rem;
  padding: 0 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f4f5f6;
  }

  svg,
  img {
    min-width: 1rem;
    min-height: 1rem;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Header = styled(Row)`
  height: 36px;
  max-height: 36px;
  font-weight: 600;
  background-color: #1e384d;
  color: #eeeeee;
  padding: 0 16px;

  &:hover {
    background-color: #33546f;
  }
`

const Tree = styled.div`
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`

const Directory = styled(Row)``

const FileRow = styled(Row)``

const SubTree = styled.div`
  div {
    padding-left: 1.25rem;
  }
`

export default Finder
