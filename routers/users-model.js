const db = require("../data/config");
const bcrypt = require("bcryptjs");
module.exports = {
  getUsers,
  add,
  findById,
  findBy,
};

function getUsers() {
  return db("users").select("id","username","department");
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

function findBy(user) {
  return db("users").select("id", "username","password").where(user);
}
