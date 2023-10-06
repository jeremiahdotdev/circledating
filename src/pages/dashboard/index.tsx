import { GetServerSidePropsContext } from "next";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routes } from "@/globals/routes";
import { useSession } from "next-auth/react";
import Layout, { LayoutNavProps, LayoutUser } from "../Layout";
import React from "react";

type ServerProps = LayoutNavProps & {
  user: LayoutUser;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const [{ isActive, username }, { preferences, circles }] =
      await Promise.all([caller.users.stats(), caller.preferences.read()]);

    console.log({
      isAuthed: !!ctx.session,
      isActive: isActive,
      username: username,
    });
    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
        },
        preferences: preferences,
        circles: circles,
      } as ServerProps,
    };
  }
);

export default function Page({ user, preferences, circles }: ServerProps) {
  const { data } = useSession();

  return (
    <Layout user={user} circles={circles} preferences={preferences}>
      <div className="min-h-window">
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
      </div>{" "}
    </Layout>
  );
}
