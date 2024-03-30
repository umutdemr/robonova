import Blob "mo:base/Blob";
import Types "Types";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";

actor {

  // HTTP isteği gönderen işlev
  public func makeHttpRequest() : async Text {
    // İstek için URL
    let url = "https://quizapi.io/api/v1/questions?apiKey=fS8DeJcObeIb6xG1cYBKpNyuEMNx3Rp1ZaJsbiRj&limit=20";
    Cycles.add(1_603_106_800);

    // İstek için başlık bilgileri
    let request_headers = [
      { name = "User-Agent"; value = "ICP HTTP Client" }
    ];

    // HTTP istek argümanları oluşturuluyor
    let http_request : Types.HttpRequestArgs = {
      url = url;
      headers = request_headers;
      method = #get;
    };

    // HTTP isteği gönderiliyor
    let ic : Types.IC = actor "aaaaa-aa"; // IC yönetim canister'ı
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    // Yanıtın gövdesi blob olarak alınıyor
    let response_body: Blob = http_response.body;

    // Blob'dan metne dönüştürme işlemi
    let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Yanıt metni döndürülüyor
    return decoded_text;
  };
};