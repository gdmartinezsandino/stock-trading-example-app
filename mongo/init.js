db = db.getSiblingDB("stock-trading-app");

db.users.insertOne({
  username: "user-1",
  password: "123456",
  balance: 10000,
  shares: 0,
});
