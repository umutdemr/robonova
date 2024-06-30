import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import Lesson5 from './Lesson5';
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

function Lesson4() {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(4);
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
        if (codeValid || currentLesson > 4) {
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
            navigate('/lesson3');
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
            case 4:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px' }}>
                            Numerical Operations and Primitive Structures                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Mathematical operations are of great importance to improve the thinking and calculation abilities of our robots. Numerical operations make robots friendly with numbers. In this lesson, we will learn how to perform mathematical operations and data processing skills with primitive structures. Primitive structures form the basis for robots' memory management and data processing capabilities. </Typography>                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Robotic Intelligence</strong><br />
                            One of the most remarkable features of our robots is the advanced robotic intelligence system. This system allows robots to have the ability to think, analyze and make decisions on their own. Mathematical operations and primitive structures are used to strengthen the robotic intelligence system. </Typography>                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Numerical Operations and Intelligence Development</strong><br />
                            The ability of our robots to perform mathematical operations contributes greatly to their intelligence development. Robots that can successfully perform operations such as addition, subtraction, multiplication and division can solve problems faster and make smarter decisions. </Typography>                        <pre>
                            <code>
                                {`// Addition
func add(number1: Nat, number2: Nat) : Nat {
 return number1 + number2;
}

// Subtraction
func subtraction(number1: Int, number2: Int): Int {
 return number1 - number2;
}

// Multiplication
func multiplication(number1: Nat, number2: Nat) : Nat {
 return number1 * number2;
}

// Division
func division(number1: Nat, number2: Nat): Nat {
 if (number2 == 0) {
 Debug.print("A number cannot be divided by zero.");
 return 0;
 } else {
 return number1 / number2;
 }
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In these codes, functions that perform basic mathematical operations are defined. Our robots will now be able to perform these operations. </Typography>                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Numerical Operations and Intelligence Development</strong><br />
                            The ability of our robots to perform mathematical operations contributes greatly to their intelligence development. Robots that can successfully perform operations such as addition, subtraction, multiplication and division can solve problems faster and make smarter decisions. </Typography>                        <pre>
                            <code>
                                {`var number : Nat = 42;
var decimalNumber : Int = -3;
var true : Bool = true;
`}
                            </code>
                        </pre>
                        <Typography>
                            With this course, we learned the basic primitive structures and data types so that our robots can perform mathematical operations. From now on, our robots will become friends with numbers and will make a great contribution to their intelligence development.                        </Typography>
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

export default Lesson4;
