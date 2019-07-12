# Check Signature

```
npm install
node index.js
```

## 测试用例
```
curl -X POST http://localhost:4000/api/sign
```

Server log:
```
/api/sign rawBody: {"id":"asdf","payload":{"name":"asdf","ts":1560396834}}
/api/sign signature: 7cb127b064ab2e4ca869f7aca369659c3af5eaa4
/api/check rawBody: {"id":"asdf","payload":{"name":"asdf","ts":1560396834}}
/api/check signature 7cb127b064ab2e4ca869f7aca369659c3af5eaa4
/api/check signd: 7cb127b064ab2e4ca869f7aca369659c3af5eaa4
```
