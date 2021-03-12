export type File = {
  name: string
  type: FileType
  value: string
  language: string
}

export type FileType = 'File' | 'Directory'
