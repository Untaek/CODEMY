import React from 'react'
import styled from 'styled-components'
import { editor, IRange } from 'monaco-editor'
import { observer } from 'mobx-react-lite'
import Editor, { Monaco, useMonaco } from '@monaco-editor/react'

import Content from '@/layouts/content'
import Icon from '@/components/Icon'
import Finder from '@/components/Finder'
import { useStores } from '@/stores'

const data = {
  title: '리사이클러뷰에서 요소 제거하기',
}

const languages: { [key: string]: { name: string } } = {
  typescript: {
    name: 'TypeScript',
  },
  javascript: {
    name: 'JavaScript',
  },
  html: {
    name: 'HTML',
  },
  markdown: {
    name: 'Markdown',
  },
}

const createDependencyProposals = (monaco: Monaco, range: IRange) => {
  return [
    {
      label: 'lodash',
      kind: monaco.languages.CompletionItemKind.Module,
      insertText: 'lodash',
      range: range,
    },
    {
      label: 'util',
      kind: monaco.languages.CompletionItemKind.Module,
      insertText: 'util',
      range: range,
    },
  ]
}

const Document = observer(() => {
  const { docStore } = useStores()
  const monaco = useMonaco()
  const monacoRef = React.useRef<editor.IStandaloneCodeEditor>()

  React.useEffect(() => {
    import('xterm').then((mod) => {
      const term = new mod.Terminal({
        rows: 15,
      })
      term.onKey((event) => {
        if (event.domEvent.key === 'Backspace') {
          term.write('\b \b')
        } else if (event.domEvent.key === 'Enter') {
          term.writeln('')
          term.write('> ')
        } else {
          term.write(event.key)
        }
      })
      const wrapper = document.getElementById('terminal')
      wrapper.innerHTML = ''
      term.open(wrapper)
      term.writeln('Sandbox Runner: nodejs v15.\n')
      term.write('> ')
    })
  }, [])

  React.useEffect(() => {
    if (monaco) {
      monaco?.languages.typescript.typescriptDefaults.setEagerModelSync(true)

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      })

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        baseUrl: '.',
        paths: { '*': ['/node_modules/@types/*'] },
      })

      const libSource = ['export class Util {', 'public static test(): string {}', '}'].join('\n')
      const libUri = '/node_modules/@types/util/index.d.ts'

      const lib = monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, libUri)

      monaco.languages.registerCompletionItemProvider('typescript', {
        triggerCharacters: ['"', "'"],
        provideCompletionItems: (model, position) => {
          const textUntilPosition = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          })

          const match = textUntilPosition.match(/import {?\s?\w*\s?}? from ('|")(\w*)/)

          if (!match) {
            return { suggestions: [] }
          }
          const word = model.getWordUntilPosition(position)
          const range: IRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          }

          return {
            suggestions: createDependencyProposals(monaco, range),
          }
        },
      })
      // monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri))

      return () => {
        lib.dispose()
      }
    }
  }, [monaco])

  return (
    <Content>
      <Title>{data.title}</Title>
      <Wrapper>
        <Finder />
        <EditorContainer>
          <Editor
            theme="vs-dark"
            height="30rem"
            onMount={(e) => (monacoRef.current = e)}
            language={docStore.currentFile.language}
            value={docStore.currentFile.value}
            path={docStore.currentFile.name}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              padding: { top: 8, bottom: 8 },
              glyphMargin: false,
              tabSize: 2,
              fontSize: 14,
              scrollBeyondLastLine: false,
              lineDecorationsWidth: 4,
            }}
          />
          <Run className="No-Select">
            <img src="/play-solid.svg" alt="play" />
            실행
          </Run>
          <StatusBar>
            <StatusBarItems>Read-Only</StatusBarItems>
            <StatusBarItems>{languages[docStore.currentFile.language].name}</StatusBarItems>
          </StatusBar>
        </EditorContainer>
      </Wrapper>
      <Wrapper>
        <Demo id="terminal">
          {/* <iframe
            src="http://localhost:5000/dist/Fly@recyclerview1/index.html"
            frameBorder="0"
            title="demo_view"
          ></iframe> */}
        </Demo>
      </Wrapper>
      <Wrapper style={{ flexDirection: 'column', marginTop: '2rem' }}>
        <Article className="markdown-body">
          <h2>RecyclerView</h2>
          <p>
            RecyclerView를 사용하다보면, 중간에 일부 항목을 삭제하는 경우가 있습니다.
            <br />
            서버에서 데이터를 삭제함과 동시에, 앱 UI에서도 삭제처리를 해줘야하는데요.{' '}
          </p>
          <p>처리하는 방식은 보통 아래 2가지와 같습니다. </p>
          <ol>
            <li>이미 불러온 데이터에서 특정 항목만 리스트에서 제거 </li>
            <li>서버 재호출하여 리스트 갱신 (refresh) </li>
          </ol>
          <p>상황에 따라 저는 두가지 경우를 모두 사용합니다. </p>
          <p>이번 포스팅에서는 첫번째 방법으로 처리하는 방법에 대해 알아보겠습니다. </p>
          <p>
            먼저, 특정 항목에 대한 삭제이므로 RecyclerViewAdapter에서 코드를 시작하면 됩니다. 아래는 제가 작성한 코드 중
            일부만을 발췌하였습니다.
          </p>
        </Article>
        <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'stretch', marginBottom: '1.5rem' }}>
          <Icon src="/profile.jpg" width="2.5rem" height="2.5rem" round />
          <div style={{ marginLeft: '0.75rem', fontSize: '1.25rem' }}>비행청소년</div>
        </div>
        <CommentsWrapper style={{ alignSelf: 'stretch' }}>
          <CommentsHeader>등록된 댓글 0</CommentsHeader>
          <CommentsTextarea placeholder="댓글을 입력해보세요" />
        </CommentsWrapper>
      </Wrapper>
    </Content>
  )
})

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 70rem;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 8px;
  overflow: hidden;
`

const EditorContainer = styled.div`
  position: relative;
  flex: 1;
`

const Run = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;
  right: 1.5rem;
  bottom: 2.3rem;
  background-color: #fff;
  padding: 0.3rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  img {
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 0.2rem;
  }
`

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0392e5;
  color: #ffffff;
  height: 1.6rem;
`

const StatusBarItems = styled.div`
  font-size: 0.7rem;
  padding: 0 0.5rem;
  line-height: 1;
`

const Demo = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: #000000;

  iframe {
    height: 100%;
    width: 100%;
  }
`

const Article = styled.article`
  margin-bottom: 3rem;
`

const CommentsWrapper = styled.div``

const CommentsHeader = styled.div`
  margin-bottom: 1rem;
  font-weight: 700;
  color: #345;
  font-size: 1.1rem;
`

const CommentsTextarea = styled.textarea`
  resize: none;
  width: 100%;
  font-size: 16px;
  padding: 1rem;
  border: 1px solid #e1e2e3;
  border-radius: 4px;
  outline: none;
  min-height: 90px;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border: 1px solid #c1c5c9;
  }
`

export default Document
