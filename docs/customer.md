# Customer API Specs

## GET Customer Api

Endpoints: POST /api/customers/current

Header :

- Authorization Token

Response Body Succes :

```json
{
	"data": {
		"customer_id": "unique id",
		"name": "test",
		"address": "test",
		"phone_number": "test",
		"profile_picture": "test",
		"user_id": "unique id"
	}
}
```

Response Body Error :

```json
{
	"errors": "Customer not found"
}
```

## UPDATE Customer Api

Endpoints: PATCH /api/customers/...

Header :

- Authorization Token

Request Body :

```json
{
	"name": "test",
	"address": "test",
	"phone_number": "test",
	"profile_picture": "test"
}
```

Response Body Succes :

```json
{
	"data": {
		"customer_id": "unique id",
		"name": "test",
		"address": "test",
		"phone_number": "test",
		"profile_picture": "test",
		"user_id": "unique id"
	}
}
```

Response Body Error :

```json
{
	"errors": "Customer not found"
}
```
