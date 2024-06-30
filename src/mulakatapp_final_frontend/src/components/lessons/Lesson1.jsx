// Lesson1.js
import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack } from '@mui/icons-material';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { Container, ContentWrapper, LessonContent, EditorFooter } from '../Styles';
import CodeEditor from '../CodeEditor';
import LessonModal from '../LessonModal';
import AlertMessage from '../AlertMessage';
import Lesson2 from './Lesson2';

const Lesson1 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(1);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

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
                console.error('error', error);
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
        if (codeValid || currentLesson > 1) {
            setCurrentLesson(currentLesson + 1);
            navigate('/lesson2');
        } else {
            setAlertSeverity('warning');
            setAlertMessage('Verify your code first.');
        }
    };

    const previousLesson = () => {
        if (currentLesson > 1) {
            setCurrentLesson(currentLesson - 1);
            navigate('/lesson1');
        }
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
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            Motoko Programming Language and Why Motoko?
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#cccccc', marginBottom: '20px' }}>
                            The day you first step into the Robot Factory, you dive into the world of the magical Motoko language. You learn why Motoko was chosen, her strengths, and how she can be used to build a robot army.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#cccccc', marginBottom: '20px' }}>
                            Motoko is a programming language specifically designed for developing modern web applications and services. Reasons for choosing Motoko include:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#cccccc', marginBottom: '20px' }}>
                            Now let's continue with a Motoko code example. The following block of code is a simple "Hello, World!" shows its application:
                        </Typography>
                        <pre>
                            <code>
                                {`actor { public func hello() : async Text { "Hello World" } }`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#cccccc', marginBottom: '20px' }}>
                            In this code, an actor is created and the <code>hello</code> function is defined. This function says "Hello, World!" It prints the message to the console. This example demonstrates the simple syntax and basic structure of Motoko.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#cccccc', marginBottom: '20px' }}>
                            You have now taken your first step into the fascinating world of the Motoko language! In the next lesson, we will learn more about basic data types and variables.
                        </Typography>
                    </div>
                );
            case 2:
                return <Lesson2 />;
            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#ffffff', marginBottom: '20px' }}>
                            Dersler Tamamlandı!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#cccccc', marginBottom: '20px' }}>
                            Tüm dersleri başarıyla tamamladın! Motoko dilindeki yolculuğunda başarılar dileriz.
                        </Typography>
                    </div>
                );
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <Button variant="contained" startIcon={<PlayArrow />} onClick={runCode}>
                    Run Code
                </Button>
                <Button variant="contained" startIcon={<Check />} onClick={fetchCodes}>
                    Check Code
                </Button>
                <Box>
                    <Button variant="contained" onClick={openModal} sx={{ marginRight: '10px' }}>
                        Lessons
                    </Button>
                    <Button variant="contained" startIcon={<ArrowBack />} onClick={previousLesson} sx={{ marginRight: '10px' }}>
                        Back
                    </Button>
                    <Button variant="contained" startIcon={<ArrowForward />} onClick={nextLesson} sx={{ marginRight: '30px' }}>
                        Next
                    </Button>
                </Box>
            </EditorFooter>
            <AlertMessage alertMessage={alertMessage} alertSeverity={alertSeverity} />
            <LessonModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                navigate={navigate}
            />
        </Container>
    );
};

export default Lesson1;
