```mermaid
sequenceDiagram
    participant browser
    participant server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: document (HTML)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: stylesheet (CSS file)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: script (JavaScript file)
    deactivate server

    Note over browser: The Script file(spa.js) makes an XMLHttp get request

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: xhr
    Note right of browser: Status: 200 OK
    Note right of browser: Response: [{ "content": "great", "date": "2023-06-16T21:47:49.797Z" }, ...]
    deactivate server

    Note over browser: The Script file(spa.js) renders the data gotten from the server on the HTML page
```
