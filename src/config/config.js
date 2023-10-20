import dotenv from "dotenv";

export const entorno = { mode: process.argv[2] };
if (
  (String(process.argv[2]) != "dev" && String(process.argv[2]) != "prod") ||
  process
) {
  console.log("no esta bien el argumento, (dev or prod)");
  console.log(process.argv);
  process.exit;
}
dotenv.config({
  path:
    String(process.argv[2]) === "dev"
      ? "./.env.development"
      : "./.env.production",
});

console.log("entorno" + String(process.argv[2]));
console.log(String(process.env.MONGO_URL));
//entorno.PORT = process.env.PORT;
entorno.MONGO_URL = process.env.MONGO_URL;
//entorno.ADMIN_NAME = process.env.ADMIN_NAME;
//entorno.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
