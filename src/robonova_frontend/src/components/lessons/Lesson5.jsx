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
import Lesson5Model from '../models/Lesson5Model';

const Lesson5 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [currentLesson, setCurrentLesson] = useState(5);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRobotModel, setShowRobotModel] = useState(false);
    const [code, setCode] = useState('');
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
            const fetchedCode = await robonova_backend.checkCode5(currentCode);

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
            case 5:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            Options and Arrays 🤖
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Decision Making with Options (Options) 🛠️
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Our robots encounter various situations while performing their duties. In order to make appropriate decisions in these situations, they can check whether the data is available using the Option type. A robot's ability to perform a task may depend on the availability of certain data. For example, a robot needs a security key to open doors.
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontSize: '1.2rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            What is Options? 🤔
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Options is a data type that indicates whether a value exists or not. In the Motoko language, the Option data type is represented by the symbol ?. If a value exists, it is indicated as ?value. If the value is not available, null is used. This allows our robots to check whether a piece of data exists and take action accordingly.
                            <pre>
                                <code>
                                    {`// Optionally store the security key
    var securityKey : ?Text = null;
    
    // If security key is defined, open the door
    switch (securityKey) {
        case (?key) { Debug.print("The door is opened! Key: " # key); };
        case (null) { Debug.print("Security key not found!"); };
    }
    `}
                                </code>
                            </pre>
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontSize: '1.2rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Data Organization with Arrays 📚
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In order for our robots to process data more regularly and efficiently, we store data in arrays. Arrays allow us to store multiple data in a single structure. In this section, we will learn how to use immutable and mutable arrays.
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontSize: '1.2rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Mutable Arrays 🛠️
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Mutable Arrays are arrays in which the data they contain can be changed. This allows robots to dynamically update data. Mutable Arrays are used when certain elements within an array need to be updated or replaced. For example, robots may need to store and update sensor data they collect during a mission in mutable arrays.
                            <pre>
                                <code>
                                    {`var sensorData : [var Nat] = [var 10, var 20, var 30, var 40, var 50];
    
    // Update an element of sensor data
    sensorData[2] := 100;
    
    // Print updated sensor data to the screen
    Debug.print("Updated Sensor Data: " # Debug.show(sensorData));
    `}
                                </code>
                            </pre>
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontSize: '1.2rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Immutable Arrays 🔒
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Immutable Arrays are arrays in which the data they contain cannot be changed. This ensures the security of data and prevents unexpected changes. Immutable Arrays are especially useful for storing data that is fixed and should not change. For example, robots may need to store fixed task lists with immutable arrays.
                            <pre>
                                <code>
                                    {`let taskList : [Text] = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];
    
    // Print the task list to the screen
    Debug.print("Task List: " # Debug.show(taskList));
    `}
                                </code>
                            </pre>
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontSize: '1.2rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Applied Examples and Scenarios 📘
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Now let's reinforce what we have learned with practical examples. In order for our robots to deal with real-world scenarios, we will enable them to make decisions for different situations using Options and Arrays.
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontSize: '1.2rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Sample Scenario: Task Management System 🔄
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Let's imagine that our robots are a task management system. In this system, we will use mutable arrays to keep track of the tasks completed by robots and store the list of defined tasks with immutable arrays.
                            <pre>
                                <code>
                                    {`import Debug "mo:base/Debug";
    
    // immutable array to store the task list
    let taskList : [Text] = ["Open door", "Read sensor data", "Check security system"];
    
    // mutable array to store completed tasks
    var completedTasks : [var Text] = [var "Open the door"];
    
    // Add a recently completed task
    completedTasks[1] := "Read sensor data";
    
    // Print task list and completed tasks to the screen
    Debug.print("Task List: " # Debug.show(taskList));
    Debug.print("Completed Tasks: " # Debug.show(completedTasks));
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
                    {showRobotModel ? <Lesson5Model /> : renderLessonContent()}
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

export default Lesson5;
