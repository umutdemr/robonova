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

function Lesson5() {
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
                            Options ve Arrays
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Seçeneklerle Karar Alma (Options)   <br />
                            Robotlarımızın çeşitli durumlarda karar alabilmesi, onların çevreye uyum sağlama yeteneklerini artırır. Option ve Option Blocks kullanarak, robotlarımızın farklı senaryolara nasıl tepki vereceğini belirleyebiliriz.                          </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Options Nedir? <br />
                            Options, bir değerin mevcut olup olmadığını belirtmek için kullanılır. Bu, robotların bir verinin varlığına veya yokluğuna göre farklı eylemler gerçekleştirmesini sağlar.

                        </Typography>
                        <pre>
                            <code>
                                {`// Bir kullanıcının adını opsiyonel olarak saklamak
var kullaniciAdi : ?Text = null;

// Kullanıcı adı tanımlıysa, ekrana yazdır
switch (kullaniciAdi) {
  case (?adi) { Debug.print("Kullanıcı adı: " # adi); };
  case (null) { Debug.print("Kullanıcı adı bulunamadı."); };
}
`}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kodda, kullanıcı adının olup olmadığını kontrol ediyoruz ve buna göre bir mesaj yazdırıyoruz.

                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Dizilerle Veri Organizasyonu (Arrays) <br />
                            Robot ordumuzu daha organize hale getirmek için verileri dizilerde saklıyoruz. Immutable ve Mutable Arrays ile verileri düzenlemek, robotların hızlı ve verimli bir şekilde işlem yapmasını sağlar.                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Mutable Arrays <br />
                            Mutable Arrays, içerdikleri verilerin değiştirilebildiği dizilerdir. Bu, robotların verileri dinamik olarak güncelleyebilmesini sağlar.                        </Typography>
                        <pre>
                            <code>
                                {`var sayilar : [var Nat] = [var 1, var 2, var 3, var 4, var 5];

// Dizinin bir elemanını güncelle
sayilar[2] := 10;

// Diziyi ekrana yazdır
Debug.print("Güncellenmiş Sayılar: " # Debug.show(sayilar));
`}
                            </code>
                        </pre>
                        <Typography>
                            Bu kodda, değiştirilebilir bir dizi tanımlanmıştır ve bu dizinin bir elemanı güncellenmiştir.
                        </Typography>

                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Immutable Arrays <br />
                            Immutable Arrays, içerdikleri verilerin değiştirilemediği dizilerdir. Bu, verilerin güvenliğini sağlar ve beklenmeyen değişiklikleri önler.
                        </Typography>
                        <pre>
                            <code>
                                {`let sayilar : [Nat] = [1, 2, 3, 4, 5];
                                // Diziyi ekrana yazdır
                                Debug.print("Sayılar: " # Debug.show(sayilar));`}
                            </code>
                        </pre>
                        <Typography>
                            Bu kodda, değiştirilemeyen bir dizi tanımlanmıştır ve bu dizinin elemanları ekrana yazdırılmaktadır. <br />
                            Bu dersle birlikte, robotlarımızın farklı senaryolara nasıl tepki vereceğini öğrenerek karar alma yeteneklerini geliştirdik. Ayrıca, veri koleksiyonlarını kullanarak robot ordumuzu daha organize ve verimli hale getirdik. Seçeneklerle karar almayı ve dizilerle veri organizasyonunu öğrenen robotlarımız, artık daha akıllı ve etkili olacaklar.
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

export default Lesson5;
