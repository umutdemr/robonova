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

function Lesson4() {
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
                            Sayısal İşlemler ve Primitiv Yapılar
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Robotlarımızın düşünme ve hesaplama yeteneklerini geliştirmek için matematiksel işlemler büyük önem taşır. Sayısal işlemler, robotların sayılarla dost olmasını sağlar. Bu dersimizde, matematiksel işlemleri gerçekleştirmeyi ve primitiv yapılarla veri işleme yeteneklerini öğreneceğiz. Primitiv yapılar, robotların bellek yönetimi ve veri işleme yetenekleri için temel oluşturur.                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Robotik Zeka</strong><br />
                            Robotlarımızın en dikkat çekici özelliklerinden biri, gelişmiş robotik zeka sistemidir. Bu sistem, robotların kendi başlarına düşünme, analiz yapma ve karar verme yeteneklerine sahip olmalarını sağlar. Matematiksel işlemler ve primitiv yapılar, robotik zeka sistemini güçlendirmek için kullanılır.                       </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Sayısal İşlemler ve Zeka Gelişimi</strong><br />
                            Robotlarımızın matematiksel işlemleri yapabilmesi, zeka gelişimlerine büyük katkı sağlar. Toplama, çıkarma, çarpma, bölme gibi işlemleri başarıyla gerçekleştirebilen robotlar, problemleri daha hızlı çözebilir ve daha akıllı kararlar alabilir.                        </Typography>
                        <pre>
                            <code>
                                {`// Toplama İşlemi
func toplama(sayi1: Nat, sayi2: Nat) : Nat {
  return sayi1 + sayi2;
}

// Çıkarma İşlemi
func cikarma(sayi1: Int, sayi2: Int) : Int {
  return sayi1 - sayi2;
}

// Çarpma İşlemi
func carpma(sayi1: Nat, sayi2: Nat) : Nat {
  return sayi1 * sayi2;
}

// Bölme İşlemi
func bolme(sayi1: Nat, sayi2: Nat) : Nat {
  if (sayi2 == 0) {
    Debug.print("Bir sayı sıfıra bölünemez.");
    return 0;
  } else {
    return sayi1 / sayi2;
  }
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kodlarda, temel matematiksel işlemleri gerçekleştiren fonksiyonlar tanımlanmıştır. Robotlarımız artık bu işlemleri yapabilir hale gelecekler.                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Sayısal İşlemler ve Zeka Gelişimi</strong><br />
                            Robotlarımızın matematiksel işlemleri yapabilmesi, zeka gelişimlerine büyük katkı sağlar. Toplama, çıkarma, çarpma, bölme gibi işlemleri başarıyla gerçekleştirebilen robotlar, problemleri daha hızlı çözebilir ve daha akıllı kararlar alabilir.                        </Typography>
                        <pre>
                            <code>
                                {`var sayi : Nat = 42;
var ondalikSayi : Int = -3;
var dogru : Bool = true;
`}
                            </code>
                        </pre>
                        <Typography>
                            Bu dersle birlikte, robotlarımızın matematiksel işlemleri gerçekleştirebilmesi için temel primitiv yapıları ve veri türlerini öğrendik. Artık, robotlarımız sayılarla dost olacaklar ve zeka gelişimlerine büyük katkı sağlayacaklar.
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

export default Lesson4;
