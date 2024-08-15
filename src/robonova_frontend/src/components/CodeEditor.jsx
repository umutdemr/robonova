import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import Editor from '@monaco-editor/react';
import { EditorContent, EditorHeader, EditorWrapper } from '../components/Styles';

const CodeEditor = ({ code, setCode, editorRef }) => {
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    return (
        <EditorContent>
            <EditorHeader>
                <Typography variant="h6">Main.mo</Typography>
            </EditorHeader>
            <EditorWrapper>
                <Editor
                    height="100%"
                    defaultLanguage="motoko"
                    value={code}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    onChange={handleCodeChange}
                />
            </EditorWrapper>
        </EditorContent>
    );
};

export default CodeEditor;
