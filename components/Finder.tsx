import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { File } from '@/types'
import { useStores } from '@/stores'

const Finder = observer(() => {
  const { docStore } = useStores()

  const onClickDirectory = (dir: File) => {
    docStore.toggleDirectory(dir)
  }
  const onClickFile = (file: File) => {
    docStore.setCurrentFile(file)
  }

  const renderTreeItems = (files: File[]) => {
    return files.map((file) => {
      if (file.type === 'Directory') {
        return (
          <React.Fragment key={file.type + file.name}>
            <Directory className="No-Select" onClick={() => onClickDirectory(file)}>
              <img src={file.open ? '/folder-open-regular.svg' : '/folder-regular.svg'} alt="folder" />
              <span>{file.name}</span>
            </Directory>

            {/* Recursive Sub tree */}
            {file.children && file.children.length ? (
              <SubTree open={file.open} size={file.children.length}>
                {renderTreeItems(file.children)}
              </SubTree>
            ) : undefined}
          </React.Fragment>
        )
      }

      if (file.type === 'File') {
        return (
          <FileRow
            active={file === docStore.currentFile}
            className="No-Select"
            onClick={() => onClickFile(file)}
            key={file.type + file.name}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`/ffont.symbol.svg#ffont-${file.language}`}></use>
            </svg>
            <span>{file.name}</span>
          </FileRow>
        )
      }
    })
  }

  return (
    <__Finder>
      <Header>Fly@recyclerview1</Header>
      <section>
        <Tree>{renderTreeItems(docStore.currentDoc.root)}</Tree>
      </section>
    </__Finder>
  )
})

const __Finder = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 13rem;
  width: 13rem;
  max-width: 13rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: none;
  font-family: Menlo, Monaco, 'Courier New', monospace;

  section {
    flex: 1;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
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
  height: 2.4rem;
  max-height: 2.4rem;
  font-weight: 600;
  background-color: #1e384d;
  color: #eeeeee;
  padding: 0 16px;

  &:hover {
    background-color: #33546f;
  }
`

const Tree = styled.div``

const Directory = styled(Row)``

const FileRow = styled(Row)<{ active: boolean }>`
  ${(props) => (props.active ? 'background-color: #eeeeee;' : '')}
  &:hover {
    ${(props) => (props.active ? 'background-color: #eeeeee;' : '')}
  }
`

const SubTree = styled.div<{ open: boolean; size: number }>`
  overflow: hidden;
  transition: max-height 0.3s;
  max-height: ${(props) => (props.open ? `${props.size * 2}rem` : '0')};

  > div {
    padding-left: 1.25rem;
  }
`

export default Finder
