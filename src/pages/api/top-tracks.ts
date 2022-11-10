// import { getTopTracks } from '../../lib/spotify';
// import { getSession } from 'next-auth/react';

// const handler = async (req: any, res: any) => {
//   const {
//     token: { accessToken },
//   } = await getToken({ req });
//   const response = await getTopTracks(accessToken);
//   const { items } = await response.json();

//   return res.status(200).json({ items });
// };
// export default handler;

import { getToken } from "next-auth/jwt"
import { getTopTracks } from '../../lib/spotify';

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
 
  const token = await getToken({ req });
  const response = await getTopTracks(token?.accessToken);
  const {items } = await response.json();
  return res.status(200).json({items})


  
  // res.send(JSON.stringify(token, null, 2))
}