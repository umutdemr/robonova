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

function Lesson2() {
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
                            Robotların Veri Dünyası
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Veri Türleri Nedir?
                            Robotların dünyasında, veri türleri verilerin türünü ve nasıl saklandığını belirtir. Şu ana kadar karşımıza çıkan basit veri türleri şunlardır:                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <ul>
                                <li>
                                    Text: Metin verileri için kullanılır. Örneğin: "Hello, World!".
                                </li>
                                <li>
                                    Nat: Doğal sayıları temsil eder. Örneğin: 42.
                                </li>
                                <li>
                                    Int: Tam sayıları temsil eder. Örneğin: -10.
                                </li>
                                <li>
                                    Bool: Mantıksal değerleri temsil eder. Örneğin: true veya false.
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Değişkenler ve Kullanımı<br></br>
                            Değişkenler, robotların anlık durumlarını ve bilgilerini sakladıkları sembolik isimlendirilmiş yerlerdir. Örneğin:
                        </Typography>
                        <pre>
                            <code>
                                {`var kullaniciAdi : Text = "Tony Stark";
var kullaniciYasi : Nat = 40;
var dogrulandi : Bool = true;`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu değişkenleri kullanarak robotlarımızı yönlendirebilir ve kararlarını alabiliriz:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Değişken Tanımlama ve Atama <br />
                            Değişken tanımlamak için, isim ve veri türü belirtilir ve ardından bir değer ataması yapılır. Örneğin:
                        </Typography>
                        <pre>
                            <code>
                                {`kullaniciAdi := "Iron Man";
kullaniciYasi := 45;
dogrulandi := false;
`}
                            </code>
                        </pre>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu dersle birlikte, robotlarımızın iç dünyasındaki veri türleri ve değişkenlerin nasıl kullanıldığını öğrenmiş olduk. Şimdi, bu bilgileri uygulamalarımızda kullanarak robotlarımızın daha akıllı ve işlevsel olmasını sağlayabiliriz.
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

export default Lesson2;
