import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';

const DemoContainer = styled('div')({
    fontFamily: 'Outfit',
    padding: '50px',
    backgroundColor: 'rgba(0, 5, 57, 1)',
    paddingTop: '120px'
});

const HeroContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '50px',
});

const EditorContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px',
});

const TutorialSection = styled('div')({
    flex: '1',
    padding: '5px',
});

const EditorSection = styled('div')({
    flex: '1',
    padding: '20px',
});

function Demo() {
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);

    const PLAYGROUND_ORIGIN = 'https://play.motoko.org';
    const APP_ID = 'MyEditor';

    useEffect(() => {
        fetchCodes();
    }, []);

    const fetchCodes = async () => {
        try {
            const currentCode = editorRef.current.getValue(); // Kullanıcının yazdığı kodu alıyoruz
            const fetchedCode = await mulakatapp_final_backend.checkCode(currentCode); // Kullanıcının yazdığı kodu geçiriyoruz
            console.log('Fetched Code:', fetchedCode); // Backendden gelen sonucu konsola yazdır
            console.log(currentCode)
        } catch (error) {
            console.error('Error checking code:', error);
        }
    };


    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    // const checkCode = () => {
    //     const correctCode = `actor { public func hello() : async Text { "Hello World" } }`.trim();
    //     if (code.trim() === correctCode) {
    //         console.log('Kod doğru!');
    //     } else {
    //         console.log('Kod yanlış!');
    //     }
    // };

    const runCode = () => {
        const currentCode = editorRef.current.getValue();

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

    return (
        <DemoContainer>
            <HeroContainer>
                <EditorContainer>
                    <TutorialSection>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Motoko Programlama Dili ve Neden Motoko?
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Robot Fabrikası'na ilk adımını attığın gün, büyülü Motoko dilinin dünyasına dalıyorsun. Motoko'nun neden tercih edildiğini, güçlü yanlarını ve robot ordusu inşa etmede nasıl kullanılabileceğini öğreniyorsun.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Motoko, modern web uygulamaları ve hizmetlerini geliştirmek için özel olarak tasarlanmış bir programlama dilidir. Motoko'nun tercih edilme nedenleri arasında şunlar bulunur:
                        </Typography>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Şimdi bir Motoko kod örneğiyle devam edelim. Aşağıdaki kod bloğu, basit bir "Merhaba, Dünya!" uygulamasını göstermektedir:
                        </Typography>
                        <pre>
                            <code>
                                {`actor { public func hello() : async Text { "Hello World" } }`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kodda, bir aktör oluşturulmuş ve <code>main</code> fonksiyonu tanımlanmıştır. Bu fonksiyon, "Merhaba, Dünya!" mesajını konsola yazdırmaktadır. Bu örnek, Motoko'nun basit sözdizimini ve temel yapısını göstermektedir.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Artık Motoko dilinin büyüleyici dünyasına ilk adımını atmış oldun! Bir sonraki derste, temel veri türleri ve değişkenlerle ilgili daha fazla bilgi edineceğiz.
                        </Typography>

                    </TutorialSection>

                    <EditorSection>
                        <iframe
                            src="https://embed.motoko.org"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            title="Motoko code snippet"
                        />
                        <Editor
                            height="90vh"
                            defaultLanguage="motoko"
                            value={code}
                            theme="vs-dark"
                            onMount={handleEditorDidMount}
                            onChange={handleCodeChange}
                        />
                        <Button variant="contained" color="primary" onClick={runCode} style={{ marginTop: '20px' }}>
                            Run Code
                        </Button>
                        <Button variant="contained" color="secondary" onClick={fetchCodes} style={{ marginTop: '20px' }}>
                            Check Code
                        </Button>
                    </EditorSection>
                </EditorContainer>
            </HeroContainer>
        </DemoContainer>
    );
}

export default Demo;
