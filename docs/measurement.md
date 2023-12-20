# Measurement API Spec

## Insert Measurement API

Endpoint : POST /api/measurements/current

Header :

- Authorization

Request Body :

<!-- untuk upload picture punya route request sendiri -->

```json
{
	"clothing_type": "hoodie",
	"clothing_size": "XLL",
	"body_circumstances": 21,
	"shoulder_width": 20,
	"body_length": 20,
	"chest_circumstances": 20,
	"gender": "male",
	"height": 180,
	"weight": 70
}
```

Response Body :

```json
{
	"message": {
		"measurement_id": 3,
		"clothing_size": "XLL",
		"picture": null,
		"body_circumstances": 21,
		"shoulder_width": 20,
		"body_length": 20,
		"chest_circumstances": 20,
		"gender": "male",
		"height": 180,
		"weight": 70,
		"createdAt": "2023-12-20T02:13:08.426Z"
	},
	"status": true
}
```

Response Error :

```json
{
	"message": "\"clothing_type\" is not allowed to be empty",
	"status": false
}
```

## Upload Measurements Picture API

Endpoint : POST /api/measurements/upload/:measurement_id

Header :

- Authorization

Request Body :

<!-- untuk upload picture punya route request sendiri -->

```json
{
	"picture": "user.jpg"
}
```

Response Body :

```json
{
	"message": {
		"measurement_id": 1,
		"picture": "https://storage.googleapis.com/clothize-app/user.jpg"
	},
	"status": true
}
```

Response Error :

```json
{
	"message": "File size cannot be larger than 2MB!",
	"status": false
}
```

## Get All Measurements made by User

Endpoint : GET /api/measurements/all

Header :

- Authorization

Response Body :

```json
{
	"message": [
		[
			{
				"measurement_id": 1,
				"clothing_type": "hoodie",
				"clothing_size": "XL",
				"picture": null,
				"body_circumstances": 21,
				"shoulder_width": 20,
				"body_length": 20,
				"chest_circumstances": 20,
				"gender": "male",
				"height": 180,
				"weight": 70,
				"createdAt": "2023-12-20T02:12:57.432Z",
				"user_id": "9be4d754-4da8-4392-af1e-e978cbe39ad4"
			},
			{
				"measurement_id": 2,
				"clothing_type": "hoodie",
				"clothing_size": "XL",
				"picture": null,
				"body_circumstances": 21,
				"shoulder_width": 20,
				"body_length": 20,
				"chest_circumstances": 20,
				"gender": "male",
				"height": 180,
				"weight": 70,
				"createdAt": "2023-12-20T02:12:59.945Z",
				"user_id": "9be4d754-4da8-4392-af1e-e978cbe39ad4"
			},
			{
				"measurement_id": 3,
				"clothing_type": "hoodie",
				"clothing_size": "XLL",
				"picture": null,
				"body_circumstances": 21,
				"shoulder_width": 20,
				"body_length": 20,
				"chest_circumstances": 20,
				"gender": "male",
				"height": 180,
				"weight": 70,
				"createdAt": "2023-12-20T02:13:08.426Z",
				"user_id": "9be4d754-4da8-4392-af1e-e978cbe39ad4"
			}
		]
	],
	"status": true
}
```

Response Error :

```json
{
	"message": "Measurements is not found!",
	"status": false
}
```

## Get Measurements made by measurement_id

Endpoint : GET /api/measurements/current

Header :

- Authorization

Request Body :

```json
{
	"measurement_id": 3
}
```

Response Body :

```json
{
	"message": {
		"measurement_id": 3,
		"clothing_type": "hoodie",
		"clothing_size": "XLL",
		"picture": null,
		"body_circumstances": 21,
		"shoulder_width": 20,
		"body_length": 20,
		"chest_circumstances": 20,
		"gender": "male",
		"height": 180,
		"weight": 70,
		"createdAt": "2023-12-20T02:13:08.426Z",
		"user_id": "9be4d754-4da8-4392-af1e-e978cbe39ad4"
	},
	"status": true
}
```

Response Error :

```json
{
	"message": "\"measurement_id\" is required",
	"status": false
}
```
