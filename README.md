# Midnight Express

Passengers list Node.js API

## After Clonning

```
> npm install
> npm run train
```

## Misc

U need Mongodb intalled in your cpu to make this work, so run it.

Create a db call customerapp:

``` > use customerapp ```

Then create a collection called users:

``` > db.createCollection('users') ```

Check if u do that right (users must appear here):

```> show collections ```

Insert one passenger in ur train list:

``` > db.users.insert([{first_name:'Frank', last_name:'Castle', email:'punisher@marvel.com'}]) ```

Check passengers:

``` > db.users.find() ```