- `psql -U postgres` - (postgres - пользователь по умолчанию root правами)

- `\! chcp 1251` - (изменить кодировку терминала)

---

- `npx sequelize-cli db:migrate` накатывает все новые миграции

- `npx sequelize-cli db:migrate:undo:all` откатить все миграции

---

- `npx sequelize-cli db:seed:all` - накатывает все сиды

- `npx sequelize-cli db:seed --seed 20230713093118-Measurement.js`
- `npx sequelize-cli db:seed --seed 20230713062704-Collections.js`
- `npx sequelize-cli db:seed --seed 20230713065308-Categories.js`


 - накатывает конкретный сид

- `npx sequelize-cli db:seed:undo:all` - откатить все сиды

---

- `npx sequelize-cli db:drop` - удалить DB

- `npx sequelize-cli db:create --env development` - создать DB

---

`rm -r node_modules` - удалить node_modules

---

    "":"",
    "":""

string
integer
boolean

`npx sequelize-cli model:generate --name Photo --attributes photo:string`


---

`npx sequelize-cli model:generate --name Item --attributes name:string,description:string,model_sizes:string,care_instructions:string,characterictics:string,price:integer,colour:string,instock:boolean,photo:integer,collection_id:integer,category_id:integer`

`npx sequelize-cli model:generate --name Collection --attributes name:string,photo:integer`

`npx sequelize-cli model:generate --name Category --attributes name:string,photo:integer`

`npx sequelize-cli seed:generate --name name_seeders`



//"По идее потом многие id надо заменить на user_id, в нормальной бд"
установка сервера npm install -g json-server
запуск json-server --port 7000 --routes routes.json --watch db.json
маршруты:
http://localhost:7000/api/users/
http://localhost:7000/api/orders/
http://localhost:7000/api/item/
http://localhost:7000/api/category/
http://localhost:7000/api/collection/
http://localhost:7000/api/order_items/
http://localhost:7000/api/cart/
http://localhost:7000/api/cart_items/
http://localhost:7000/api/favorite/

Добавиви /:id осуществляется переход на конкретный элемент
