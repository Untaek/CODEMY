export type File = {
  name: string
  type: FileType
  value: string
  language: string
  children?: File[]
  open?: boolean
}

export type FileType = 'File' | 'Directory'

export type DocumentSourceRoot = {
  id: string
  entry: string
  dependencnies: []
  files: File[]
}

export type SimpleDocument = {
  id: number
  title: string
  name: string
  createdAt: Date
}

export type Document = SimpleDocument & {
  root: DocumentSourceRoot
  readme: string
}
