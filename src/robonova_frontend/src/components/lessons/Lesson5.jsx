import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Check, ArrowForward, ArrowBack, MenuBook } from '@mui/icons-material';
import { Container, ContentWrapper, LessonContent, EditorFooter, CustomButton, TransparentButton } from '../Styles';
import CodeEditor from '../CodeEditor';
import LessonModal from '../LessonModal';
import AlertMessage from '../AlertMessage';
import { fetchCodes5, nextLesson, previousLesson, runCode } from './LessonFunctions';
import { robonova_backend } from 'declarations/robonova_backend';

const Lesson5 = () => {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [code, setCode] = useState(`// Lütfen aşağıdaki yönergeleri izleyerek kodunuzu yazın`);
    const [currentLesson, setCurrentLesson] = useState(5);
    const [playgroundWindow, setPlaygroundWindow] = useState(null);
    const [codeValid, setCodeValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNextLesson = () => {
        nextLesson(codeValid, currentLesson, setCurrentLesson, navigate, setAlertSeverity, setAlertMessage);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckCode = async () => {
        try {
            const currentCode = editorRef.current.getValue();
            const fetchedCode = await robonova_backend.checkCode5(currentCode);

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

    const renderLessonContent = () => {
        switch (currentLesson) {
            case 5:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#A301E3', marginBottom: '20px', paddingTop: '80px', fontFamily: 'Outfit' }}>
                            Options ve Arrays 🤖
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Decision Making with Options (Options) 🛠️</strong><br />
                            Robotlarımız, görevlerini yerine getirirken çeşitli durumlarla karşılaşır. Bu durumlara uygun kararlar verebilmeleri için, Option tipi kullanarak verilerin mevcut olup olmadığını kontrol edebilirler. Bir robotun bir görevi yerine getirmesi, belirli verilerin varlığına bağlı olabilir. Örneğin, bir robotun kapıları açması için bir güvenlik anahtarına ihtiyacı vardır.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Options Nedir? 🤔</strong><br />
                            Options, bir değerin var olup olmadığını belirten bir veri tipidir. Motoko dilinde, Option veri tipi ? sembolü ile gösterilir. Bir değerin mevcut olması durumunda bu değer ? ile birlikte tanımlanır; eğer değer mevcut değilse, null değeri kullanılır. Bu, robotlarımızın bir verinin mevcut olup olmadığını kontrol etmelerini ve bu duruma göre işlem yapmalarını sağlar.
                        </Typography>
                        <pre>
                            <code>
                                {`// Güvenlik anahtarını opsiyonel olarak saklama
    var securityKey : ?Text = null;
    
    // Eğer güvenlik anahtarı tanımlanmışsa, kapıyı aç
    switch (securityKey) {
     case (?key) { Debug.print("Kapı açıldı! Anahtar: " # key); };
     case (null) { Debug.print("Güvenlik anahtarı bulunamadı!"); };
    }
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kod örneğinde, bir güvenlik anahtarının opsiyonel olarak saklandığını ve anahtar mevcutsa kapının açıldığını görüyoruz. Eğer anahtar tanımlanmamışsa, "Güvenlik anahtarı bulunamadı!" mesajı ekrana yazdırılır. Bu, robotlarımızın bir değerin var olup olmadığını kontrol etmesi ve buna göre farklı işlemler yapması için kullanılır.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Data Organization with Arrays 📚</strong><br />
                            Robotlarımızın verileri daha düzenli ve etkin bir şekilde işlemesi için, verileri dizilerde saklarız. Diziler, birden fazla veriyi tek bir yapı içinde saklamamıza olanak tanır. Bu bölümde, immutable (değiştirilemez) ve mutable (değiştirilebilir) dizilerin nasıl kullanıldığını öğreneceğiz.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Mutable Arrays 🛠️</strong><br />
                            Mutable Arrays, içerdikleri verilerin değiştirilebildiği dizilerdir. Bu, robotların verileri dinamik olarak güncelleyebilmesini sağlar. Mutable Arrays, bir dizi içindeki belirli elemanların güncellenmesi veya değiştirilmesi gerektiğinde kullanılır. Örneğin, robotların bir görev sırasında topladıkları sensör verilerini mutable arrays içinde saklaması ve güncellemesi gerekebilir.
                        </Typography>
                        <pre>
                            <code>
                                {`
    var sensorData : [var Nat] = [var 10, var 20, var 30, var 40, var 50];
    
    // Sensör verisinin bir elemanını güncelle
    sensorData[2] := 100;
    
    // Güncellenmiş sensör verilerini ekrana yazdır
    Debug.print("Güncellenmiş Sensör Verileri: " # Debug.show(sensorData));
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kodda, bir mutable array tanımlanmış ve bu array'in bir elemanı güncellenmiştir. Mutable Arrays, özellikle sürekli değişen ve güncellenmesi gereken verilerin saklanmasında kullanışlıdır. Örneğin, robotların gerçek zamanlı olarak topladıkları sensör verilerini saklaması ve güncellemesi gerektiğinde mutable arrays kullanabiliriz.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Immutable Arrays 🔒</strong><br />
                            Immutable Arrays, içerdikleri verilerin değiştirilemediği dizilerdir. Bu, verilerin güvenliğini sağlar ve beklenmedik değişiklikleri önler. Immutable Arrays, özellikle sabit ve değişmemesi gereken verilerin saklanmasında kullanışlıdır. Örneğin, robotların sabit görev listelerini immutable arrays ile saklaması gerekebilir.
                        </Typography>
                        <pre>
                            <code>
                                {`
    let taskList : [Text] = ["Görev 1", "Görev 2", "Görev 3", "Görev 4", "Görev 5"];
    
    // Görev listesini ekrana yazdır
    Debug.print("Görev Listesi: " # Debug.show(taskList));
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kodda, bir immutable array tanımlanmış ve bu array'in elemanları ekrana yazdırılmıştır. Immutable Arrays, özellikle sabit kalması gereken verilerin saklanmasında kullanılır. Bu, verilerin güvenliğini sağlar ve beklenmedik değişiklikleri önler. Immutable Arrays, robotlarımızın verileri güvenli ve sabit bir şekilde saklamasını sağlar.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Uygulamalı Örnekler ve Senaryolar 📘</strong><br />
                            Şimdi öğrendiklerimizi uygulamalı örneklerle pekiştirelim. Robotlarımızın gerçek dünyadaki senaryolarla başa çıkabilmesi için, Option ve Arrays kullanarak farklı durumlar için kararlar vermelerini sağlayacağız.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Örnek Senaryo: Görev Yönetimi Sistemi 🔄</strong><br />
                            Robotlarımızın bir görev yönetim sistemi olduğunu düşünelim. Bu sistemde, robotların tamamladığı görevleri takip etmek için mutable arrays kullanacağız ve tanımlı görevlerin listesini immutable arrays ile saklayacağız.
                        </Typography>
                        <pre>
                            <code>
                                {`import Debug "mo:base/Debug";
    
    // Görev listesini saklamak için immutable array
    let taskList : [Text] = ["Kapıyı aç", "Sensör verilerini oku", "Güvenlik sistemini kontrol et"];
    
    // Tamamlanan görevleri saklamak için mutable array
    var completedTasks : [var Text] = [var "Kapıyı aç"];
    
    // Yeni tamamlanan bir görevi ekle
    completedTasks[1] := "Sensör verilerini oku";
    
    // Görev listesi ve tamamlanan görevleri ekrana yazdır
    Debug.print("Görev Listesi: " # Debug.show(taskList));
    Debug.print("Tamamlanan Görevler: " # Debug.show(completedTasks));
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            Bu kod, robotların görev listesini ve tamamlanan görevleri saklayan basit bir görev yönetim sistemi örneğidir. Görev listesi immutable bir array içinde saklanır, bu da görevlerin sabit kalmasını sağlar. Tamamlanan görevler mutable bir array içinde saklanır, böylece yeni tamamlanan görevler eklenebilir.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Beklenen Kod: ✍️</strong><br />
                            Lütfen yukarıdaki açıklamalara ve örneklere göre, aşağıdaki kod parçacığını oluşturun ve kod editörüne yazın:
                        </Typography>
                        <pre>
                            <code>
                                {`import Debug "mo:base/Debug";
    
    // Kullanıcı adı opsiyonel olarak saklama
    var userName : ?Text = null;
    
    // Eğer kullanıcı adı tanımlanmışsa, ekrana yazdır
    switch (userName) {
     case (?name) { Debug.print("Username: " # name); };
     case (null) { Debug.print("Username not found."); };
    }
    
    // Kullanıcı giriş zamanlarını saklamak için mutable array
    var loginTimes : [var Nat] = [var 1622512800, var 1622599200, var 1622685600];
    
    // Yeni bir giriş zamanı ekle
    loginTimes[3] := 1622772000;
    
    // Giriş zamanlarını ekrana yazdır
    Debug.print("Login Times: " # Debug.show(loginTimes));
    
    // Immutable array örneği
    let numbers : [Nat] = [1, 2, 3, 4, 5];
    // Diziyi ekrana yazdır
    Debug.print("Numbers: " # Debug.show(numbers));
    `}
                            </code>
                        </pre>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Tebrikler! 🎉</strong><br />
                            Bu dersimizde, robotlarımızın Option ve Arrays kullanarak nasıl kararlar verebileceğini ve verileri nasıl düzenleyebileceğini öğrendik. Robotlarımız artık daha esnek ve dinamik bir şekilde verilerle çalışabilecekler.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            <strong>Devam Ediyoruz! 🚀</strong><br />
                            Bir sonraki derste, daha gelişmiş konuları keşfedeceğiz ve farklı özellikleri birleştirerek daha sofistike robot davranışları oluşturacağız. Daha heyecan verici zorluklar ve öğrenme fırsatları için bizi izlemeye devam edin!
                        </Typography>
                    </div>
                );
            default:
                return (
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>
                            Lessons Completed!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                            You have successfully completed all the lessons! We wish you success in your journey in the Motoko language.
                        </Typography>
                    </div>
                );
        }
    };



    return (
        <Container>
            <ContentWrapper>
                <LessonContent>
                    {renderLessonContent()}
                </LessonContent>
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </ContentWrapper>
            <EditorFooter>
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

export default Lesson5;
