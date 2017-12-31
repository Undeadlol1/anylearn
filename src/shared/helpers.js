import { convertFromHTML, convertToRaw, ContentState } from 'draft-js'

/**
 * TODO:
 * FIXME: investigate <span> and make actual empty raw format
 */
export function createEmptyRevisionText() {
    const emptyRawData = convertToRaw(ContentState.createFromText('<span>test</span>'))
    return {
      stage0: emptyRawData,
      stage1: emptyRawData,
      stage2: emptyRawData,
      stage3: emptyRawData,
    }
  }