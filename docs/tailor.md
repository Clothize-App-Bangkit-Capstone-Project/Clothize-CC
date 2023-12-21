# Tailor API Specs

## REGISTER Tailor Api

Endpoints: POST /api/tailors/current

Header :

- Authorization Token

Request Body :

<!-- profile_picture punya route request sendiri untuk create akan menggunakan default avatar -->

```json
{
	"store_name": "Tailors",
	"address": "Indonesia",
	"description": "Lorem Ipsum",
	"longitude": 25.5,
	"latitude": 25.5
}
```

Response Body Succes :

```json
{
	"message": {
		"tailor_id": "c87e0d43-f33a-4be5-8d47-52e8534d7508",
		"store_name": "Tailors",
		"address": "Indonesia",
		"description": "Lorem Ipsum",
		"longitude": 25.5,
		"latitude": 25.5,
		"profile_picture": "https://storage.googleapis.com/clothize-app/default-profile-pict.png",
		"user_id": "05b276a7-e278-43b0-af40-786429c669ff"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Tailor already exist!",
	"status": false
}
```
