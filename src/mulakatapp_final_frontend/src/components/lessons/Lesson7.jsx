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

function Lesson7() {
    const editorRef = useRef(null);
    const [code, setCode] = useState(`actor { public func hello() : async Text { "Hello World" } }`);
    const [currentLesson, setCurrentLesson] = useState(7);

    const nextLesson = () => {
        setCurrentLesson(currentLesson + 1);
    };

    const renderLessonContent = () => {
        switch (currentLesson) {
            case 7:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Lesson 7: Paketler, Modüller ve Aktörler
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Robot ordumuzun koordinasyonunu sağlamak için paketler, modüller ve aktörlerle tanışıyoruz. Robotların birbirleriyle nasıl iletişim kuracakları ve bilgi alışverişi yapacakları bu dersin ana konusu. Robotlarımız artık bir ekip halinde hareket edebilecekler!
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>
                            Paketler (Packages)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Paketler, kodlarımızı düzenlemek ve yeniden kullanılabilir hale getirmek için kullanılır. Robotlarımızın farklı yeteneklerini ve işlevlerini paketler halinde gruplayabiliriz.
                        </Typography>
                        <pre>
                            <code>
                                {`package RobotHizmetleri {
  public func selamVer() : Text {
    return "Merhaba!";
  };

  public func robotBilgisi(ad: Text, model: Text) : Text {
    return "Robot Adı: " # ad # ", Model: " # model;
  };
};`}
                            </code>
                        </pre>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>
                            Modüller (Modules)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Modüller, daha büyük programların yapı taşlarıdır. Robotlarımızın farklı işlevlerini modüller halinde düzenleyerek, her bir modülün kendi başına çalışabilmesini sağlarız.
                        </Typography>
                        <pre>
                            <code>
                                {`module RobotYardimcisi {
  public func bataryaSeviyesi() : Int {
    return 100;
  };

  public func hareketEt() : Text {
    return "Robot hareket ediyor.";
  };
};

import RobotYardimcisi;

Debug.print(RobotYardimcisi.bataryaSeviyesi());
Debug.print(RobotYardimcisi.hareketEt());`}
                            </code>
                        </pre>

                        <Typography variant="h5" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>
                            Aktörler (Actors)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Aktörler, robotlarımızın birbirleriyle iletişim kurmalarını ve koordineli bir şekilde çalışabilmelerini sağlar. Her robot bir aktör olarak tanımlanabilir ve diğer aktörlerle mesajlaşarak görevlerini yerine getirebilir.
                        </Typography>
                        <pre>
                            <code>
                                {`actor Robot {
  var ad: Text;
  var model: Text;

  public func new(ad: Text, model: Text) : async Robot {
    this.ad := ad;
    this.model := model;
    return this;
  };

  public func selamVer() : async Text {
    return "Merhaba, ben " # ad # "!";
  };
};

let robot1 = await Robot.new("R2-D2", "Astromech");
let robot2 = await Robot.new("C-3PO", "Protocol");

Debug.print(await robot1.selamVer());
Debug.print(await robot2.selamVer());`}
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

export default Lesson7;
