import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

// test
export default function TopTracks() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  const getTopTracks = async () => {
    const res = await fetch("/api/top-tracks");
    const { items } = await res.json();
    setList(items);
    console.log({ items });
  };
  useEffect(() => {
    getTopTracks();
  }, []);

  const topTracks = list
    .map((item, index) => (
      <>
        <main key={item["id"]}>
          <div
            key={item["id"]}
            className={index.toString()}
            id={index.toString()}
          >
            <div className="text" key={item["id"]}>
              <div className="iconButton" key={item["id"]}>
                <ul>
                  <li>
                    <a
                      href={item["album"]["external_urls"]["spotify"]}
                      target="__blank"
                    ></a>
                  </li>
                </ul>
              </div>
              <h1>You're number {index + 1} is: </h1>
              <h1 className="title">{item["name"]}</h1>
              <h1 className="title"> by {item["artists"][0]["name"]}</h1>
            </div>
            <div className="image">
              <Image
                width={500}
                height={500}
                alt="album"
                src={item["album"]["images"][0]["url"]}
                key={item["id"]}
              />
            </div>
          </div>
        </main>
      </>
    ))
    .reverse();

  if (session) {
    return <>{topTracks}</>;
  }
  return <></>;
}
