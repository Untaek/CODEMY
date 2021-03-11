import Content from '@/layouts/content'
import React from 'react'
import styled from 'styled-components'
import Icon from '@/components/Icon'

const data = {
  title: '리사이클러뷰에서 요소 제거하기',
}

const Document = () => {
  const editorArea = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    ;(async () => {
      const CodeMirror = await import('codemirror')
      await import('codemirror/mode/javascript/javascript')
      editorArea.current.innerHTML = null
      CodeMirror.default(editorArea.current, {
        tabSize: 2,
        theme: 'github',
        mode: 'javascript',
        value: `function myScript() {\n  return 100;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
        lineNumbers: true,
      })
    })()
  }, [])

  return (
    <Content>
      <Title>{data.title}</Title>
      <Wrapper>
        <Finder />
        <EditorContainer ref={editorArea}></EditorContainer>
        <Demo />
      </Wrapper>
      <Wrapper style={{ flexDirection: 'column', alignItems: 'center', maxWidth: '55rem' }}>
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
        <div style={{ alignSelf: 'stretch' }}>
          <input type="text" style={{ width: '100%' }} />
        </div>
      </Wrapper>
    </Content>
  )
}

const Title = styled.h1`
  font-size: 2rem;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80rem;
  width: 100%;
  margin-bottom: 2rem;
`

const Finder = styled.div`
  width: 15rem;
  border: 1px solid #d6d7d8;
`

const EditorContainer = styled.div`
  cursor: text;
  flex: 1;
  border: 1px solid #d6d7d8;
  overflow: hidden;
  padding: 0.5rem;
`

const Demo = styled.div`
  width: 15rem;
  border: 1px solid #d6d7d8;
`

const Article = styled.article`
  margin-bottom: 1.5rem;
`

export default Document
