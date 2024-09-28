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
import Lesson2Model from '../models/Lesson2Model';

const Lesson2 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState('');
    const [currentLesson, setCurrentLesson] = useState(2);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [showRobotModel, setShowRobotModel] = useState(false);
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');

    const handleNextLesson = () => {
        nextLesson(codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const handleSendUserInfo = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const lines = currentCode.split('\n');

            const name = lines[0] || 'Anonymous';
            const age = Number(lines[1]) || 0;

            const response = await robonova_backend.getUserInfo(name, age);

            setUserName(name);
            setUserAge(age);

            setAlertSeverity('success');
            setAlertMessage(response);
        } catch (error) {
            console.error('Error sending user info:', error);
            setAlertSeverity('error');
            setAlertMessage('An error occurred while sending user info. Please try again.');
        }
    };


    const handleCheckCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await robonova_backend.checkCode2(currentCode);

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
            case 2:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            Exploring the Data World of Robots: Understanding Data Types and Variables
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Congratulations, young engineer! 🎉 You’ve successfully completed your first task at the Robot Factory. Now, it's time to dive deeper into the inner workings of our robots.
                            <br />
                            Today, we will explore how robots use data to perform tasks and make decisions. Just like how you need a map to navigate the factory, our robots use data types and variables to manage their tasks.
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            What Are Data Types? 📊
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In the world of robots, data types define what kind of information we are working with. Think of data types as different kinds of tools in a toolbox. Here are some basic data types we use:
                            <ul>
                                <li><strong>Text:</strong> Used for storing text data. For example, “Hello, Robot!”</li>
                                <li><strong>Nat:</strong> Represents natural numbers (non-negative integers). For example, 5, 42</li>
                                <li><strong>Int:</strong> Represents integers, both positive and negative. For example, -3, 10</li>
                                <li><strong>Bool:</strong> Represents true or false values. For example, true or false</li>
                            </ul>
                            Let’s explore each data type with some examples:
                        </Typography>
                        <pre>
                            <code>
                                {`// Text data type
    var welcomeMessage: Text = "Welcome to the Robot Factory!";
     
    // Nat data type
    var robotAge: Nat = 5;
     
    // Int data type
    var robotBattery: Int = -10;  // Battery level can be negative if it’s discharging
     
    // Bool data type
    var isRobotActive: Bool = true;  // true or false for robot’s state
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Text:</strong> This type is used for strings or sequences of characters. <br />
                            <strong>Nat:</strong> This type is for non-negative integers. <br />
                            <strong>Int:</strong> This type is for both positive and negative integers. <br />
                            <strong>Bool:</strong> This type is used for logical values.
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Variables and Their Usage 🔧
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Variables are like labels for our data. They store information that our robots use to perform tasks. Think of them as the robot’s memory where it stores and retrieves information.
                            <br />
                            To create a variable, we need to give it a name, specify the data type, and then assign it a value. For example:
                        </Typography>
                        <pre>
                            <code>
                                {`// Define a variable to store the robot’s name
    var robotName: Text = "RoboMaster";
     
    // Define a variable to store the robot’s age
    var robotAge: Nat = 5;
     
    // Define a variable to check if the robot is verified
    var isVerified: Bool = true;
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            To update or change the value of a variable, we use the assignment operator (<code>:=</code>). Here’s how we can modify the variables:
                        </Typography>
                        <pre>
                            <code>
                                {`robotName := "RoboMaster";
    robotAge := 6;
    isVerified := false;
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In this lesson, we have learned how to use variables and data types to make decisions and store information for our robots.
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Your Coding Challenge! 🏅
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            It’s time for you to put your new knowledge into practice! Create variables for a robot’s details, just like in the example below.
                            <br />
                            Fill in the blanks to define a robot’s name, age, and verification status.
                        </Typography>
                        <pre>
                            <code>
                                {`actor {
        public func robotInfo() : async Text {
            var robotName: Text = "RoboMaster";
            var robotAge: Nat = 5;
            var isVerified: Bool = true;
    
            // Create a message with the robot's details
            let infoMessage = "Robot Name: " # robotName # ", Age: " # Nat.toText(robotAge) # ", Verified: " # Bool.toText(isVerified);
            return infoMessage;
        }
    }
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Write the <code>robotInfo</code> function to create and display a message with the robot’s name, age, and verification status.
                            <br />
                            Use the template provided above and make sure to fill in the correct values and return the message.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Question:</strong> <br />
                            Define a function <code>robotInfo</code> that returns a message with the robot's name as "RoboMaster", age as 5, and verification status as true. Test your code and ensure the function works as expected.
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
                    {showRobotModel ? <Lesson2Model userName={userName} userAge={userAge} /> : renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <TransparentButton onClick={handleSendUserInfo} style={{ display: showRobotModel ? 'block' : 'none' }}>
                    Send robot infos
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

export default Lesson2;