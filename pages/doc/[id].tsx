import React from 'react'
import styled from 'styled-components'
import Editor, { useMonaco } from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'

import Content from '@/layouts/content'
import Icon from '@/components/Icon'
import Finder from '@/components/Finder'
import { useStores } from '@/stores'

const data = {
  title: '리사이클러뷰에서 요소 제거하기',
}

const Document = observer(() => {
  const { docStore } = useStores()
  const monaco = useMonaco()

  React.useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
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
            language={docStore.currentFile?.language || ''}
            value={docStore.currentFile?.value || ''}
            options={{
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
        </EditorContainer>
        <Demo>
          <iframe
            src="http://localhost:5000/dist/Fly@recyclerview1/index.html"
            frameBorder="0"
            title="demo_view"
          ></iframe>
        </Demo>
      </Wrapper>
      <Wrapper style={{ flexDirection: 'column', alignItems: 'center', maxWidth: '50rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'stretch', marginBottom: '1.5rem' }}>
          <Icon src="/profile.jpg" width="3rem" height="3rem" round />
          <div style={{ marginLeft: '0.75rem', fontSize: '1.25rem' }}>비행청소년</div>
        </div>
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
            먼저, 특정 항목에 대한 삭제이므로RecyclerViewAdapter에서 코드를 시작하면 됩니다. 아래는 제가 작성한 코드 중
            일부만을 발췌하였습니다.
          </p>
        </Article>
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
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80rem;
  width: 100%;
  padding: 2rem 0;
`

const EditorContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 50rem;
`

const Run = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;
  right: 2rem;
  bottom: 1.2rem;
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

const Demo = styled.div`
  width: 20rem;
  border: 1px solid #d6d7d8;

  iframe {
    height: 100%;
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
`

export default Document
