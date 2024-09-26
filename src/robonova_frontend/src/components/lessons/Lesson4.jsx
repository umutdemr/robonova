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
import Lesson4Model from '../models/Lesson4Model';

const Lesson4 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState('');
    const [currentLesson, setCurrentLesson] = useState(4);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRobotModel, setShowRobotModel] = useState(false);

    const handleNextLesson = () => {
        nextLesson(codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage);
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const handleCheckCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await robonova_backend.checkCode4(currentCode);

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

    const renderLessonContent = () => (
        <div>
            <Typography
                variant="h4"
                component="h2"
                sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}
            >
                Numerical Operations and Primitive Structures 🧮
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                Welcome to Lesson 4! 🎉 In this lesson, we will explore two fundamental concepts in programming: numerical operations and primitive data structures. These concepts are crucial for creating more advanced functionalities in your robot’s code. Let’s dive into these topics and understand how they help in building intelligent robots.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>What Are Numerical Operations?</strong> 🤔📊<br />
                Numerical operations are the mathematical calculations we perform using numbers. In programming, these operations include addition, subtraction, multiplication, and division. These operations are essential for many tasks in programming, from simple calculations to complex algorithms. For our robots, these operations help in tasks like adjusting parameters, calculating distances, or making decisions based on numeric data.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Why Are Numerical Operations Important?</strong> 🌟<br />
                Numerical operations allow our robots to perform various tasks. For example, if you want a robot to move a certain distance, you need to perform calculations to determine how far it should move. If you want a robot to follow a schedule, you might use numerical operations to calculate the time intervals. These calculations make your robot's actions precise and efficient.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Basic Numerical Operations in Motoko</strong> 💻<br />
                In Motoko, we can perform basic numerical operations using functions. Let’s review some examples of these functions:
            </Typography>
            <pre>
                <code>
                    {`
// Addition Operation
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
func division(number1: Nat, number2: Nat) : Nat {
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
                Let’s break down these functions:
                <ul>
                    <li><code>add</code>: This function takes two numbers as inputs and returns their sum. Addition is one of the simplest and most frequently used operations in programming.</li>
                    <li><code>subtraction</code>: This function takes two numbers as inputs and returns the difference between them. It uses the <code>-</code> operator to subtract one number from another.</li>
                    <li><code>multiplication</code>: This function multiplies two numbers and returns the product. It uses the <code>*</code> operator to perform the multiplication.</li>
                    <li><code>division</code>: This function divides one number by another and returns the result. It handles the special case where the divisor is zero to prevent division by zero errors.</li>
                </ul>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Primitive Data Structures</strong> 🗂️<br />
                Primitive data structures are basic building blocks of data manipulation in programming. They represent the simplest forms of data and are essential for creating more complex data structures. In this lesson, we will focus on three fundamental primitive data types in Motoko:
                <ul>
                    <li><strong>Natural Numbers (<code>Nat</code>)</strong>: Represents non-negative whole numbers (0, 1, 2, 3, ...). Used for counting and indexing.</li>
                    <li><strong>Integers (<code>Int</code>)</strong>: Represents whole numbers that can be positive, negative, or zero. Used for calculations where negative values are possible.</li>
                    <li><strong>Booleans (<code>Bool</code>)</strong>: Represents true or false values. Used for making decisions in code based on conditions.</li>
                </ul>
            </Typography>
            <pre>
                <code>
                    {`var number : Nat = 42;
var decimalNumber : Int = -3;
var isVerified : Bool = true;
`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                Let’s examine these variables:
                <ul>
                    <li><code>number</code>: A variable of type <code>Nat</code> assigned the value 42. This represents a non-negative integer.</li>
                    <li><code>decimalNumber</code>: A variable of type <code>Int</code> assigned the value -3. This represents a whole number that can be negative.</li>
                    <li><code>isVerified</code>: A variable of type <code>Bool</code> assigned the value <code>true</code>. This represents a boolean value indicating a true or false condition.</li>
                </ul>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Applying What We’ve Learned: Creating Functions</strong> ✨<br />
                Now that we know about numerical operations and primitive data types, let’s write a function to put this knowledge into practice. Our task is to create a <code>power</code> function that calculates the result of raising a base number to a given exponent.
            </Typography>
            <pre>
                <code>
                    {`func power(base: Nat, exponent: Nat) : Nat {
    var result : Nat = 1; // Initialize the result to 1
    for (i in 1..exponent) {
        result *= base; // Multiply the result by the base for each iteration
    }
    return result; // Return the final result
}
`}
                </code>
            </pre>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                Here’s how the <code>power</code> function works:
                <ul>
                    <li><code>base</code>: The number that will be multiplied by itself.</li>
                    <li><code>exponent</code>: The number of times the base is multiplied by itself.</li>
                    <li><code>result</code>: Starts at 1 and is multiplied by the base <code>exponent</code> times in a loop.</li>
                </ul>
                This function uses a loop to perform the multiplication repeatedly. The <code>for</code> loop runs from 1 to the value of <code>exponent</code>, multiplying the <code>base</code> each time and updating <code>result</code>.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Let’s Practice!</strong> ✏️<br />
                Here’s a question for you to solve. Write the <code>power</code> function using the concepts we’ve covered:
                <pre>
                    <code>
                        {`func power(base: Nat, exponent: Nat) : Nat {
    var result : Nat = 1;
    for (i in 1..exponent) {
        result *= base;
    }
    return result;
}
`}
                    </code>
                </pre>
                Fill in the <code>power</code> function to calculate the power of a number. Try it out and see if you can make the robot perform this calculation correctly!
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                You have now learned how to use numerical operations and primitive data types in Motoko. With these skills, you can start building more complex features for your robots, enhancing their capabilities and intelligence. Keep practicing to become a Motoko master!
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                <strong>Next Steps</strong> 🚀<br />
                In the next lesson, we will explore more advanced topics and see how to combine different features to create more sophisticated robot behaviors. Stay tuned for more exciting challenges and learning opportunities!
            </Typography>
        </div>
    );

    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {showRobotModel ? <Lesson4Model /> : renderLessonContent()}
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

export default Lesson4;
