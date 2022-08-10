import { ContentState, convertFromHTML } from 'draft-js';

export const convertToHtmlEditorState = (html: string) => {
  const blocksFromHTML = convertFromHTML(html);
  const stateEditor = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return stateEditor;
};
