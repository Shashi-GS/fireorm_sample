#### Hello Markdown in VS Code!

```
query {
    signIn(input:{ userid: "admin@mail.com", password: "Test!234" }){
        access_token
    }
}
```

```
mutation {
    resetPassword(input:{ userid: "admin@mail.com", password: "Test!234", token: "1234" }){
        message
    }
}
```

```
query {
    forgotPassword(input:{ userid: "admin@mail.com" }){
        message
    }
}
```
