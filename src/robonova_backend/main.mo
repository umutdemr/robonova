import Types "Types";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor {

  public query (message) func greet() : async Principal {
    message.caller;
  };

  type Notes = {
    id : Nat;
    description : Text;
    completed : Bool;
  };

  func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n));
  };

  var notes = Map.HashMap<Nat, Notes>(0, Nat.equal, natHash);
  var nextId : Nat = 0;

  public query func getNotes() : async [Notes] {
    Iter.toArray(notes.vals());
  };

  public func addNote(description : Text) : async Nat {
    let id = nextId;
    notes.put(id, { id = id; description = description; completed = false });
    nextId += 1;
    id;
  };

  public func completeNote(id : Nat) : async () {
    ignore do ? {
      let description = notes.get(id)!.description;
      notes.put(id, { id = id; description; completed = true });
    };
  };

  public query func showNote() : async Text {
    var output : Text = "\n_*__NOTES__*_";
    for (note : Notes in notes.vals()) {
      output #= "\n" # note.description;
      if (note.completed) { output #= "+" };
    };
    output # "\n";
  };

  public func deleteNote(id : Nat) : async () {
    ignore do {
      notes.delete(id);
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
      body = ?Text.encodeUtf8(toJSON(currentCode)); // Use Text.efncodeUtf8 here
    };

    let ic : Types.IC = actor "aaaaa-aa";
    type Status = { #ok; #unknownError; #error : Nat };
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);
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

  public func checkCode1(code : Text) : async Text {
    let correctCode = "actor { public func hello() : async Text { \"Hello World\" } }";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };

  public func checkCode2(code : Text) : async Text {
    let correctCode = "import Nat \"mo:base/Nat\";\nimport Bool \"mo:base/Bool\";\n\nactor {\n   public func robotInfo() : async Text {\n        var robotName: Text = \"RoboMaster\";\n        var robotAge: Nat = 5;\n        var isVerified: Bool = true;\n\n        let infoMessage = \"Robot Name: \" # robotName # \", Age: \" # Nat.toText(robotAge) # \", Verified: \" # Bool.toText(isVerified);\n        return infoMessage;\n    }\n}";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };

  public func checkCode3(code : Text) : async Text {
    let correctCode = "import Nat \"mo:base/Nat\";\n\nactor Robot {\n    public func robotTemperatureCheck(temperature: Nat) : async Text {\n        if (temperature > 30) {\n            return \"It's too hot!\";\n        } else if (temperature < 10) {\n            return \"It's too cold!\";\n        } else {\n            return \"The temperature is just right.\";\n        }\n    };\n};";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };

  public func checkCode4(code : Text) : async Text {
    let correctCode = "import Debug \"mo:base/Debug\";\n\nactor PowerCalculator {\n    public func power(base: Nat, exponent: Nat) : Nat {\n        var result: Nat = 1;\n        for (i in 1..exponent) {\n            result *= base;\n        }\n        return result;\n    }\n\n    public func testPower() : async () {\n        Debug.print(power(2, 3)); // 8\n        Debug.print(power(5, 0)); // 1\n        Debug.print(power(7, 2)); // 49\n    }\n};";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };

  public func checkCode5(code : Text) : async Text {
    let correctCode = "import Debug \"mo:base/Debug\";\n\nvar userName : ?Text = null;\n\nswitch (userName) {\n case (?name) { Debug.print(\"Username: \" # name); };\n case (null) { Debug.print(\"Username not found.\"); };\n}\n\nvar loginTimes : [var Nat] = [var 1622512800, var 1622599200, var 1622685600];\n\nloginTimes[3] := 1622772000;\n\nDebug.print(\"Login Times: \" # Debug.show(loginTimes));\n\nlet numbers : [Nat] = [1, 2, 3, 4, 5];\n\nDebug.print(\"Numbers: \" # Debug.show(numbers));";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };

  public func checkCode6(code : Text) : async Text {
    let correctCode = "import Debug \"mo:base/Debug\";\n\ntype RobotRecord = {\n    name: Text;\n    model: Text;\n    active: Bool;\n};\n\nlet myRobot: RobotRecord = {\n    name = \"R2-D2\";\n    model = \"Astromech\";\n    active = true;\n};\n\nactor RobotObject {\n    var name: Text = \"R2-D2\";\n    var model: Text = \"Astromech\";\n    var active: Bool = true;\n\n    public func setActive(status: Bool) : async () {\n        active := status;\n    };\n\n    public func printInformation() : async () {\n        Debug.print(\"Name: \" # name # \", Active: \" # Debug.show(active));\n    };\n};\nawait RobotObject.setActive(false);\nawait RobotObject.printInformation();\n\nclass RobotClass(name: Text, model: Text, active: Bool) {\n    public func printInformation() : async () {\n        Debug.print(\"Name: \" # name # \", Active: \" # Debug.show(active));\n    };\n};\n\nlet robot1 = RobotClass(\"R2-D2\", \"Astromech\", true);\nlet robot2 = RobotClass(\"C-3PO\", \"Protocol\", false);\nawait robot1.printInformation();\nawait robot2.printInformation();";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };

  public func checkCode7(code : Text) : async Text {
    let correctCode = "import Debug \"mo:base/Debug\";\n\npackage RobotManagement {\n    public func createRobot(name: Text, model: Text) : Text {\n        return \"Robot created: \" # name # \", \" # model;\n    };\n\n    public func listRobots() : Text {\n        return \"Listing all robots...\";\n    };\n};\n\nmodule RobotUtilities {\n    public func status() : Text {\n        return \"All systems are operational.\";\n    };\n\n    public func shutDown() : Text {\n        return \"Robot shutting down.\";\n    };\n};\n\nimport RobotUtilities;\n\nactor RobotCoordinator {\n    public func assignTask(task: Text) : async Text {\n        return \"Task assigned: \" # task;\n    };\n};\n\nlet coordinator = await RobotCoordinator.new();\nDebug.print(await coordinator.assignTask(\"Clean the lab\"));\n\nDebug.print(RobotUtilities.status());\nDebug.print(RobotUtilities.shutDown());";

    let normalize = func(code : Text) : Text {
      let chars = Text.toIter(code);
      let filteredChars = Iter.filter(
        chars,
        func(c : Char) : Bool {
          c != ' ' and c != '\n' and c != '\t' and c != '\r'
        },
      );
      Text.fromIter(filteredChars);
    };

    let normalizedCode = normalize(code);
    let normalizedCorrectCode = normalize(correctCode);

    if (normalizedCode == normalizedCorrectCode) {
      return "Code is correct";
    } else {
      return "Code is wrong";
    };
  };
};
