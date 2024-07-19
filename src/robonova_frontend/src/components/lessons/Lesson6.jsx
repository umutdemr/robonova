import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack, MenuBook } from '@mui/icons-material';
import { Container, ContentWrapper, LessonContent, EditorFooter, CustomButton, TransparentButton } from '../Styles';
import CodeEditor from '../CodeEditor';
import LessonModal from '../LessonModal';
import AlertMessage from '../AlertMessage';
import { fetchCodes6, nextLesson, previousLesson, runCode } from './LessonFunctions';
import { robonova_backend } from 'declarations/robonova_backend';

const Lesson6 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(6);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNextLesson = () => {
        nextLesson(codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await robonova_backend.checkCode6(currentCode);

            if (fetchedCode === 'Code is correct') {
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

    const renderLessonContent = () => {
        switch (currentLesson) {
            case 6:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            🤖 Records, Objects and Classes
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Welcome to Lesson 6! In this lesson, we will explore how to create and use Records, Objects, and Classes to define our robots.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '20px' }}>
                            🏷️ What Are Records?
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            A <strong>Record</strong> in Motoko groups related data together. Let's create a simple Record for a robot.
                        </Typography>
                        <pre>
                            <code>
                                {`type Robot = {
        name: Text;
        model: Text;
        active: Bool;
    };
    
    let robot1: Robot = {
        name = "R2-D2";
        model = "Astromech";
        active = true;
    };`}
                            </code>
                        </pre>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '20px' }}>
                            🧩 Exploring Objects
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Objects</strong> can store data and methods. Here's an example of a simple object for a robot.
                        </Typography>
                        <pre>
                            <code>
                                {`actor Robot {
        var name: Text = "R2-D2";
        var model: Text = "Astromech";
        var active: Bool = true;
    
        public func printInfo() : async () {
            Debug.print("Name: " # name);
            Debug.print("Model: " # model);
            Debug.print("Active: " # Debug.show(active));
        };
    };
    
    let robot = Robot;
    await robot.printInfo();`}
                            </code>
                        </pre>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '20px' }}>
                            🏫 Understanding Classes
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Classes</strong> are blueprints for creating objects. Here's a simple class for a robot.
                        </Typography>
                        <pre>
                            <code>
                                {`class Robot {
        var name: Text;
        var model: Text;
        var active: Bool;
    
        public func new(name: Text, model: Text, active: Bool): Robot {
            name := name;
            model := model;
            active := active;
            return self;
        };
    
        public func printInfo() : async () {
            Debug.print("Name: " # name);
            Debug.print("Model: " # model);
            Debug.print("Active: " # Debug.show(active));
        };
    };
    
    let robot1 = Robot("R2-D2", "Astromech", true);
    await robot1.printInfo();`}
                            </code>
                        </pre>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Task:</strong><br />
                            Write a Record for a robot with fields: <code>name</code>, <code>model</code>, and <code>active</code>. Create an Object with a method to print its info, and a Class to manage multiple robots.
                        </Typography>
                    </div>
                );
            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            🎉 Lessons Completed!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Congratulations! You have successfully completed all the lessons. Keep coding and exploring new technologies!
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
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <TransparentButton startIcon={<MenuBook />} onClick={openModal} sx={{ marginRight: '10px' }}>
                    Robot Factory Lessons
                </TransparentButton>
                <Box display="flex" gap={2}>
                    <CustomButton variant="contained" startIcon={<PlayArrow />} onClick={() => runCode(editorRef, playgroundWindow, setPlaygroundWindow)}>
                        Run Code
                    </CustomButton>
                    <TransparentButton onClick={handleCheckCode} startIcon={<Check />}>
                        Check Code
                    </TransparentButton>
                </Box>
                <Box display="flex" gap={2} sx={{ paddingRight: '20px' }}>
                    <CustomButton variant="contained" startIcon={<ArrowBack />} onClick={() => previousLesson(currentLesson, setCurrentLesson, navigate)}>
                        Back
                    </CustomButton>
                    <CustomButton variant="contained" startIcon={<ArrowForward />} onClick={handleNextLesson}>
                        Next
                    </CustomButton>
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

export default Lesson6;
