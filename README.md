
# Quiz Uygulaması - Internet Bilgisayar (ICP) için Motoko Uygulaması

## Açıklama
Bu proje, Motoko programlama dili ve React kullanılarak Internet Bilgisayar (ICP) için geliştirilmiş bir Quiz Uygulamasıdır.
Projenin temel amacı, kimlik doğrulaması yapılmış kullanıcıların katılabileceği 
iş görüşmelerine hazırlanmaları için bir quiz uygulamasıdır.
Kullanıcılar bu uygulama üzerinden quiz sorularını cevaplayabilir ve sonuçlarını görebilirler. 

## Kurulum

Projeyi klonlayın ve gerekli bağımlılıkları yükleyin:

```bash
git clone https://github.com/umutdemr/MulakatApp.git
cd MulakatApp
npm install
```
## Arka Uç İşlevselliği
Projeyi oluşturan arka uç, Motoko'da uygulanmış olup, quiz uygulamasının omurgasını oluşturur. Temel özellikleri şunları içerir:

### Quiz Soru Yönetimi
- Quiz Sorularını Alma: Sorular, HTTP istekleri kullanılarak harici bir API'den alınır.
- Soruları Saklama: Alınan sorular, kesintisiz quiz oturumları için yerel olarak saklanır.

## Kullanıcı Kimlik Doğrulama
- Kimlik Doğrulama Sağlayıcısı: Kullanıcı kimlik doğrulaması için Internet Kimlik İstemcisi ile entegrasyon.
- Oturum Açma Durumu Yönetimi: Kullanıcıların oturum açma durumunu yönetme ve buna göre uygun içeriği görüntüleme.

### Quiz İşleme
- Quiz Formu Gönderimi: Kullanıcıların quiz soruları için gönderimlerini ele alma.
- Puanlama Mekanizması: Kullanıcı cevaplarına göre puanlama yapma ve quiz sonuçlarını görüntüleme.

## Kullanım
Bu projeyi kullanmak için aşağıdaki adımları izleyin:

1. **Internet Bilgisayar Ortamını Başlatın**: Internet Bilgisayar ortamını başlatmak için `dfx start --clean` komutunu çalıştırın.

2. **Canister'lar Oluşturun**: Projeye ait canister'ları oluşturmak için `dfx canister create --all` komutunu çalıştırın.

3. **Projeyi Derleyin**: Projeyi derlemek için `dfx build` komutunu çalıştırın.

4. **Canister'ları Yükleyin**: Oluşturulan canister'ları yüklemek için `dfx canister install --all` komutunu çalıştırın.

5. **Gerekli Paketleri Yükleyin**: Gerekli paketleri yüklemek için `npm install @mui/material @emotion/react @emotion/styled` komutunu çalıştırın.

6. **Uygulamayı Başlatın**: Uygulamayı başlatmak için `npm start` komutunu çalıştırın.

Ortam kurulduktan ve komutlar çalıştırıldıktan sonra, kullanıcılar ön uç uygulamasına erişebilir, quizlere katılabilir ve quiz sonuçlarını görebilirler.

Motoko ve Internet Bilgisayar'ı kullanarak, bu proje Internet Bilgisayar platformunda merkezi olmayan uygulamaların yeteneklerini gösterirken, eğlenceli ve eğitici bir quiz deneyimi sunmayı amaçlamaktadır.

## 1. App Bileşeni
Bu bileşen, uygulamanın ana bileşenidir ve quiz uygulamasının genel akışını yönetir. İşlevleri şunlardır:

useState Hook'ları: Quiz uygulamasının durumunu yönetmek için kullanılır. Bu durumlar arasında sorular, mevcut soru indeksi, kullanıcının cevabı, doğru cevap durumu, skor, kalan süre, doğru cevap sayısı, yanlış cevap sayısı, cevaplanan sorular gibi bilgiler bulunur.
useEffect Hook'ları: Kullanıcının kimlik doğrulamasının durumunu izler ve kullanıcı doğrulandığında soruları getirir.
fetchQuestions Fonksiyonu: Quiz sorularını getirmek için kullanılan asenkron bir işlevdir.
handleNextQuestion Fonksiyonu: Kullanıcının bir sonraki soruya geçmesini sağlar.
handleSubmit Fonksiyonu: Kullanıcının cevabını işler, skoru günceller ve bir sonraki soruya geçer.
Render İşlevi: Kullanıcının kimlik durumuna ve quiz ilerleyişine göre uygun bileşenleri render eder.

## 2. LoggedIn Bileşeni
Bu bileşen, kullanıcının oturum açmış olduğu durumda görüntülenen bileşendir. İşlevleri şunlardır:

useAuth Hook'u: Kimlik doğrulaması bilgilerine erişimi sağlar.
Render İşlevi: Kullanıcının oturum açmış olduğu durumda kimlik bilgisini ve çıkış düğmesini görüntüler.

## 3. LoggedOut Bileşeni
Bu bileşen, kullanıcının oturum açmadığı durumda görüntülenen bileşendir. İşlevleri şunlardır:

useAuth Hook'u: Kimlik doğrulaması bilgilerine erişimi sağlar.
Render İşlevi: Kullanıcının oturum açmadığı durumda oturum açma düğmesini görüntüler.

## 4. QuizForm Bileşeni
Bu bileşen, kullanıcının quiz sorularını görüntüleyip cevaplayabileceği bir formu içerir. İşlevleri şunlardır:

Render İşlevi: Mevcut soruyu ve seçenekleri görüntüler ve kullanıcının cevaplarını işler.

## 5. QuizResults Bileşeni
Bu bileşen, quiz'in sonuçlarını görüntüler. İşlevleri şunlardır:

Render İşlevi: Doğru cevap sayısını, yanlış cevap sayısını ve cevaplanan soruların ayrıntılarını görüntüler.

## 6. Notes Bileşeni
Bu bileşen, kullanıcının notlarını yönetmesini sağlar. Aşağıdaki işlevleri gerçekleştirir:

Notları Getirme: fetchNotes fonksiyonu, başlangıçta ve her not ekleme, tamamlama veya silme işleminden sonra notları getirir.

-Not Ekleme: handleAddNote fonksiyonu, kullanıcının girdiği yeni notu ekler ve ardından notları güncellemek için fetchNotes fonksiyonunu çağırır.

-Not Tamamlama: handleCompleteNote fonksiyonu, kullanıcının belirli bir notu tamamlamasını sağlar ve ardından notları güncellemek için fetchNotes fonksiyonunu çağırır.

-Not Silme: handleDeleteNote fonksiyonu, kullanıcının belirli bir notu silmesini sağlar ve ardından notları güncellemek için fetchNotes fonksiyonunu çağırır.

-Tamamlanmış Notları Temizleme: handleClearCompleted fonksiyonu, tamamlanmış tüm notları siler ve ardından notları güncellemek için fetchNotes fonksiyonunu çağırır.

Bu bileşen, kullanıcının not eklemesine, notları tamamlamasına, silebilmesine ve tamamlanmış notları temizlemesine olanak tanır.
## 6.Use Auth Client Bileşeni
-1. useAuthClient Hook'u
Bu Hook, kimlik doğrulama istemcisini oluşturur ve kimlik doğrulama durumunu yönetir. İşlevleri şunlardır:

useState Hook'ları: Kimlik doğrulama durumunu ve ilişkili bilgileri yönetmek için kullanılır.
useEffect Hook'u: İstemci oluşturulduğunda ve bileşen yüklendiğinde kimlik doğrulama durumunu günceller.
login Fonksiyonu: Kullanıcıyı giriş yaptırır ve kimlik doğrulama durumunu günceller.
updateAuthState Fonksiyonu: Kimlik doğrulama durumunu günceller ve kullanıcı kimlik bilgilerini alır.
logout Fonksiyonu: Kullanıcıyı çıkış yaptırır ve kimlik doğrulama durumunu günceller.
return Değeri: Kimlik doğrulama durumunu ve işlevleri içeren bir nesne döndürür.
-2. AuthProvider Bileşeni
Bu bileşen, useAuthClient Hook'unu kullanarak kimlik doğrulama sağlayıcısını sağlar. İşlevleri şunlardır:

useAuthClient Hook'unu Kullanma: Kimlik doğrulama istemcisini oluşturur ve kimlik doğrulama durumunu yönetmek için kullanır.
Render İşlevi: Kimlik doğrulama durumunu sağlayan bir bağlam değeriyle birlikte çocuk bileşenlerini oluşturur.
-3. useAuth Hook'u
Bu Hook, kimlik doğrulama bilgilerine erişim sağlar. İşlevi şunlardır:

useContext Hook'u Kullanma: Kimlik doğrulama bilgilerini içeren bağlam değerine erişim sağlar.
return Değeri: Kimlik doğrulama bilgilerini içeren bir nesneyi döndürür.
Bu bileşenler, kimlik doğrulama işlevselliğini sağlar ve React uygulamasında kimlik doğrulama ile ilgili işlemleri yönetir.


## Backend

## main.mo 

Internet Computer (ICP) aktörüdür ve harici bir API'den quiz sorularını almak için bir HTTP isteği gönderir. İşlevleri şu şekildedir:
## 1. makeHttpRequest Fonksiyonu
Bu fonksiyon, harici bir API'den quiz sorularını almak için bir HTTP isteği gönderir. İşlevleri şunlardır:

URL Tanımlama: Quiz sorularını almak için kullanılacak URL tanımlanır.
Başlık Bilgileri Oluşturma: HTTP isteği için gerekli başlık bilgileri oluşturulur.
HTTP İsteği Oluşturma: HTTP isteği argümanları oluşturulur ve URL ile başlık bilgileri atanır.
HTTP İsteği Gönderme: Oluşturulan HTTP isteği gönderilir ve yanıt beklenir.
Yanıtın İşlenmesi: Yanıtın gövdesi blob olarak alınır ve metne dönüştürülür.
Yanıtı Döndürme: Alınan metin yanıt olarak döndürülür.
Bu kod parçacığı, ICP üzerinde bir aktör olarak çalışır ve dış bir API ile etkileşim kurarak quiz sorularını alır.

## Notları Getirme (fetchNotes):

fetchNotes fonksiyonu, notları getirmek için getNotes adlı bir endpoint'i çağırır.
Bu endpoint, notları içeren bir dizi döndürür.
Döndürülen notlar, frontendde görüntülenmek üzere kullanılır.

## Not Ekleme (addNote):

addNote fonksiyonu, yeni bir not eklemek için addNote adlı bir endpoint'i çağırır.
Endpoint, bir not açıklamasını parametre olarak alır ve yeni bir not oluşturur.
Oluşturulan notun kimliği (ID), frontendde notun benzersiz bir şekilde tanımlanmasına yardımcı olmak için kullanılır.

## Not Tamamlama (completeNote):

completeNote fonksiyonu, belirli bir notun tamamlandığını işaretlemek için completeNote adlı bir endpoint'i çağırır.
Endpoint, bir notun kimliğini (ID) parametre olarak alır ve bu notun tamamlanmış olarak işaretlenmesini sağlar.

## Notları Gösterme (showNote):

showNote fonksiyonu, tüm notları metin olarak göstermek için showNote adlı bir endpoint'i çağırır.
Endpoint, tüm notları metin olarak içeren bir dize döndürür.
Bu metin, yönetici veya kullanıcılar tarafından görüntülenebilir veya raporlanabilir.

## Tamamlanmış Notları Temizleme (clearNote):

clearNote fonksiyonu, tamamlanmış notları temizlemek için clearNote adlı bir endpoint'i çağırır.
Endpoint, tamamlanmış notları veri yapısından kaldırır ve sadece tamamlanmamış notları tutar.
Bu fonksiyonlar, backend servisinde notları yönetmek için kullanılır. Kullanıcılar, bu fonksiyonları kullanarak not ekleyebilir, düzenleyebilir, tamamlayabilir, silebilir ve listeyebilirler. Bu, kullanıcıların notları etkili bir şekilde yönetmelerini sağlar.

## Types.mo

Types adlı bir Modül içinde yer alan ve HTTP istekleri ve yanıtları ile ilgili türleri tanımlayan bir Motoko Modülüdür. İşlevleri şunlardır:
##  1. HttpRequestArgs Türü
Bu tür, HTTP isteklerini tanımlamak için kullanılır. İçindeki alanlar şunlardır:

url: İstek yapılacak olan URL'i temsil eder.
headers: İstek başlıklarını temsil eden bir dizi.
method: HTTP metodunu belirten bir değer.
## 2. HttpResponsePayload Türü
Bu tür, HTTP yanıtlarını temsil etmek için kullanılır. İçindeki alanlar şunlardır:

status: HTTP yanıt durum kodunu temsil eder.
headers: Yanıt başlıklarını temsil eden bir dizi.
body: Yanıtın gövdesini temsil eden bir Blob.
## 3. HttpHeader Türü
Bu tür, HTTP başlıklarını temsil etmek için kullanılır. İçindeki alanlar şunlardır:

name: Başlık adını temsil eder.
value: Başlık değerini temsil eder.
## 4. HttpMethod Türü
Bu tür, HTTP metodlarını temsil etmek için kullanılır. İçindeki değerler şunlardır:

#get: GET HTTP metodunu temsil eder.
#post: POST HTTP metodunu temsil eder.
#head: HEAD HTTP metodunu temsil eder.
## 5. IC Türü
Bu tür, IC yönetim canister'ını temsil etmek için kullanılır. İçindeki alanlar şunlardır:

http_request: HTTP isteklerini alıp yanıtlarını döndüren bir işlevi temsil eder.
Bu Modül, HTTP istekleri ve yanıtları ile ilgili türleri tanımlar ve kullanımı kolaylaştırır.

-----------------------------------------------------------------------------------------------
![1-1](https://github.com/umutdemr/mulakatapp_final/assets/84879807/b61c6211-3f9f-47b0-bb23-de578c2b555f)
![2-2](https://github.com/umutdemr/mulakatapp_final/assets/84879807/9c1f119d-a283-494b-8f59-acc75852e802)
![3-3](https://github.com/umutdemr/mulakatapp_final/assets/84879807/6d07d69b-e99f-4f4a-be23-8b16f20e9f8d)



https://github.com/umutdemr/mulakatapp_final/assets/84879807/37a89fcc-2fa0-47a8-8bb4-02197054c8f3



https://github.com/umutdemr/mulakatapp_final/assets/84879807/a9821a30-41bb-40a0-b405-2c8d7ad0e0ab


https://github.com/umutdemr/mulakatapp_final/assets/84879807/fd3840fe-e974-49b3-b389-c01838031bab







