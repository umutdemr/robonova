
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
https://medium.com/@umut.demir/internet-bilgisayar-icp-i%CC%87%C3%A7in-motoko-ve-react-kullanarak-quiz-uygulamas%C4%B1-geli%C5%9Ftirme-merkezi-238f83a9e74d

https://medium.com/@umut.demir/internet-bilgisayar-icp-merkezi-olmayan-uygulamalar-i%CC%87%C3%A7in-yeni-bir-%C3%A7a%C4%9F-bb205cc90314
-----------------------------------------------------------------------------------------------



https://github.com/umutdemr/mulakatapp_final/assets/84879807/0f3cea2b-df32-4109-be79-b3f80c33722c







