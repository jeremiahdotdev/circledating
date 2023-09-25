import { requireUser } from "@/helpers/requireUser";
import { routes } from "@/globals/routes";
import { useSession } from "next-auth/react";
import React, { memo } from "react";
import type { GetServerSidePropsContext, NextPage } from "next";

export const getServerSideProps = requireUser(
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_ctx: GetServerSidePropsContext) => {
    return { props: {} };
  }
);

const Dashboard: NextPage = memo(() => {
  const { data } = useSession();

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="max-w-lg">
          <h1 className="text-center text-5xl font-bold leading-snug text-gray-400">
            You are logged in!
          </h1>
          <p className="my-4 text-center leading-loose">
            You are allowed to visit this page because you have a session,
            otherwise you would be redirected to the login page.
          </p>
          <div className="my-4 rounded-lg bg-gray-700 p-4">
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
          <div className="text-center">
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={routes.logout().action}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
