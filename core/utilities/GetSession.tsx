
import { cookies } from "next/headers";

export const GetSession = async (): Promise<Session> => {
  const cookiesList = await cookies();
  const sessionString = cookiesList.get("session");

  let session: Session = {};
  try {
    if (sessionString && sessionString.value && sessionString.value != "") {
      session = JSON.parse(sessionString.value);
    }
  }
  catch (e) {
    console.log(e);
  }
  return session;
};
