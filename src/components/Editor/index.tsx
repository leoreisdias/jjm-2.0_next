/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import { Box } from '@material-ui/core';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import { convertToHtmlEditorState } from './functions/convertion';

export default class CustomEditor extends Component<{
  onChange: (state: string) => void;
  text?: string;
}> {
  state = {
    editorState: createEditorStateWithText(this.props.text ?? ''),
    updated: false,
  };

  onChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });

    const contentStateText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.onChange(contentStateText);
  };

  editor: Editor;

  componentDidUpdate(prevProps: { text?: string }) {
    if (prevProps.text !== this.props.text && !this.state.updated) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertToHtmlEditorState(this.props.text)
        ),
      });
      this.setState({ updated: true });
    }
  }

  componentDidMount() {
    this.setState({
      editorState: createEditorStateWithText(this.props.text ?? ''),
    });
  }

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <Box
          style={{
            boxSizing: 'border-box',
            border: '1px solid #ddd',
            cursor: 'text',
            padding: '16px',
            paddingInline: '2rem',
            borderRadius: '2px',
            marginBottom: '2em',
            boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
            background: '#fefefe',
          }}
          onClick={this.focus}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
          <Toolbar>
            {(externalProps) => (
              <>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </>
            )}
          </Toolbar>
        </Box>
      </div>
    );
  }
}
