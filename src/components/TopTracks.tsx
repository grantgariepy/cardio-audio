import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import Blurb from "./Blurb";
// import { Link } from "react-scroll";

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
                  >
                    {/* <span>
                      <img src={item["album"]["images"][0]["url"]} />
                    </span>
                    <span>
                      <img src={item["album"]["images"][0]["url"]} />
                    </span>
                    <span>
                      <img src={item["album"]["images"][0]["url"]} />
                    </span>
                    <span>
                      <img src={item["album"]["images"][0]["url"]} />
                    </span>
                    <span>
                      <img src={item["album"]["images"][0]["url"]} />
                    </span> */}
                  </a>
                </li>
              </ul>
            </div>

            {/* <Blurb key={item['id']} rank={index} /> */}
            <h1 className="title">{item["name"]}</h1>
            <h1 className="title"> by {item["artists"][0]["name"]}</h1>
          </div>
          <div className="image">
            <img src={item["album"]["images"][0]["url"]} />
          </div>
        </div>
        {/* <div className="scrollButtonContainer" id="scroll">
          <Link to={(index - 1).toString()} smooth={true}>
            <button className="scrollButton">V</button>
          </Link>
        </div> */}
      </main>
    ))
    .reverse();

  if (session) {
    return <>{topTracks}</>;
  }
  return <></>;
}
