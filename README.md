
# Project Backend

Ceci est le Backend, nous utilisons Symfony 6*



## Architectural design


**/Controller** : 
 - One folder per service
 - Each method file related only to this route in a folder in the route folder

**/Utils** : 
- In a component type folder
 - One folder per component
 - All the code that corresponds to the component that will be reused in the whole back

**/Entity** (may be subject to change): 
 - A typical entity file
 - All the code related to the entity in question

**/Repository** (may be subject to change):
 - A typical repository folder
 - All the code related to the repo in question

## Deployment

To deploy this project run

```bash
  symfony serve
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_ENV` `APP_SECRET` `DATABASE_URL`
## API Reference

#### Basic root test

```http
  GET /getPatient
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `string` | root test |

```http
  GET /getDoctor
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `string` | root test |

```http
  GET /insertPatient
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `string` | root test |


```http
  GET /insertDoctor
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `string` | root test |

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` `password`| `string` | allows connections user |

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` `lastName` `email` `password`| `string` | root test |



## Authors

- [@Lsoury](https://github.com/Lsoury)
- [@ErwanBAILLON](https://github.com/ErwanBAILLON)

