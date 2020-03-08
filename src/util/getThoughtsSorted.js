import { store } from '../store.js'

// util
import { compareByValue } from './compareByValue.js'
import { getThought } from './getThought.js'
import { hashContext } from './hashContext.js'
import { sort } from './sort.js'

/** Generates children sorted by their values. */
export const getThoughtsSorted = (context, thoughtIndex, contextIndex) => {
  thoughtIndex = thoughtIndex || store.getState().thoughtIndex
  contextIndex = contextIndex || store.getState().contextIndex
  return sort(
    (contextIndex[hashContext(context)] || [])
      .filter(child => child.value != null && getThought(child.value, thoughtIndex)),
    compareByValue
  )
}

// useful for debugging
window.getThoughtsSorted = getThoughtsSorted