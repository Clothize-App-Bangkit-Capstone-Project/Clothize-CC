# Customer API Specs

## REGISTER Customer Api

Endpoints: POST /api/customers/current

Header :

- Authorization Token

Request Body :

<!-- profile_picture punya route request sendiri untuk create akan menggunakan default avatar -->

```json
{
	"full_name": "Ahmad Azhari",
	"address": "Indonesia",
	"phone_number": "628314567890"
}
```

Response Body Succes :

```json
{
	"message": {
		"customer_id": "17227332-4f7e-4f89-a5f6-05d8bc0a1638",
		"full_name": "Ahmad Azhari",
		"address": "Indonesia",
		"phone_number": "628314567890",
		"profile_picture": "https://storage.googleapis.com/clothize-app/default-profile-pict.png",
		"user_id": "47258c13-4f3a-4982-bf36-56b428dad210"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Customer already exist!",
	"status": false
}
```

## UPDATE Customer Api

Endpoints: PATCH /api/customers/current

Header :

- Authorization Token

Request Body :

<!-- profile_picture punya route request sendiri & setelah update redirect ke login lagi, untuk dapat token dengan data baru -->

```json
{
	"full_name": "Valentino Rossi",
	"address": "Italia"
}
```

Response Body Succes :

```json
{
	"message": {
		"customer_id": "17227332-4f7e-4f89-a5f6-05d8bc0a1638",
		"full_name": "Valentino Rossi",
		"address": "Italia",
		"phone_number": "628314567890",
		"user_id": "47258c13-4f3a-4982-bf36-56b428dad210"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Customer already exist!",
	"status": false
}
```

## UPDATE Customer Profile Picture Api

Endpoints: POST /api/customers/upload

Header :

- Authorization Token

Request Body :

<!-- profile_picture punya route request sendiri & setelah update redirect ke login lagi, untuk dapat token dengan data baru -->
<!-- untuk file gambar max 2MB -->

```json
{
	"profile_picture": "user file"
}
```

Response Body Succes :

```json
{
	"message": {
		"customer_id": "17227332-4f7e-4f89-a5f6-05d8bc0a1638",
		"profile_picture": "https://storage.googleapis.com/clothize-app/userfile.png"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Please upload a file!",
	"status": false
}
```

## GET Customer Api

Endpoints: GET /api/customers/current

Header :

- Authorization Token

Response Body Succes :

```json
{
	"message": {
		"customer_id": "17227332-4f7e-4f89-a5f6-05d8bc0a1638",
		"full_name": "Ahmad Azhari",
		"address": "Indonesia",
		"phone_number": "628314567890",
		"profile_picture": "https://storage.googleapis.com/clothize-app/default-profile-pict.png",
		"user_id": "47258c13-4f3a-4982-bf36-56b428dad210"
	},
	"status": true
}
```

Response Body Error :

```json
{
	"message": "Customer is not found",
	"status": false
}
```
