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
import Lesson3Model from '../models/Lesson3Model';

const Lesson3 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState('');
    const [currentLesson, setCurrentLesson] = useState(3);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRobotModel, setShowRobotModel] = useState(false);
    const [robotColor, setRobotColor] = useState('');

    const handleNextLesson = () => {
        nextLesson(codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage);
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const handleCheckCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await robonova_backend.checkCode3(currentCode);

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

    const handleCheckColorCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const colorCode = await robonova_backend.changeColor(currentCode);

            if (colorCode === 'success') {
                setCodeValid(true);
                setAlertSeverity('success');
                setAlertMessage('The color is correct! The robot\'s color has been changed.');
                setRobotColor(currentCode);
            } else {
                setCodeValid(false);
                setAlertSeverity('error');
                setAlertMessage('Invalid color! Please enter a valid color such as "red", "blue", "green", or "yellow".');
            }
        } catch (error) {
            console.error('Error checking code:', error);
            setAlertSeverity('error');
            setAlertMessage('The code could not be checked. Please try again.');
        }
    };



    const renderLessonContent = () => (
        <div>
            <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                Functions and Flow Control: Teaching Robots How to Act
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                Welcome to Lesson 3! In this lesson, we will explore how to use functions and flow control to give instructions to our robots. Functions are like commands we give to our robots, and flow control is how robots decide what to do based on different conditions. Let’s learn how to use these tools to control our robots effectively!
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>What is a Function?</strong> <br />
                A function is a reusable block of code designed to perform a specific task. Think of a function as a mini-program within your main program. Functions help us organize our code and make it more manageable by grouping related instructions under a single name.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Defining Functions:</strong> <br />
                To create a function, you need to give it a name, define what information it needs (parameters), and specify what it does (the code inside the function). Here’s how to define two new functions for our robot:
            </Typography>
            <pre>
                <code>
                    {`actor Robot {
    // This function turns the robot's light on or off based on the given state
    public func setLight(state: Bool) : async () {
        if (state) {
            Debug.print("The robot's light is now ON.");
        } else {
            Debug.print("The robot's light is now OFF.");
        }
    }

    // This function adjusts the robot's volume to the specified level
    public func setVolume(level: Nat) : async () {
        if (level >= 0 && level <= 10) {
            Debug.print("The robot's volume is set to " # Debug.show(level) # ".");
        } else {
            Debug.print("Volume level must be between 0 and 10.");
        }
    }
}`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                In this example:
                <br />
                - <code>setLight(state: Bool)</code>: This function turns the robot’s light on or off based on the <code>state</code> parameter. If <code>state</code> is <code>true</code>, the light is ON; if <code>false</code>, the light is OFF.
                <br />
                - <code>setVolume(level: Nat)</code>: This function sets the robot’s volume to a specified level between 0 and 10. If the <code>level</code> is out of this range, it will show an error message.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Calling Functions:</strong> <br />
                After defining functions, you can call them to perform their tasks. Here’s an example of how to call the functions we created:
            </Typography>
            <pre>
                <code>
                    {`func main() : async () {
    // Turn the robot's light on
    await setLight(true);

    // Set the robot's volume to 5
    await setVolume(5);
}`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                In this example:
                <br />
                - <code>await setLight(true);</code>: Turns the robot's light on.
                <br />
                - <code>await setVolume(5);</code>: Sets the robot's volume to 5.
                <br />
                Calling functions allows you to use the tasks you have defined.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Flow Control:</strong> <br />
                Flow control is about managing the order of operations in your code based on conditions or repeated actions. Let's look at some basic concepts of flow control:
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>If-Else Statements:</strong> <br />
                An if-else statement lets the robot make decisions based on conditions. It’s like asking a question: "If this condition is true, do this; otherwise, do that."
            </Typography>
            <pre>
                <code>
                    {`func checkVolume(volume: Nat) : async () {
    if (volume > 10) {
        // Print an error message if the volume is above 10
        Debug.print("Volume must be between 0 and 10.");
    } else {
        // Set the robot's volume to the given level
        await setVolume(volume);
    }
}`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                In this example:
                <br />
                - <code>if (volume  10)</code>: Checks if the volume level is above the maximum allowed.
                <br />
                - <code>await setVolume(volume);</code>: Sets the robot’s volume if the level is within the correct range.
                <br />
                - <code>Debug.print("Volume must be between 0 and 10.");</code>: Prints an error message if the volume is out of range.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Loops:</strong> <br />
                Loops let you repeat actions multiple times. Here’s an example of a loop:
            </Typography>
            <pre>
                <code>
                    {`func adjustVolume() : async () {
    for (i in 1..5) {
        await setVolume(i * 2); // Adjust the volume to increasing levels
    }
}`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                In this example:
                <br />
                - <code>for (i in 1..5)</code>: This loop runs 5 times, with <code>i</code> increasing from 1 to 5.
                <br />
                - <code>await setVolume(i * 2);</code>: Adjusts the volume to increasing levels (2, 4, 6, 8, 10).
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Switch Statements:</strong> <br />
                Switch statements let you perform different actions based on different conditions. Here’s an example:
            </Typography>
            <pre>
                <code>
                    {`func performAction(action: Text) : async () {
    switch (action) {
        case "turnLightOn" {
            await setLight(true);
        };
        case "turnLightOff" {
            await setLight(false);
        };
        case "setVolumeToMax" {
            await setVolume(10);
        };
        default {
            Debug.print("Unknown action.");
        };
    }
}`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                In this example:
                <br />
                - <code>switch (action)</code>: Checks the <code>action</code> parameter.
                <br />
                - <code>case "turnLightOn"</code>: Turns the light on.
                <br />
                - <code>case "turnLightOff"</code>: Turns the light off.
                <br />
                - <code>case "setVolumeToMax"</code>: Sets the volume to the maximum level.
                <br />
                - <code>default</code>: Handles any unknown actions.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Challenge:</strong> <br />
                Write a function called <code>robotTemperatureCheck</code> that takes a temperature value as a parameter and returns a message based on the temperature:
                <br />
                - If the temperature is above 30, return "It's too hot!".
                <br />
                - If the temperature is below 10, return "It's too cold!".
                <br />
                - If the temperature is between 10 and 30, return "The temperature is just right.".
            </Typography>
        </div>
    );

    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {showRobotModel ? <Lesson3Model robotColor={robotColor} /> : renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
                <TransparentButton onClick={handleCheckColorCode} style={{ display: showRobotModel ? 'block' : 'none' }}>
                    Check Color Code
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
                    <CustomButton variant="contained" startIcon={<PlayArrow />} onClick={() => runCode(editorRef)}>
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

export default Lesson3;
