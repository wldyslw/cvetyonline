# CvetyOnline

Online shop-window.

## Deploying backend

Install gems:

```bash
bundle install
```

Migrate to the latest version and seed db:

```bash
rake db:migrate
rake db:seed
```

Then run project locally:

```bash
rails server
```

### Issues

If you are having problems with bcrypt on windows, you can try to find a solution [here](https://github.com/codahale/bcrypt-ruby/issues/142)

## Deploying frontend

Install npm packages:

```bash
npm install
```

Then run project locally:

```bash
npm start
```
