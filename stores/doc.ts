import { makeAutoObservable } from 'mobx'
import { File } from '@/types/index'

export class Doc {
  currentFile: File

  setCurrentFile(file: File): void {
    this.currentFile = file
  }

  constructor() {
    makeAutoObservable(this)
  }
}
