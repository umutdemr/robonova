import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Editor from '@monaco-editor/react';

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

function Lesson1() {
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(1);

    const nextLesson = () => {
        setCurrentLesson(currentLesson + 1);
    };

    const renderLessonContent = () => {
        switch (currentLesson) {
            case 1:
                return (
                    <div>
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
                            Bu kodda, bir aktör oluşturulmuş ve <code>hello</code> fonksiyonu tanımlanmıştır. Bu fonksiyon, "Merhaba, Dünya!" mesajını konsola yazdırmaktadır. Bu örnek, Motoko'nun basit sözdizimini ve temel yapısını göstermektedir.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Artık Motoko dilinin büyüleyici dünyasına ilk adımını atmış oldun! Bir sonraki derste, temel veri türleri ve değişkenlerle ilgili daha fazla bilgi edineceğiz.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={nextLesson} style={{ marginTop: '20px' }}>
                            Sonraki Ders
                        </Button>
                    </div>
                );
            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Dersler Tamamlandı!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Tüm dersleri başarıyla tamamladın! Motoko dilindeki yolculuğunda başarılar dileriz.
                        </Typography>
                    </div>
                );
        }
    };

    return (
        <DemoContainer>
            <HeroContainer>
                <EditorContainer>
                    <TutorialSection>
                        {renderLessonContent()}
                    </TutorialSection>
                    <EditorSection>
                        <iframe
                            src="https://embed.motoko.org"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            title="Motoko code snippet"
                        />
                        {/* <Editor
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
                        </Button> */}
                    </EditorSection>
                </EditorContainer>
            </HeroContainer>
        </DemoContainer>
    );
}

export default Lesson1;
