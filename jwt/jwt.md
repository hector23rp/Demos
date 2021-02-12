# JWT (JSON Web Token)

JWT es un estándar abierto que define una forma compacta y autónoma de transmitir información de forma segura entre las partes como JSON Web Token. Esta información se firma usando un secreto o un par de claves pública/privada usando RSA o ECDSA.

## ¿Cuándo debería utilizar JSON Web Tokens?

- **Autorización**: este es el escenario más común para usar JWT. Una vez el usuario haya iniciado sesión, cada solicitud posterior incluirá el JWT, lo que permitirá al usuario acceder a rutas, servicios y recursos que están permitidos con ese token.

- **Intercambio de información**: los tokens web JSON son una buena forma de transmitir información de forma segura entre las 2 partes.

## Estructura de JSON Web Token

Un JWT tiene el siguiente aspecto:
  
  xxxxx.yyyyy.zzzzz

### **Encabezamiento**

Consta de dos partes: el tipo de token, que es JWT, y el algoritmo de firma que se utiliza, como HMAC SHA256 o RSA

```json 
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Este JSON está codificado en **Base64Url**.

### **Carga útil**

Esto es el cuerpo del token, contiene los datos que se quieren enviar. Se codifica en **Base64Url**.

Ejemplo:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

### **Firma**

Para crear la firma, hay que coger el encabezamiento, la carga útil, un secreto, el agoritmo especificado en el encabezamiento y firmarlo.

Por ejemplo, si queremos utilizar el algoritmo HMAC SHA256, la firma será creada de la siguiente forma:

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

La firma es utilizada para verificar que el mensaje no ha sufrido cambios por el camino y, en el caso de los tokens firmados por claves privadas, también puede ser utilizada para verificar que el emisor quién envió el JWT es quien dice ser. 


https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport