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
import Lesson6Model from '../models/Lesson6Model';

const Lesson6 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(``);
    const [currentLesson, setCurrentLesson] = useState(6);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRobotModel, setShowRobotModel] = useState(false);
    const [robotType, setRobotType] = useState('');
    const [robotName, setRobotName] = useState('');
    const [robotActive, setRobotActive] = useState(false);

    const handleRunCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedRobot = await robonova_backend.roboCheckCode(currentCode);

            if (fetchedRobot && fetchedRobot.length > 0) {
                const robot = fetchedRobot[0];
                console.log("Robot:", robot);

                if (robot.active) {
                    setRobotName(robot.name);
                    setRobotActive(true);
                    setAlertSeverity('success');
                    setAlertMessage(`${robot.name} active and ready to use!`);

                    // Model türüne göre robotu güncelle
                    if (robot.model === "Astromech") {
                        setRobotType("Astromech");
                    } else if (robot.model === "Mechdroid") {
                        setRobotType("Mechdroid");
                    } else {
                        setAlertSeverity('error');
                        setAlertMessage('Invalid model type. Please try again.');
                        setRobotType('');
                    }
                } else {
                    setRobotName(robot.name);
                    setRobotActive(false);
                    setAlertSeverity('warning');
                    setAlertMessage(`${robot.name} is not active at the moment.`);
                }
            } else {
                setAlertSeverity('error');
                setAlertMessage('No robot information was received.');
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('An error has occurred. Please try again.');
        }
    };

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
                            Welcome to Lesson 6! In this lesson, we will dive into advanced concepts like Records, Objects, and Classes to give our robots unique personalities and abilities. Just like humans have different jobs and traits, our robots will have their own features and behaviors. Let's explore how we can use these concepts to make our robots more sophisticated and capable!
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            🏷️ What Are Records?
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In Motoko, a Record is a data structure that allows us to group related data together. Think of a Record as a way to bundle different properties of a robot into one single unit. Records are great for defining what a robot is made of, such as its name, model, and whether it is active or not.
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
    };
    
    // Print robot's information
    Debug.print("Robot Name: " # robot1.name);
    Debug.print("Model: " # robot1.model);
    Debug.print("Active: " # Debug.show(robot1.active));
    `}
                                </code>
                            </pre>
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            🧩 Exploring Objects
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Objects in Motoko are more advanced than Records. They can not only store data but also contain methods (functions) that can operate on that data. Imagine an Object as a robot with specific abilities and actions.
                            <pre>
                                <code>
                                    {`actor Robot {
        var name: Text = "R2-D2";
        var model: Text = "Astromech";
        var active: Bool = true;
    
        public func printInformation() : async () {
            Debug.print("Robot Name: " # name);
            Debug.print("Model: " # model);
            Debug.print("Active: " # Debug.show(active));
        };
    };
    
    // Create a new Robot and call the method to print its information
    let robotInstance = Robot;
    await robotInstance.printInformation();
    `}
                                </code>
                            </pre>
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            🏫 Understanding Classes
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Classes in Motoko are templates for creating objects. They define the properties and methods that multiple objects can share. Think of a class as a blueprint for creating robots with similar features but different instances.
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
    
        public func printInformation() : async () {
            Debug.print("Robot Name: " # name);
            Debug.print("Model: " # model);
            Debug.print("Active: " # Debug.show(active));
        };
    };
    
    let robot1 = Robot("R2-D2", "Astromech", true);
    let robot2 = Robot("C-3PO", "Protocol", false);
    
    // Print information for both robots
    await robot1.printInformation();
    await robot2.printInformation();
    `}
                                </code>
                            </pre>
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Summary:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In this lesson, we learned how to use Records, Objects, and Classes in Motoko. Records help us to define simple data structures, Objects allow us to encapsulate data and behaviors, and Classes provide a way to create multiple objects with shared features. With these tools, we can now build robots with unique identities, abilities, and functionalities.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Task:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Write a Record for a robot with the following fields: name, model, and active. Then, create an Object with a method to change the active status and a Class to manage multiple robots and print their details.
                            <pre>
                                <code>
                                    {`type RobotRecord = {
        name: Text;
        model: Text;
        active: Bool;
    };
    
    actor RobotObject {
        var name: Text;
        var model: Text;
        var active: Bool;
    
        public func new(name: Text, model: Text, active: Bool): RobotObject {
            name := name;
            model := model;
            active := active;
            return self;
        };
    
        public func setActive(status: Bool) : async () {
            active := status;
        };
    
        public func printInformation() : async () {
            Debug.print("Robot Name: " # name);
            Debug.print("Model: " # model);
            Debug.print("Active: " # Debug.show(active));
        };
    };
    
    // Define a class for robots
    class RobotClass {
        var name: Text;
        var model: Text;
        var active: Bool;
    
        public func new(name: Text, model: Text, active: Bool): RobotClass {
            name := name;
            model := model;
            active := active;
            return self;
        };
    
        public func printInformation() : async () {
            Debug.print("Robot Name: " # name);
            Debug.print("Model: " # model);
            Debug.print("Active: " # Debug.show(active));
        };
    };
    
    let robot1 = RobotClass("R2-D2", "Astromech", true);
    let robot2 = RobotClass("C-3PO", "Protocol", false);
    await robot1.printInformation();
    await robot2.printInformation();
    `}
                                </code>
                            </pre>
                        </Typography>
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                            <div>
                                <strong>Robot Adı:</strong> {robotName} {/* Robot ismini ekranda göster */}
                            </div>
                            <div>
                                <strong>Durum:</strong> {robotActive ? 'Aktif' : 'Aktif Değil'} {/* Aktiflik durumu */}
                            </div>
                        </div>
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
                    {showRobotModel ? <Lesson6Model robotType={robotType} robotName={robotName} robotActive={true} /> : renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <TransparentButton onClick={handleRunCode} style={{ display: showRobotModel ? "block" : "none" }}>
                    Change Robot Model
                </TransparentButton>
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

export default Lesson6;
