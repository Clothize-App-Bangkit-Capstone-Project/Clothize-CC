# User API Specs

## Register User Api

Endpoint : POST /api/register/

Request Body :

```json
{
	"username": "test",
	"password": "test",
	"email": "test@example.com"
}
```

Response Body Success :

```json
{
	"data": {
		"id": "unique id",
		"username": "test",
		"email": "test@example.com"
	}
}
```

Response Body Error :

```json
{
	"errors": "Username is already exist!"
}
```

## Login User Api

Endpoint : Get /api/users/login

Request Body :

```json
{
	"username": "test",
	"password": "test"
}
```

Response Body Success :

```json
{
	"data": {
		"token": "unique token"
	}
}
```

Response Body Error :

```json
{
	"errors": "Username or password incorrect!"
}
```

## Update User Api

Endpoint : Get /api/users/...

Header :

- Authorization token

Request Body :

```json
{
	"password": "test",
	"email": "test@example.com"
}
```

Response Success :

```json
{
	"data": {
		"username": "test",
		"password": "test",
		"email": "test@example.com"
	}
}
```

Response Body Error :

```json
{
	"errors": "Please fill the password field"
}
```

## GET User Api

Endpoint : GET /api/users/...

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"id": "unique id",
		"username": "test",
		"email": "test@example.com"
	}
}
```

Response Body Error :

```json
{
	"errors": "Unauthorized"
}
```
