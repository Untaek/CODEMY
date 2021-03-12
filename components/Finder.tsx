import React from 'react'
import styled from 'styled-components'
import { File } from '@/types/index'
import { observer } from 'mobx-react-lite'
import { useStores } from '../stores'

const data = {
  root: [
    { name: 'components', type: 'Directory' },
    { name: 'index.html', type: 'File', language: 'html', value: '<html></html>' },
    { name: 'main.js', type: 'File', language: 'javascript', value: `import React from 'react'` },
  ] as File[],
}

const Finder = observer(() => {
  const { docStore } = useStores()

  const onClickDirectory = (file: File) => {
    console.log(file)
  }
  const onClickFile = (file: File) => {
    console.log(file)
    docStore.setCurrentFile(file)
  }

  return (
    <__Finder>
      <section>
        <Header>Fly@recyclerview1</Header>
        {data.root.map((file) => {
          if (file.type === 'Directory') {
            return (
              <Directory className="No-Select" onClick={() => onClickDirectory(file)} key={file.type + file.name}>
                {file.name}
              </Directory>
            )
          } else if (file.type === 'File') {
            return (
              <FileRow className="No-Select" onClick={() => onClickFile(file)} key={file.type + file.name}>
                {file.name}
              </FileRow>
            )
          }
        })}
      </section>
    </__Finder>
  )
})

const __Finder = styled.div`
  width: 15rem;
  max-width: 15rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid #d6d7d8;
  border-right: none;
  font-family: Menlo, Monaco, 'Courier New', monospace;
`

const Row = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 32px;
  max-height: 32px;
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background-color: #f4f5f6;
  }
`

const Header = styled(Row)`
  height: 36px;
  max-height: 36px;
  font-weight: 600;
  background-color: #e6e8ea;

  &:hover {
    background-color: #e6e8ea;
  }
`

const Directory = styled(Row)``

const FileRow = styled(Row)``

export default Finder
