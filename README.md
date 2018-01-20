# CvetyOnline

Online shop-window.

## Deploying backend

[Install](https://www.postgresql.org/download) PostgreSQL and setup user if needed

[Install](https://github.com/thoughtbot/paperclip/wiki/Requirements#image-processor) ImageMagick

Install gems:

```bash
bundle install --without production
```

or for prodcution

```bash
bundle install --deployment
```

If needed, setup environment for prodcution:

```bash
export RAILS_ENV=production
export SECRET_KEY_BASE=$(rake secret)
export DB_USERNAME=#PostgreSQL user name
export DB_PASSWORD=#PostgreSQL user password
```

Create and setup db:

```bash
rake db:create
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

...or build project for production:

```bash
npm run build
```