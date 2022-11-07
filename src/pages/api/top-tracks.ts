import { getTopTracks } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { items: any; }): any; new(): any; }; }; }) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getTopTracks(accessToken);
  const { items } = await response.json();

  // const tracks = items.slice(0, 10).map((track) => ({
  //   artist: track.artists.map((_artist) => _artist.name).join(', '),
  //   songUrl: track.external_urls.spotify,
  //   title: track.name
  // }));

  return res.status(200).json({ items });
};
export default handler;