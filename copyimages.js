const fs = require("fs-extra");

async function copyFolder(source, target) {
  try {
    await fs.remove(target);
    await fs.copy(source, target);
  } catch (error) {
    console.log(error);
  }
}

const sourceDir =
  "C:/Users/herma/source/repository/strapi-5-next-js-team-member-starter/Team-member-api/public/uploads";
const targetDir =
  "C:/Users/herma/source/repository/strapi-5-next-js-team-member-starter/Team-member-client/public/uploads";

copyFolder(sourceDir, targetDir);
