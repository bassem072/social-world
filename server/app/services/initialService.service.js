const db = require("../models");
const Roles = db.role;

async function initial() {
  try {
    const count = await Roles.estimatedDocumentCount();
    if (count === 0) {
      await createRole("admin");
      await createRole("user");
      await createRole("moderator");
    }
  } catch (error) {
    console.log("error:", error);
  }
}

async function createRole(roleName) {
  try {
    const role = await Roles({ name: roleName }).save();
    console.log(`Role ${role.name} created.`);
  } catch (error) {
    console.log("error:", error);
  }
}

module.exports = initial;
