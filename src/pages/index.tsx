import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import TopTracks from "../components/TopTracks";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  // console.log(session.token);
  return (
    <>
      <Head>
        <title>CardioAud.io</title>
        <meta name="description" content="cardioaud.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there!</h1>
                <h2 className="pt-3 text-3xl font-bold">
                  Welcome to CardioAud.io!
                </h2>
                <p className="py-6">
                  This app will allow you to connect your Spotify and see your
                  top 5 tracks! Click the button below to connect your Spotify
                  Account!
                </p>
                {session ? (
                  <>
                    <p>Signed in as {session.user?.name}</p>
                    <div className="hero-content text-center">
                      {/* <img
                        src={session.user?.image}
                        alt=""
                        width="100px"
                        className="mask mask-circle"
                      /> */}
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="btn-success btn mt-3 rounded"
                    >
                      Logout
                    </button>
                    {/* <TopTracks /> */}
                  </>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="btn-success btn mt-3 rounded"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
