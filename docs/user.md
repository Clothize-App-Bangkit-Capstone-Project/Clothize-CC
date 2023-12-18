# User API Specs

## Register User Api

Endpoint : POST /api/users/register

Request Body :

```json
{
	"username": "test1",
	"password": "test1",
	"email": "test1@gmail.com"
}
```

Response Body Success :

```json
{
	"message": {
		"user_id": "unique id",
		"username": "test1",
		"email": "test1@gmail.com"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Username already exists!",
	"status": false
}
```

## Login User Api

Endpoint : POST /api/users/login

Request Body :

```json
{
	"email": "test1@gmail.com",
	"password": "test1"
}
```

Response Body Success :

```json
{
	"message": {
		"token": "jwt token",
		"email": "test1@gmail.com"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Username or password are incorrect!",
	"status": false
}
```

## Update User Api

Endpoint : PATCH /api/users/current

Header :

- Authorization token

Request Body :

```json
{
	//semua optional
	"username": "zaribaed",
	"password": "test",
	"email": "wowo@gmail.com",
	"role": "tailor",
	"isVerified": true
}
```

Response Success :

```json
{
	"message": {
		"user_id": "unique id",
		"username": "zaribaed",
		"email": "wowo@gmail.com",
		"isVerified": true,
		"role": "tailor"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "User not found!",
	"status": false
}
```

## GET User Api

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
	"message": {
		"user_id": "unique id",
		"username": "test1",
		"email": "test1@gmail.com",
		"isVerified": false,
		"role": "customer"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Unauthorized",
	"status": false
}
```
