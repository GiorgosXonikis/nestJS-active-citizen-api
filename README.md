## NestJS REST API for Active Citizen
Active Citizen is a project to enhance people's engagement with their communities. 

### Endpoints

#### 1. Auth
- POST: Register (send email activation code)
  ```/auth/signup```
- PATCH: User Activation (activate a new user using the activation code which was sent via email)
  ```/auth/signup/activate```
- POST: Login (get JWT)
  ```/auth/login```
- POST: Reset password (send email with reset instructions)
  ```/auth/reset-password```
- POST: Reset password confirm
  ```/auth/reset-password/confirm```  
  
#### 2. Users
- GET: Get User’s profile 
  ```/user/profile```
- PATCH: Change User’s password
  ```/user/change-paswword```
- POST: Logout (add JWT to invalid tokens)
  ```/user/logout```

### Powered by
#### 1. NestJS
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>

#### Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

#### Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

#### Stay in touch
- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

#### License
Nest is [MIT licensed](LICENSE).

#### 2. Postgres
<a href="http://postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="150" alt="postgres Logo" /></a>

PostgreSQL has a wide variety of community and commercial support options available for users, including:
- Documentation
- The Community section, which details the support options available to users from the PostgreSQL community
- Mailing Lists
- IRC
- Slack

Commercial support is also available from one of the many companies providing professional services to the PostgreSQL community. A list of companies that provide PostgreSQL-specific hosting is also available.

#### 3. Deployed on Heroku
<a href="http://www.heroku.com//" target="blank"><img src="https://brand.heroku.com/static/media/heroku-logotype-horizontal.81c49462.svg" width="150" alt="Heroku Logo" /></a>

#### Documentation
https://devcenter.heroku.com/
