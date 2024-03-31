import Blob "mo:base/Blob";
import Types "Types";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Map "mo:base/HashMap"; 
import Hash "mo:base/Hash";
import Nat "mo:base/Nat"; 
import Iter "mo:base/Iter"; 

actor{

   // HTTP isteği gönderen işlev
  // Bu işlev, belirtilen URL'e bir HTTP GET isteği gönderir.
  // Parametreler: Yok
  // Dönüş Değeri: HTTP yanıtının metin içeriği
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

  // Notları temsil eden veri yapısı
   type Notes = { 
    description : Text; 
    completed : Bool;
  };

  // Nat türündeki bir değeri hashlemek için yardımcı fonksiyon
  func natHash(n : Nat) : Hash.Hash { 
    Text.hash(Nat.toText(n));
  };

  // Notları saklamak için kullanılan HashMap
  var notes = Map.HashMap<Nat, Notes>(0, Nat.equal, natHash);
  var nextId : Nat = 0; 

  // Tüm notları almak için sorgu işlevi
  public query func getNotes() : async [Notes] { 
    Iter.toArray(notes.vals());
  };

  // Yeni bir not eklemek için işlev
  public func addNote(description : Text) : async Nat { 
    let id = nextId; 
    notes.put(id, { description = description; completed = false }); 
    nextId += 1; 
    id 
  };

  // Bir notun tamamlandığını işaretlemek için işlev
  public func completeNote(id : Nat) : async () { 
    ignore do ? { 
      let description = notes.get(id)!.description; 
      notes.put(id, { description; completed = true }); 
    };
  };

  // Tüm notları metin olarak göstermek için sorgu işlevi
  public query func showNote() : async Text { 
    var output : Text = "\n_*__NOTES__*_"; 
    for (note : Notes in notes.vals()) {
      output #= "\n" # note.description; 
      if (note.completed) { output #= "+" };
    };
    output # "\n"; 
  };

  // Tamamlanmış notları temizlemek için işlev
  public func clearNote() : async () { 
    notes := Map.mapFilter<Nat, Notes, Notes>( 
      notes, 
      Nat.equal, 
      natHash,
      func(_, note) { if (note.completed) null else ?note },
    );
  };

};
