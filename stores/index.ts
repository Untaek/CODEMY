import React from 'react'

import { Document } from '@/types'
import { Doc } from './doc'

export type HydrationProps = {
  document?: Document
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const createStores = (props?: HydrationProps) => ({
  docStore: new Doc(props),
})

export type TStore = ReturnType<typeof createStores>

export const StoresContext = React.createContext<TStore>(null)

export const useStores: () => TStore = () => React.useContext(StoresContext)
