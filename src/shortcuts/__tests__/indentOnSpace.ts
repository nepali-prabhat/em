import { RANKED_ROOT, ROOT_TOKEN } from '../../constants'
import { exportContext, rankThoughtsFirstMatch } from '../../selectors'
import { importText, setCursor } from '../../action-creators'
import { createTestStore } from '../../test-helpers/createTestStore'
import indentOnSpace from '../indentOnSpace'
import executeShortcut from '../../test-helpers/executeShortcut'

it('indent on adding space at the beginning of the thought', () => {

  const store = createTestStore()

  store.dispatch(importText({
    path: RANKED_ROOT,
    text: `
        - a
          - b
            - c
            - d
  ` }))

  store.dispatch(setCursor({ path: rankThoughtsFirstMatch(store.getState(), ['a', 'b', 'd']) }))

  executeShortcut(indentOnSpace, { store })

  const exported = exportContext(store.getState(), [ROOT_TOKEN], 'text/plain')

  const expectedOutput = `- ${ROOT_TOKEN}
  - a
    - b
      - c
        - d`

  expect(exported).toEqual(expectedOutput)
})

it('prevent indent on adding space at the beginning of the immovable thought', () => {

  const store = createTestStore()

  store.dispatch(importText({
    path: RANKED_ROOT,
    text: `
        - a
          - b
            - c
            - d
              - =immovable
  ` }))

  store.dispatch(setCursor({ path: rankThoughtsFirstMatch(store.getState(), ['a', 'b', 'd']) }))

  executeShortcut(indentOnSpace, { store })

  const exported = exportContext(store.getState(), [ROOT_TOKEN], 'text/plain')

  // indent shouldn't happen and output should remain the same
  const expectedOutput = `- ${ROOT_TOKEN}
  - a
    - b
      - c
      - d
        - =immovable`

  expect(exported).toEqual(expectedOutput)
})
