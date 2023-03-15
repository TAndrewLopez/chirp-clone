import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end();

  /*
    THIS ENDPOINT WILL USE SERVER AUTH TO GET THE SESSION
    IT WILL CHECK IF THE USER IS LOGGED IN
    IT WILL FIND THE USER BY EMAIL AND RETURN USER
  */
  try {
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
