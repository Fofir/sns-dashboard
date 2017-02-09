# Amazon SNS Dashboard

## Setup

1. Install npm packages:

`$ npm run setup`

2. Open the newly created `.env` file and fill it in with your Amazon AWS
credentials and region, and your mongo connection string:

```
DB_URI=mongodb://localhost:27017/someDatabase
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=[[YOUR_KEY_ID]]
AWS_SECRET_ACCESS_KEY=[[YOUR_ACCESS_KEY]]
```

## Development

1. run `npm run dev-server` and `npm run dev-client`. The client will be running on `localhost:3000` and the server on `localhost:8080`