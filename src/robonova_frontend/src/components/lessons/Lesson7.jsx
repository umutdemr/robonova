import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack, MenuBook } from '@mui/icons-material';
import { Container, ContentWrapper, LessonContent, EditorFooter, CustomButton, TransparentButton } from '../Styles';
import CodeEditor from '../CodeEditor';
import LessonModal from '../LessonModal';
import AlertMessage from '../AlertMessage';
import { fetchCodes7, nextLesson, previousLesson, runCode } from './LessonFunctions';
import { robonova_backend } from 'declarations/robonova_backend';

const Lesson7 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(7);
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
            const fetchedCode = await robonova_backend.checkCode7(currentCode);

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
            case 7:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            🚀 Lesson 7: Packages, Modules, and Actors
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Welcome to Lesson 7! In this lesson, we will learn about <strong>Packages</strong>, <strong>Modules</strong>, and <strong>Actors</strong> in Motoko. These are tools to help us organize and manage our code.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '20px' }}>
                            📦 Packages
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Packages</strong> group related functions and data together.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Example:</strong><br />
                            Here’s a simple package with two functions.
                        </Typography>
                        <pre>
                            <code>
                                {`package RobotManagement {
     public func createRobot(name: Text, model: Text) : Text {
     return "Robot created: " # name # ", " # model;
     };
    
     public func listRobots() : Text {
     return "Listing all robots...";
     };
    };`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            We created a <code>RobotManagement</code> package with functions to create a robot and list all robots.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '20px' }}>
                            🏗️ Modules
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Modules</strong> are units of functionality in Motoko.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Example:</strong><br />
                            Here’s a module with some helper functions.
                        </Typography>
                        <pre>
                            <code>
                                {`module RobotUtilities {
     public func status() : Text {
     return "All systems are operational.";
     };
    
     public func shutDown() : Text {
     return "Robot shutting down.";
     };
    };
    
    import RobotUtilities;
    
    Debug.print(RobotUtilities.status());
    Debug.print(RobotUtilities.shutDown());`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            We defined a <code>RobotUtilities</code> module with functions for status and shutdown.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '20px' }}>
                            🤖 Actors
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Actors</strong> are independent units of computation.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Example:</strong><br />
                            Here’s an actor that can create robots and make them greet us.
                        </Typography>
                        <pre>
                            <code>
                                {`actor Robot {
     var name: Text;
     var model: Text;
    
     public func new(name: Text, model: Text) : async Robot {
     this.name := name;
     this.model := model;
     return this;
     };
    
     public func sayHello() : async Text {
     return "Hello, I'm " # name # "!";
     };
    };
    
    let robot1 = await Robot.new("R2-D2", "Astromech");
    let robot2 = await Robot.new("C-3PO", "Protocol");
    
    Debug.print(await robot1.sayHello());
    Debug.print(await robot2.sayHello());`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            We created a <code>Robot</code> actor with a constructor and a greeting method.
                        </Typography>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Summary:</strong><br />
                            In this lesson, we learned about Packages, Modules, and Actors. Packages group related functions, Modules provide reusable code, and Actors represent independent units of computation.
                        </Typography>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Task:</strong><br />
                            Create a Package, a Module, and an Actor with simple functions. Use them in your code.
                            <pre>
                                <code>
                                    {`package RobotManagement {
     public func createRobot(name: Text, model: Text) : Text {
     return "Robot created: " # name # ", " # model;
     };
    
     public func listRobots() : Text {
     return "Listing all robots...";
     };
    };
    
    module RobotUtilities {
     public func status() : Text {
     return "All systems are operational.";
     };
    
     public func shutDown() : Text {
     return "Robot shutting down.";
     };
    };
    
    import RobotUtilities;
    
    actor RobotCoordinator {
     public func assignTask(task: Text) : async Text {
     return "Task assigned: " # task;
     };
    };
    
    let coordinator = await RobotCoordinator.new();
    Debug.print(await coordinator.assignTask("Clean the lab"));
    
    Debug.print(RobotUtilities.status());
    Debug.print(RobotUtilities.shutDown());`}
                                </code>
                            </pre>
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
                            Congratulations! You have successfully completed all the lessons. We hope you enjoyed learning Motoko and building your robot-themed applications. Keep coding and exploring new technologies!
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

export default Lesson7;
