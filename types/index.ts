export type File = {
  name: string
  type: FileType
  value: string
  language: string
  children?: File[]
  open?: boolean
}

export type FileType = 'File' | 'Directory'
