
export const nextLesson = (codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage) => {
    if (codeValid) {
        if (currentLesson === 1) {
            setCurrentLesson(2);
            navigate('/Lesson2');
        } else if (currentLesson === 2) {
            setCurrentLesson(3);
            navigate('/Lesson3');
        } else if (currentLesson === 3) {
            setCurrentLesson(4);
            navigate('/Lesson4');
        }
        else if (currentLesson === 4) {
            setCurrentLesson(5);
            navigate('/Lesson5');
        } else if (currentLesson === 5) {
            setCurrentLesson(6);
            navigate('/Lesson6');
        } else if (currentLesson === 6) {
            setCurrentLesson(7);
            navigate('/Lesson7');
        } else if (currentLesson === 7) {
            navigate('/allRobotsModel');
        }
        else {
            setAlertSeverity('info');
            setAlertMessage('Tüm dersleri tamamladınız!');
        }
    } else {
        setAlertSeverity('error');
        setAlertMessage('Your code is not correct. Please check the code.');
    }
};

export const previousLesson = (currentLesson, setCurrentLesson, navigate) => {
    if (currentLesson > 1) {
        setCurrentLesson(currentLesson - 1);
        navigate(`/Lesson${currentLesson - 1}`);
    }
};

export const runCode = (editorRef, playgroundWindow, setPlaygroundWindow) => {
    const currentCode = editorRef.current.getValue();
    const PLAYGROUND_ORIGIN = 'https://play.motoko.org';
    const APP_ID = 'MyEditor';

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

export const saveLessonProgress = (currentLesson, whoamiActor, principal) => {
    if (whoamiActor && principal) {
        whoamiActor.updateLessonProgress(principal, currentLesson).then(response => {
            console.log("Lesson progress saved:", response);
        }).catch(error => {
            console.error("Error saving lesson progress:", error);
        });
    }
};
