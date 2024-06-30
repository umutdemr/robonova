import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import CodeEditor from '../CodeEditor';

const Container = styled('div')({
    display: 'flex',
    height: '100vh',
    backgroundColor: 'rgba(8,6,13,255)',
    flexDirection: 'column',
    position: 'relative'
});

const ContentWrapper = styled('div')({
    display: 'flex',
    flex: '1',
    overflow: 'hidden',
    paddingBottom: '80px' // Make room for the footer
});

const LessonContent = styled('div')({
    flex: '1',
    padding: '20px',
    overflowX: 'auto', // Added scroll only for lesson content
    backgroundColor: 'rgba(8,6,13,255)',
    color: '#ffffff',

});

const EditorContent = styled('div')({
    flex: '1',
    padding: '20px',
    backgroundColor: 'rgba(17,13,22,255)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '90px',
    position: 'relative'
});

const EditorHeader = styled('div')({
    padding: '10px 0',
    borderBottom: '1px solid #ffffff',
    marginBottom: '10px',
    color: '#ffffff'
});

const EditorWrapper = styled('div')({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#282c34',
    borderRadius: '8px',
    overflow: 'hidden'
});

const EditorFooter = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderTop: '1px solid #ffffff',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'rgba(17,13,22,255)',
    zIndex: 1000
});

function Lesson2() {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(2);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const PLAYGROUND_ORIGIN = 'https://play.motoko.org';
    const APP_ID = 'MyEditor';

    const fetchCodes = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await mulakatapp_final_backend.checkCode(currentCode);

            if (fetchedCode === 'Kod doğru!') {
                setCodeValid(true);
                setAlertSeverity('success');
                setAlertMessage('The code is correct! Press the "Next Lesson" button to move on to the next lesson.');
            } else {
                setCodeValid(false);
                setAlertSeverity('error');
                setAlertMessage('The code is wrong! Please check your code.');
            }
        } catch (error) {
            console.error('Error checking code:', error);
            setAlertSeverity('error');
            setAlertMessage('The code could not be checked. Please try again.');
        }
    };

    const nextLesson = () => {
        if (codeValid || currentLesson >= 2) {
            setCurrentLesson(currentLesson + 1);
            navigate(`/lesson${currentLesson + 1}`);
        } else {
            setAlertSeverity('warning');
            setAlertMessage('Verify your code first.');
        }
    };

    const previousLesson = () => {
        if (currentLesson > 1) {
            setCurrentLesson(currentLesson - 1);
            navigate(`/lesson${currentLesson - 1}`);
        } else {
            setAlertSeverity('warning');
            setAlertMessage('You are already on the first lesson.');
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

    const renderLessonContent = () => {
        switch (currentLesson) {
            case 2:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px' }}>
                            Data World of Robots
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            What are Data Types?
                            In the world of robots, data types specify the type of data and how it is stored. The simple data types we have encountered so far are:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <ul>
                                <li>
                                    Text: Used for text data. For example: "Hello, World!".
                                </li>
                                <li>
                                    Nat: Represents natural numbers. For example: 42.
                                </li>
                                <li>
                                    Int: Represents integers. For example: -10.
                                </li>
                                <li>
                                    Bool: Represents logical values. For example: true or false.
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Variables and Their Usage<br></br>
                            Variables are symbolically named places where robots store their current states and information. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`var userName : Text = "Tony Stark";
var userAge : Nat = 40;
var verified : Bool = true;`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Using these variables we can direct our robots and make their decisions:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Variable Definition and Assignment <br />
                            To define a variable, the name and data type are specified and then a value is assigned. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`userName := "Iron Man";
userAge := 45;
verified := false;`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            With this lesson, we learned how to use data types and variables in the inner world of our robots. Now, we can use this information in our applications to make our robots smarter and more functional.
                        </Typography>
                    </div>
                );

            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Dersler Tamamlandı!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Tüm dersleri başarıyla tamamladın! Motoko dilindeki yolculuğunda başarılar dileriz.
                        </Typography>
                    </div>
                );
        }
    };

    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {renderLessonContent()}
                </LessonContent>
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
            </ContentWrapper>
            <EditorFooter>
                <Button variant="contained" startIcon={<PlayArrow />} onClick={runCode}>
                    Run Code
                </Button>
                <Button variant="contained" startIcon={<Check />} onClick={fetchCodes}>
                    Check Code
                </Button>
                <Box>
                    <Button variant="contained" startIcon={<ArrowBack />} onClick={previousLesson} sx={{ marginRight: '10px' }}>
                        Back
                    </Button>
                    <Button variant="contained" startIcon={<ArrowForward />} onClick={nextLesson} sx={{ marginRight: '30px' }}>
                        Next
                    </Button>
                </Box>
            </EditorFooter>
            {alertMessage && (
                <Alert severity={alertSeverity} sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', marginBottom: '60px', zIndex: 1001 }}>
                    {alertMessage}
                </Alert>
            )}
        </Container>
    );
}

export default Lesson2;
