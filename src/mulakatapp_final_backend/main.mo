import Blob "mo:base/Blob";
import Types "Types";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Option "mo:base/Option";

actor {

  public query (message) func greet() : async Principal {
    message.caller;
  };
  /**
   * Types for User
   */

  public type Result<T, E> = Result.Result<T, E>;

  public type User = {
    name : Text;
    avatar : Text;
  };

  /**
   * Application State for User
   */

  private stable var users : Trie.Trie<Principal, User> = Trie.empty();

  /**
   * High-Level API for User
   */

  // Register a User
  public shared (msg) func signUpWithInternetIdentity() : async Bool {

    let result = Trie.find(users, userKey(msg.caller), Principal.equal);
    let exists = Option.isSome(result);

    // Control whether the user exists
    if (exists) {
      return false; // User is already registered
    };

    // Create new User
    let newUser = { name = ""; avatar = "" };
    users := Trie.replace(users, userKey(msg.caller), Principal.equal, ?newUser).0;

    return true; // New user created!
  };

  // Update a User
  public func updateUser(user : User, caller : Principal) : async Bool {
    let result = Trie.find(users, userKey(caller), Principal.equal);
    let exists = Option.isSome(result);
    if (exists) {
      users := Trie.replace(
        users,
        userKey(caller),
        Principal.equal,
        ?user,
      ).0;
    };
    return exists;
  };

  // Delete a User
  public shared func deleteUser(caller : Principal) : async Bool {
    let result = Trie.find(users, userKey(caller), Principal.equal);
    let exists = Option.isSome(result);
    if (exists) {
      users := Trie.replace(
        users,
        userKey(caller),
        Principal.equal,
        null,
      ).0;
    };
    return exists;

  };

  // Get the current user based on the caller's principal
  public query func getCurrentUser(caller : Principal) : async ?User {
    let result = Trie.find(users, userKey(caller), Principal.equal);
    return result;
  };

  // Get All Users

  public query func listUsers() : async [(Principal, User)] {
    return Trie.toArray<Principal, User, (Principal, User)>(
      users,
      func(k, v) : (Principal, User) {
        (k, { userId = k; name = v.name; avatar = v.avatar });
      },
    );
  };

  // Create a trie key from a useridentifier. (Parameter is a Principal Type)
  private func userKey(x : Principal) : Trie.Key<Principal> {
    return { hash = Principal.hash x; key = x };
  };
  public func makeRandomRequest() : async Text {
    // İstek için URL
    let url = "https://quizapi.io/api/v1/questions?apiKey=ktXJ4SvCcvLbTWaYbPpDdWv0xzdGJay6vaeHvlMV&limit=20";
    Cycles.add(1603118800);

    // İstek için başlık bilgileri
    let request_headers = [{ name = "User-Agent"; value = "ICP HTTP Client" }];

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
    let response_body : Blob = http_response.body;

    // Blob'dan metne dönüştürme işlemi
    let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Yanıt metni döndürülüyor
    return decoded_text;
  };

  public func makeHtmlRequest() : async Text {
    // İstek için URL
    let url = "https://quizapi.io/api/v1/questions?apiKey=ktXJ4SvCcvLbTWaYbPpDdWv0xzdGJay6vaeHvlMV&category=code&limit=10&tags=HTML";
    Cycles.add(1603118800);

    // İstek için başlık bilgileri
    let request_headers = [{ name = "User-Agent"; value = "ICP HTTP Client" }];

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
    let response_body : Blob = http_response.body;

    // Blob'dan metne dönüştürme işlemi
    let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Yanıt metni döndürülüyor
    return decoded_text;
  };

  public func makeJsRequest() : async Text {
    // İstek için URL
    let url = "https://quizapi.io/api/v1/questions?apiKey=ktXJ4SvCcvLbTWaYbPpDdWv0xzdGJay6vaeHvlMV&category=code&limit=10&tags=JavaScript";
    Cycles.add(1603118800);

    // İstek için başlık bilgileri
    let request_headers = [{ name = "User-Agent"; value = "ICP HTTP Client" }];

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
    let response_body : Blob = http_response.body;

    // Blob'dan metne dönüştürme işlemi
    let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Yanıt metni döndürülüyor
    return decoded_text;
  };

  public func makeSQLRequest() : async Text {
    // İstek için URL
    let url = "https://quizapi.io/api/v1/questions?apiKey=ktXJ4SvCcvLbTWaYbPpDdWv0xzdGJay6vaeHvlMV&category=sql&limit=10&tags=MySQL";
    Cycles.add(1603118800);

    // İstek için başlık bilgileri
    let request_headers = [{ name = "User-Agent"; value = "ICP HTTP Client" }];

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
    let response_body : Blob = http_response.body;

    // Blob'dan metne dönüştürme işlemi
    let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Yanıt metni döndürülüyor
    return decoded_text;
  };

  public func makePythonRequest() : async Text {
    // İstek için URL
    let url = "https://quizapi.io/api/v1/questions?apiKey=ktXJ4SvCcvLbTWaYbPpDdWv0xzdGJay6vaeHvlMV&limit=10&tags=Python";
    Cycles.add(1603118800);

    // İstek için başlık bilgileri
    let request_headers = [{ name = "User-Agent"; value = "ICP HTTP Client" }];

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
    let response_body : Blob = http_response.body;

    // Blob'dan metne dönüştürme işlemi
    let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Yanıt metni döndürülüyor
    return decoded_text;
  };

  // Notları temsil eden veri yapısı
  type Notes = {
    id : Nat;
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
    notes.put(id, { id = id; description = description; completed = false });
    nextId += 1;
    id;
  };

  // Bir notun tamamlandığını işaretlemek için işlev
  public func completeNote(id : Nat) : async () {
    ignore do ? {
      let description = notes.get(id)!.description;
      notes.put(id, { id = id; description; completed = true });
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

  // // Tamamlanmış notları temizlemek için işlev
  // public func clearNote() : async () {
  //   notes := Map.mapFilter<Nat, Notes, Notes>(
  //     notes,
  //     Nat.equal,
  //     natHash,
  //     func(_, note) { if (note.completed) null else ?note },
  //   );
  // };
  public func deleteNote(id : Nat) : async () {
    ignore do {
      notes.delete(id);
    };
  };

  public func checkCode(code : Text) : async Text {
    let correctCode = "actor { public func hello() : async Text { \"Hello World\" } }";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n'
        },
      );
      Text.fromIter(filteredChars); // Düzeltme: Burada döndürülen değeri yakalayın ve döndürün
    };

    let normalizedCode = normalize(code);

    if (normalizedCode == normalize(correctCode)) {
      return "Kod doğru!";
    } else {
      return "Kod yanlış!";
    };
  };

  public func runCode(currentCode : Text) : async Text {
    Cycles.add(1603118800);

    // Define the request URL
    let url = "https://play.motoko.org/myeditor";

    // Define request headers
    let request_headers = [{ name = "Content-Type"; value = "application/json" }];
    func toJSON(data : Text) : Text {
      "\"" # data # "\"";
    };
    // Create HTTP request arguments
    let http_request : Types.HttpRequestArgs = {
      url = url;
      headers = request_headers;
      method = #post;
      body = ?Text.encodeUtf8(toJSON(currentCode)); // Use Text.encodeUtf8 here
    };

    // Send HTTP request and await response
    let ic : Types.IC = actor "aaaaa-aa"; // Assuming IC management canister
    type Status = { #ok; #unknownError; #error : Nat };
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);
    // Decode response body from Blob to Text
    let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
      case (null) { "No value returned" };
      case (?text) { text };
    };

    // Handle HTTP response status
    switch (http_response.status) {
      case (status) {
        // Successful response handling
        Debug.print("Response: " # decoded_text);
        return "Code executed successfully: " # decoded_text;
      };
      case (unknownError) {
        // Unknown error handling
        Debug.print("Unknown error occurred");
        return "Unknown error occurred";
      };
    };
  };

  //  public func checkCode(code : Text) : async Text {
  //     let correctCode = "actor { public func hello() : async Text { \"Hello World\" } }";
  //     if (code == correctCode) {
  //       return "Kod doğru!";
  //     } else {
  //       return "Kod yanlış!";
  //     };
  //   };

  // public func checkCode(code : ?Text) : async Text {
  //   switch (code) {
  //     case null { return "Hata: Kod boş olamaz!" };
  //     case (?userCode) {
  //       let trimmedUserCode = Text.trim(userCode, #char ' ');
  //       let correctCode = "actor { public func hello() : async Text { \"Hello World\" } }";
  //       if (trimmedUserCode == correctCode) {
  //         return "Kod doğru!";
  //       } else {
  //         return "Kod yanlış! Doğru kod: " # correctCode;
  //       };
  //     };
  //   };
  // };

};
