# instantapi.js

## Usage
Start server with

```
npm start
```

Request

```
$.get("http://localhost:3210/" + encodeURIComponent(JSON.stringify(
    {
      users: {
        firstName: "@str(10, 20)",
        lastName: "@str(10, 20)",
        age: "@num(0, 100)",
        "@repeat": 5
      }
    }
  )))
```

and response

```
{
  "users": [
    {
      "firstName": "XsrKtIRHJd",
      "lastName": "ScKmfVDGTxIeooZHF",
      "age": 28
    },
    {
      "firstName": "RcpwGUxKtn",
      "lastName": "SbcEfIvvrpMBeULMU",
      "age": 89
    },
    {
      "firstName": "zoabOugVGAg",
      "lastName": "HRPbiNEgEt",
      "age": 90
    },
    {
      "firstName": "CCpBLPsZhSqOKtVe",
      "lastName": "hNWfZABkHpo",
      "age": 37
    },
    {
      "firstName": "TseRpbCjhaAgmxBgsP",
      "lastName": "ZuwqLKNPFyIYSqNl",
      "age": 13
    }
  ]
}
```

### @num(min, max)
Returns integer between ```min``` (inclusive) and ```max```

### @str(min, max)
Returns string between ```min``` (inclusive) and ```max```

### @word(count, maxWordLength = 8)
Returns string in sentence-like form with ```count``` words where each word can't be longer than ```maxWordLength```

### @repeat
Return array with repeated object

## Run server

```npm start```

## Run tests

```npm test```
