```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes a note and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: Post data:<br>Content-Disposition: form-data#59; name="note"
    server-->>browser: document/redirect
    deactivate server
    Note right of browser: HttpResponse: 302<br>Location: /exampleapp/notes

    Note over browser: The browser refreshes the page
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "great", "date": "2023-06-16T21:47:49.797Z" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes, including the newly created note

```
