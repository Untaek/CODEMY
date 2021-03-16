import { makeAutoObservable } from 'mobx'
import { File } from '@/types'

export class Doc {
  currentDoc = {
    entry: 'index.html',
    root: [
      {
        name: 'components',
        type: 'Directory',
        children: [
          {
            name: 'index.html12312313123saddsdad1323',
            type: 'File',
            language: 'html',
            value: '<html>\n  <script src=./"main.js"></script>\n</html>\n',
          },
          { name: 'main.js', type: 'File', language: 'javascript', value: `alert('ha')\n` },
        ],
      },
      {
        name: 'readme.md',
        type: 'File',
        language: 'markdown',
        value:
          '## RecyclerView\n\nRecyclerView를 사용하다보면, 중간에 일부 항목을 삭제하는 경우가 있습니다.  \n서버에서 데이터를 삭제함과 동시에, 앱 UI에서도 삭제처리를 해줘야하는데요.\n',
      },
      {
        name: 'index.html',
        type: 'File',
        language: 'html',
        value: '<html>\n  <script src=./"main.js"></script>\n</html>\n',
      },
      { name: 'main.js', type: 'File', language: 'javascript', value: `alert('ha')\n` },
    ] as File[],
  }
  currentFile: File

  setCurrentFile(file: File): void {
    this.currentFile = file
  }

  toggleDirectory(directory: File): void {
    directory.open = !directory.open
  }

  constructor() {
    makeAutoObservable(this)
  }
}
