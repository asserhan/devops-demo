## MongoDB Setup

1. Create a free MongoDB Atlas cluster at `https://www.mongodb.com/atlas`.
2. Create a database user and note the username/password.
3. Network Access: allow your current IP or 0.0.0.0/0 (dev only).
4. Get the connection string (Driver: Node.js, Version: Mongoose).
5. In `server/`, create a `.env` file with:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority&appName=<appName>
MONGODB_DB=devops_demo
PORT=3000
```

### Install & Run

```
cd server
npm install
npm run dev
```

### Seed Mock Data

```
cd server
node scripts/seed-books.js
```

Then hit `GET /api/books` from the client.



