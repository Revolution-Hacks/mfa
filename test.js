await fetch("http://localhost:3000/api/recieve-message", {
    method: "POST",
    body: {
        message: "Hello, World!"
    }
});