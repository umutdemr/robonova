module Types {

  // HTTP istekleri için türler
  public type HttpRequestArgs = {
    url : Text;
    headers : [HttpHeader];
    method : HttpMethod;
  };

  // HTTP yanıtı için tür
  public type HttpResponsePayload = {
    status : Nat;
    headers : [HttpHeader];
    body : Blob;
  };

  // HTTP başlık türü
  public type HttpHeader = {
    name : Text;
    value : Text;
  };

  // HTTP metodu türü
  public type HttpMethod = {
    #get;
    #post;
    #head;
  };

  // IC yönetim canister'ı için tür
  public type IC = actor {
    http_request : HttpRequestArgs -> async HttpResponsePayload;
  };

};