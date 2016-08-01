Asana Graphs
=====

A dashboard to view all your projects remaining tasks in multiple graphs.

## Installation

```
composer install
npm install
```

Then, fill your `asana_client_token` and `asana_workspace_id`.

## Development

In one terminal, launch the PHP server (if you don't have one already)

```
$ php bin/console server:run
```

In an other one (to build the assets with webpack)

```
$ npm run start
```

## Build

To build your production assets

```
$ npm run build
```
