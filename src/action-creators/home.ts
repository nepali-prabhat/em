import { restoreCursorBeforeSearch, scrollCursorIntoView, search, setCursor } from '../action-creators'
import { clearSelection } from '../util'
import { Thunk } from '../types'

/** Navigates home and resets the scroll position. */
const home = (): Thunk => (dispatch, getState) => {

  const state = getState()

  if (state.search != null) {
    dispatch(search({ value: null }))
    dispatch(restoreCursorBeforeSearch)
  }
  else {
    dispatch(setCursor({ path: null, cursorHistoryClear: true }))
    clearSelection()
    dispatch(scrollCursorIntoView())
  }
}

export default home
