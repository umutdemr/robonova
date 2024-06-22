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

function Lesson3() {
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
                            Fonksiyonlar ve Akış Kontrolü                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Robotlarımızın doğru kararlar alması ve belirli görevleri yerine getirmesi için fonksiyonlar büyük önem taşır. Fonksiyonlar, robotların beyni gibidir ve onlara nasıl davranacaklarını öğretmenin anahtarıdır. Bu dersimizde fonksiyonların ne olduğunu, nasıl tanımlandığını ve kullanıldığını öğreneceğiz. Ayrıca, if-else ifadeleri, döngüler ve switch yapıları ile akış kontrolünü sağlamayı öğreneceğiz.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Fonksiyonlar Nedir? <br />                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Fonksiyonlar, belirli görevleri yerine getiren ve belirli bir amaç için yapılan kod bloklarıdır. Örneğin, bir "robotUyu" fonksiyonu, robotu uyutabilir veya "robotHareketEt" fonksiyonu, robotun hareket etmesini sağlayabilir.                        </Typography>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Fonksiyon Tanımlama <br />
                            Fonksiyonlar tanımlanırken, fonksiyonun adı, parametreleri (gerekirse) ve işlevi belirtilir. Örneğin:

                        </Typography>
                        <pre>
                            <code>
                                {`func robotUyu(sure: Nat) : async () {
  // Belirli bir süre uyuma işlemi
  // ...
}

func robotHareketEt(hiz: Nat) : async () {
  // Belirli bir hızda hareket etme işlemi
  // ...
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Fonksiyon Çağrısı <br />
                            Tanımladığımız fonksiyonları çağırarak, robotların belirli görevleri yerine getirmesini sağlayabiliriz. Örneğin:                       </Typography>
                        <pre>
                            <code>
                                {`robotUyu(5); // Robotu 5 saniye uyut
robotHareketEt(10); // Robotu 10 birim hızda hareket ettir
`}
                            </code>
                        </pre>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            If-Else İfadeleri <br />
                            If-else ifadeleri, robotların belirli koşullara göre farklı işlemler yapmasını sağlar. Örneğin:
                        </Typography>
                        <pre>
                            <code>
                                {`if (hiz > 0) {
  robotHareketEt(hiz);
} else {
  Debug.print("Hız sıfır olduğu için hareket etmiyor.");
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Döngüler <br />
                            Döngüler, belirli işlemlerin tekrarlanmasını sağlar. Örneğin:
                        </Typography>
                        <pre>
                            <code>
                                {`for (i in 1..5) {
  robotHareketEt(i * 10); // Robotu her seferinde farklı hızda hareket ettir
}
`}
                            </code>
                        </pre>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Switch İfadeleri <br />
                            Switch ifadeleri, bir değerin farklı durumlarına göre farklı işlemler yapılmasını sağlar. Örneğin:

                        </Typography>
                        <pre>
                            <code>
                                {`switch (durum) {
  case "bekle":
    robotUyu(10);
    break;
  case "hareket_et":
    robotHareketEt(20);
    break;
  default:
    Debug.print("Bilinmeyen durum.");
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu dersle birlikte, robotlarımızın beyinleri olan fonksiyonları ve akış kontrolünü öğrendik. Artık, robotlarımızı istediğimiz şekilde yönlendirebilir ve görevleri yerine getirmelerini sağlayabiliriz.                        </Typography>
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

export default Lesson3;
