import React, { useState, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack, MenuBook } from '@mui/icons-material';
import { Container, ContentWrapper, LessonContent, EditorFooter, CustomButton, TransparentButton } from '../Styles';
import CodeEditor from '../CodeEditor';
import LessonModal from '../LessonModal';
import AlertMessage from '../AlertMessage';
import Lesson2 from './Lesson2';
import { nextLesson, previousLesson, runCode } from './LessonFunctions';
import { robonova_backend } from 'declarations/robonova_backend';
import Lesson1Model from '../models/Lesson1Model';

const Lesson1 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [currentLesson, setCurrentLesson] = useState(1);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRobotModel, setShowRobotModel] = useState(false);
    const [code, setCode] = useState("");
    const [isLightOn, setIsLightOn] = useState(true);


    const handleNextLesson = () => {
        nextLesson(codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleLight = () => {
        setIsLightOn(prevState => !prevState);
    };

    const handleCheckCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await robonova_backend.checkCode1(currentCode);

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
            case 1:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            Welcome to the Robot Factory: Your First Steps with Motoko!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Welcome, young robot engineer! 🦾 Today, we begin our adventure in the Robot Factory, where you will learn how to communicate with robots using the Motoko programming language.
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            What is Motoko? 🤖
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Motoko is a powerful language that helps us control our robots and build amazing projects here at the Robot Factory. Just like how a robot needs instructions to perform tasks, we use Motoko to give instructions to our robots.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Why Motoko?</strong> <br />
                            Motoko is designed for building smart contracts on the Internet Computer. It has some great features that make programming easy and fun:
                            <ul>
                                <li><strong>Strong Typing:</strong> This feature ensures we use the correct data types for our variables and functions, which helps prevent mistakes.</li>
                                <li><strong>Concurrency:</strong> Motoko lets us handle multiple tasks at once, just like managing several robots at the same time.</li>
                                <li><strong>Actor Model:</strong> This unique feature lets us create independent units (actors) that can interact with each other in our robot world.</li>
                            </ul>
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Basic Structure of Motoko Code 🧩
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Let’s take a look at a simple Motoko program. This code will help you understand how to write basic instructions for our robots:
                        </Typography>
                        <pre>
                            <code>
                                {`actor {
                                      public func hello() : async Text {
                                         "Hello, World!"
                                         }
                                      }`
                                }
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Understanding the Code:</strong> <br />
                            - <code>actor { }</code>: Think of an actor as a robot in our factory. Each robot has its own set of instructions and state. <br />
                            - <code>public func hello() : async Text { }</code>: This is a function where we define what the robot should do. <br />
                            - <code>"Hello, World!"</code>: This is what the robot will say when we call the <code>hello</code> function.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            What is an Actor? 🛠️
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In Motoko, an <code>actor</code> is like a robot in our factory. Here’s what you need to know:
                            <ul>
                                <li><strong>State Management:</strong> Each actor (robot) can have its own data and keep track of things.</li>
                                <li><strong>Request Handling:</strong> Actors can handle requests and perform actions based on those requests.</li>
                                <li><strong>Concurrency:</strong> Multiple actors can perform tasks at the same time without interfering with each other.</li>
                            </ul>
                            Just like how we build robots to do different tasks, actors help us build and manage different parts of our programs.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Your First Coding Challenge! 🏆
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Now it’s time for you to create your own robot function! Use the template below to make a function that returns a special welcome message.
                        </Typography>
                        <pre>
                            <code>
                                {`actor {
        public func robotGreeting() : async Text {
            "Your welcome message here!"
        }
    }`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Modify the template to return the message <strong>"Welcome to the Robot Factory!"</strong> and test your code using the "Run Code" button.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Question:</strong> <br />
                            Create a function named <code>robotGreeting</code> that returns the message "Welcome to the Robot Factory!". Make sure your function works correctly before moving on to the next lesson.
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#A301E3', marginBottom: '10px', marginTop: '30px', fontFamily: 'Outfit' }}>
                            Understanding the Import Structure 📦
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            In Motoko, we use the <code>import</code> statement to include code from other modules or packages into our program. This helps us reuse code and access useful functions.
                            <ul>
                                <li><strong>Importing Modules:</strong> You can include code from external modules or libraries to use their functionality. For example: <code>import Debug "mo:base/Debug";</code></li>
                                <li><strong>Importing Packages:</strong> Packages can be imported to bring in entire sets of related functions and types. For example: <code>import MyPackage "mo:my_package/MyPackage";</code></li>
                                <li><strong>Syntax:</strong> <code>import [ModuleName] "[PathToModule]";</code></li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Here’s an example of how to import the <code>Debug</code> module:
                            <pre>
                                <code>
                                    {`import Debug "mo:base/Debug";`}
                                </code>
                            </pre>
                            This statement includes the <code>Debug</code> module from the base library, allowing you to use debugging functions like <code>Debug.print()</code> in your code.
                        </Typography>
                    </div>
                );
            case 2:
                return <Lesson2 />;
            default:
                return (
                    <Lesson2 />
                );
        }
    };



    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {showRobotModel ? <Lesson1Model isLightOn={isLightOn} /> : renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <TransparentButton
                    color={isLightOn ? 'primary' : 'secondary'}
                    onClick={toggleLight}
                    sx={{ display: showRobotModel ? 'inline-block' : 'none' }}
                >
                    {isLightOn ? 'Turn Light Off' : 'Turn Light On'}
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

export default Lesson1;