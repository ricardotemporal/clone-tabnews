import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepperedPassword = addPepper(password);
  return await bcryptjs.hash(pepperedPassword, rounds);
}

function addPepper(password) {
  const pepper = process.env.PEPPER;
  return password + pepper;
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  const pepperedPassword = addPepper(providedPassword);
  return await bcryptjs.compare(pepperedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
