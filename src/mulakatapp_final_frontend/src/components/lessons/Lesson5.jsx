import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import Lesson6 from './Lesson6';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

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

function Lesson5() {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(1);
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
        if (codeValid || currentLesson > 5) {
            setCurrentLesson(currentLesson + 1);
            navigate('/lesson5');
        } else {
            setAlertSeverity('warning');
            setAlertMessage('Verify your code first.');
        }
    };

    const previousLesson = () => {
        if (currentLesson > 3) {
            setCurrentLesson(currentLesson - 1);
            navigate('/lesson2');
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
            case 1:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px' }}>
                            Options and Arrays
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Decision Making with Options (Options) <br />
                            The ability of our robots to make decisions in various situations increases their ability to adapt to the environment. Using Option and Option Blocks, we can determine how our robots will react to different scenarios. </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            What is Options? <br />
                            Options is used to indicate whether a value is available or not. This allows robots to perform different actions based on the presence or absence of a piece of data.

                        </Typography>
                        <pre>
                            <code>
                                {`// Optionally storing a user's name
var userName : ?Text = null;

// If the username is defined, print it to the screen
switch (userName) {
 case (?name) { Debug.print("Username: " #name); };
 case (null) { Debug.print("Username not found."); };
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In this code, we check if the username exists and print a message accordingly.

                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Data Organization with Arrays <br />
                            To make our robot army more organized, we store data in arrays. Organizing data with Immutable and Mutable Arrays allows robots to process quickly and efficiently. </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Mutable Arrays <br />
                            Mutable Arrays are arrays in which the data they contain can be changed. This allows robots to dynamically update data. </Typography>
                        <pre>
                            <code>
                                {`var numbers : [var Nat] = [var 1, var 2, var 3, var 4, var 5];

//Update an element of the array
numbers[2] := 10;

// Print the string to the screen
Debug.print("Updated Numbers: " # Debug.show(numbers));
`}
                            </code>
                        </pre>
                        <Typography>
                            In this code, a mutable array is defined and an element of this array is updated.
                        </Typography>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Immutable Arrays <br />
                            Immutable Arrays are arrays in which the data they contain cannot be changed. This ensures the security of data and prevents unexpected changes.
                        </Typography>
                        <pre>
                            <code>
                                {`let numbers : [Nat] = [1, 2, 3, 4, 5];
 // Print the string to the screen
 Debug.print("Numbers: " # Debug.show(numbers));`}
                            </code>
                        </pre>
                        <Typography>
                            In this code, an unchangeable array is defined and the elements of this array are printed to the screen. <br />
                            With this course, we improved our robots' decision-making abilities by learning how to react to different scenarios. We have also made our robot army more organized and efficient by using data collections. Our robots, which learn to make decisions with options and organize data with arrays, will now be smarter and more effective.
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

export default Lesson5;
