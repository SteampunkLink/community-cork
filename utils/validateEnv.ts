import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
  MONGODB_CONNECTION_STRING: str(),
  NEXT_PUBLIC_DOMAIN: str(),
  NEXT_PUBLIC_API_DOMAIN: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str()
});