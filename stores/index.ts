import React from 'react'
import { Doc } from './doc'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const createStores = () => ({
  docStore: new Doc(),
})

export type TStore = ReturnType<typeof createStores>

export const StoresContext = React.createContext<TStore>(null)

export const useStores: () => TStore = () => React.useContext(StoresContext)
