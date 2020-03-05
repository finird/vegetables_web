### http://localhost:3000/api/v1/auth/current-user 
* expect: 
    * Authorization: token
* return:
    {
        "data": {
            "last_name": "xxxx",
            "first_name": "xxxxx",
            "roles": "GUEST",
            "createdAt": "2020-02-29T08:12:15.724Z",
            "address": "",
            "_id": "xxxxxx",
            "email": "xxxxx",
            "username": "xxxx"
        }
    }

### http://localhost:3000/api/v1/auth/login
* expect 
    * {
        username: "",
        password: ""
    }
    or
    {
        "email": "",
        "password": ""
    }
* return
    "token": "",
    "expire": "",
    "status": 200,
    "message": "" 
 
 
### http://localhost:3000/api/v1/auth/register
* expect 
    * {
        username: "",
        password: ""
    }
* return 
    {
         "last_name": "",
         "first_name": "", 
         "roles": "GUEST", //Default is GUEST, ['GUEST', 'ADMIN', 'EDIT', 'RECEPTIONIST'] create another roles require ROLE is ADMIN
         "address": "",
         "email": "",
         "username": ""
    }
