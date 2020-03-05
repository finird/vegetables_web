# vegetables_web

## Start docker mongo

docker run -d -p 27017:27017 -v ~/data:/data/db mongo

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install APIs.

```bash
npm install
```

## Usage

### For development environment:

```bash
npm run start-dev
```

##### OR:

```bash
npm run start
```

### For deployment environment:

##### (Linux OS & MacOS):

```bash
npm run start-prod
```

##### (Windows OS):

```bash
npm run start-prod-windows
```
