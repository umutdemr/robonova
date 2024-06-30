import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
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

function Lesson3() {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(3);
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
        if (codeValid || currentLesson > 3) {
            setCurrentLesson(currentLesson + 1);
            navigate('/lesson4');
        } else {
            setAlertSeverity('warning');
            setAlertMessage('Verify your code first.');
        }
    };

    const previousLesson = () => {
        if (currentLesson > 2) {
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
            case 3:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px' }}>
                            Functions and Flow Control
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Functions are of great importance for our robots to make the right decisions and perform certain tasks. Functions are like the brains of robots and are the key to teaching them how to behave. In this lesson, we will learn what functions are, how they are defined and used. We will also learn to provide flow control with if-else statements, loops and switch structures.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            What are Functions? <br />
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Functions are blocks of code that perform specific tasks and are made for a specific purpose. For example, a "robotSleep" function can put the robot to sleep, or a "robotMove" function can make the robot move.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Function Definition <br />
                            When defining functions, the name of the function, its parameters (if necessary) and its function are specified. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`func robotSleep(duration: Nat) : async () {
 // Sleeping for a certain period of time
 //...
}

func robotMove(speed: Nat) : async () {
 // The process of moving at a certain speed
 //...
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Function Call <br />
                            By calling functions we define, we can enable robots to perform certain tasks. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`robotSleep(5); // Put the robot to sleep for 5 seconds
robotMove(10); // Move the robot at 10 units of speed
`}
                            </code>
                        </pre>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            If-Else Statements<br />
                            If-else statements enable robots to take different actions based on certain conditions. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`if (speed > 0) {
 robotMove(speed);
} else {
 Debug.print("It does not move because the speed is zero.");
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            loops <br />
                            Loops allow certain operations to be repeated. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`for (i in 1..5) {
 robotMove(i * 10); // Move the robot at different speed each time
}
`}
                            </code>
                        </pre>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Switch Emotes <br />
                            Switch statements allow different operations to be performed depending on different states of a value. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`switch (state) {
 case "wait":
 robotSleep(10);
 break;
 case "move_act":
 robotMove(20);
 break;
 default:
 Debug.print("Unknown situation.");
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            With this lesson, we learned the functions and flow control that are the brains of our robots. Now, we can direct our robots the way we want and have them perform tasks.
                        </Typography>
                    </div>
                );
            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px' }}>
                            Lesson Not Found
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            The content for this lesson is not available.
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

export default Lesson3;
