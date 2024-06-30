import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';

// Styling components using MUI's styled function
const DemoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh'
});

const Header = styled(Typography)({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#3f51b5',
    marginBottom: '30px',
    textAlign: 'center'
});

const EditorContainer = styled(Paper)({
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    marginBottom: '30px',
    width: '80%'
});

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: '20px'
});

function Demo() {
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);

    const PLAYGROUND_ORIGIN = 'https://play.motoko.org';
    const APP_ID = 'MyEditor';

    useEffect(() => {
        fetchCodes();
    }, []);

    const fetchCodes = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await mulakatapp_final_backend.checkCode(currentCode);
            console.log('Fetched Code:', fetchedCode);
            console.log(currentCode);
        } catch (error) {
            console.error('Error checking code:', error);
        }
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const runCode = () => {
        const currentCode = editorRef.current.getValue();

        const request = {
            type: 'workplace',
            packages: [],
            actions: [
                {
                    type: 'loadProject',
                    payload: {
                        files: {
                            'Main.mo': currentCode,
                        },
                    },
                },
            ],
            deploy: true,
        };

        const data = APP_ID + JSON.stringify(request);

        if (playgroundWindow && !playgroundWindow.closed) {
            playgroundWindow.postMessage(data, PLAYGROUND_ORIGIN);
        } else {
            if (playgroundWindow) {
                playgroundWindow.close();
            }
            const newWindow = window.open(`${PLAYGROUND_ORIGIN}?post=${APP_ID}`, 'playground');
            setPlaygroundWindow(newWindow);

            const ackInterval = setInterval(() => {
                newWindow.postMessage(data, PLAYGROUND_ORIGIN);
            }, 1000);

            const responseListener = (event) => {
                if (event.origin === PLAYGROUND_ORIGIN && typeof event.data === 'string' && event.data.startsWith(APP_ID)) {
                    const response = JSON.parse(event.data.substring(APP_ID.length));
                    if (response.acknowledge === true) {
                        clearInterval(ackInterval);
                        setAck(true);
                        window.removeEventListener('message', responseListener);
                        console.log('Response:', response);
                    }
                }
            };

            window.addEventListener('message', responseListener);

            newWindow.onbeforeunload = () => {
                setPlaygroundWindow(null);
                setAck(null);
                window.removeEventListener('message', responseListener);
                clearInterval(ackInterval);
            };
        }
    };

    return (
        <DemoContainer>
            <Header>Motoko Playground</Header>
            <EditorContainer>
                <Editor
                    height="50vh"
                    defaultLanguage="motoko"
                    value={code}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    onChange={handleCodeChange}
                />
            </EditorContainer>
            <ButtonContainer>
                <Button variant="contained" color="primary" onClick={runCode}>
                    Run Code
                </Button>
                <Button variant="contained" color="secondary" onClick={fetchCodes}>
                    Check Code
                </Button>
            </ButtonContainer>
        </DemoContainer>
    );
}

export default Demo;
