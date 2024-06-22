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

function Lesson6() {
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(6);

    const nextLesson = () => {
        setCurrentLesson(currentLesson + 1);
    };

    const renderLessonContent = () => {
        switch (currentLesson) {
            case 6:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Kayıtlar, Nesneler ve Sınıflandırmalar
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Robotlarımızın benzersiz kişiliklerini ve özelliklerini tanımlamak için kayıtlar, nesneler ve sınıflar konularına dalıyoruz. Bu dersle, her robotun kendine özgü bir kimliği ve işlevi olacak. Artık robotlarımız gerçek birer birey gibi hareket edebilecekler.
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>
                            Kayıtlar (Records)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Kayıtlar, robotlarımızın özelliklerini ve durumlarını saklamak için kullanabileceğimiz yapı taşlarıdır. Bir robotun farklı özelliklerini bir araya getirerek, onun kimliğini tanımlayabiliriz.
                        </Typography>
                        <pre>
                            <code>
                                {`type Robot = {
  ad: Text;
  model: Text;
  aktif: Bool;
};

let robot1: Robot = {
  ad = "R2-D2";
  model = "Astromech";
  aktif = true;
};

// Robotun bilgilerini yazdır
Debug.print("Robot Adı: " # robot1.ad);
Debug.print("Model: " # robot1.model);
Debug.print("Aktif: " # Debug.show(robot1.aktif));`}
                            </code>
                        </pre>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>
                            Nesneler (Objects)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Nesneler, robotlarımızın davranışlarını ve özelliklerini bir arada tutan daha karmaşık yapılardır. Bir robotun hem verilerini hem de bu verilere bağlı işlevlerini saklayabiliriz.
                        </Typography>
                        <pre>
                            <code>
                                {`actor Robot {
  var ad: Text = "R2-D2";
  var model: Text = "Astromech";
  var aktif: Bool = true;

  public func bilgileriYazdir() : async () {
    Debug.print("Robot Adı: " # ad);
    Debug.print("Model: " # model);
    Debug.print("Aktif: " # Debug.show(aktif));
  };
};

// Robotun bilgilerini yazdırma fonksiyonunu çağır
await Robot.bilgileriYazdir();`}
                            </code>
                        </pre>
                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>
                            Sınıflar (Classes)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Sınıflar, robotlarımızın ortak özelliklerini ve davranışlarını tanımlamak için kullanılır. Aynı sınıftan birden fazla robot türeterek, benzer özelliklere sahip farklı robotlar oluşturabiliriz.
                        </Typography>
                        <pre>
                            <code>
                                {`class Robot {
  var ad: Text;
  var model: Text;
  var aktif: Bool;

  public func new(ad: Text, model: Text, aktif: Bool) : Robot {
    ad := ad;
    model := model;
    aktif := aktif;
    return self;
  };

  public func bilgileriYazdir() : async () {
    Debug.print("Robot Adı: " # ad);
    Debug.print("Model: " # model);
    Debug.print("Aktif: " # Debug.show(aktif));
  };
};

let robot1 = Robot("R2-D2", "Astromech", true);
let robot2 = Robot("C-3PO", "Protocol", false);

// Robotların bilgilerini yazdır
await robot1.bilgileriYazdir();
await robot2.bilgileriYazdir();`}
                            </code>
                        </pre>
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
                    </EditorSection>
                </EditorContainer>
            </HeroContainer>
        </DemoContainer>
    );
}

export default Lesson6;
