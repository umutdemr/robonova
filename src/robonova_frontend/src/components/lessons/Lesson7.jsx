import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack, MenuBook } from '@mui/icons-material';
import { Container, ContentWrapper, LessonContent, EditorFooter, CustomButton, TransparentButton } from '../Styles';
import CodeEditor from '../CodeEditor';
import LessonModal from '../LessonModal';
import AlertMessage from '../AlertMessage';
import { nextLesson, previousLesson, runCode } from './LessonFunctions';
import { robonova_backend } from 'declarations/robonova_backend';
import Lesson7Model from '../models/Lesson7Model';

const Lesson7 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [currentLesson, setCurrentLesson] = useState(7);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRobotModel, setShowRobotModel] = useState(false);
    const [code, setCode] = useState("");
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
                            Welcome to Lesson 7! In this lesson, we will explore how to organize and manage our Motoko code using Packages, Modules, and Actors. We will see how these concepts help us structure our code, manage functionality, and enable communication between robots in our robot army!
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            📦 Packages
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In Motoko, Packages help us organize our code into reusable units. They group related functions and data together so we can manage them more effectively.
                            <pre>
                                <code>
                                    {`package RobotServices {
        public func sayHello() : Text {
            return "Hello!";
        };
    
        public func robotInfo(name: Text, model: Text) : Text {
            return "Robot Name: " # name # ", Model: " # model;
        };
    };
    `}
                                </code>
                            </pre>
                            In this example, we created a RobotServices package with two functions: sayHello to return a greeting message and robotInfo to provide information about a robot.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            🏗️ Modules
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Modules are building blocks for larger Motoko programs. They allow us to organize our functions and data into distinct units of functionality.
                            <pre>
                                <code>
                                    {`module RobotHelper {
        public func batteryLevel() : Int {
            return 100;
        };
    
        public func move() : Text {
            return "The robot is moving.";
        };
    };
    
    import RobotHelper;
    
    Debug.print(RobotHelper.batteryLevel());
    Debug.print(RobotHelper.move());
    `}
                                </code>
                            </pre>
                            Here, we defined a RobotHelper module with two functions: batteryLevel to return the battery level and move to simulate a robot movement. We then imported the module and used these functions.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            🤖 Actors
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Actors are special Motoko constructs that represent independent units of computation. They can maintain state and interact with other actors through messages.
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
    Debug.print(await robot2.sayHello());
    `}
                                </code>
                            </pre>
                            In this example, we created a Robot actor with a constructor to initialize its properties and a sayHello method to return a greeting message. We then created two instances of the actor and printed their greetings.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Summary:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In this lesson, we learned how to use Packages, Modules, and Actors in Motoko. Packages help us organize and reuse code, Modules break down functionality into manageable pieces, and Actors enable communication and coordination between different components. These concepts are essential for building complex and interactive applications.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Task:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Create a Package with functions for robot management, a Module with helper functions, and an Actor with methods for interacting with other robots. Then, use these components in your code.
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
    Debug.print(RobotUtilities.shutDown());
    `}
                                </code>
                            </pre>
                        </Typography>
                    </div>
                );
            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Lesson Completed!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Congratulations on completing the lesson! You are one step closer to becoming a master robot engineer.
                        </Typography>
                    </div>
                );
        }
    };


    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {showRobotModel ? <Lesson7Model /> : renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <TransparentButton
                    onClick={() => setShowRobotModel(!showRobotModel)}
                    sx={{ marginRight: '10px' }}
                >
                    {showRobotModel ? 'Show Lesson' : 'See Robot Model'}
                </TransparentButton>
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
