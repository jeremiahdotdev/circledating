import { GetServerSidePropsContext } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
export const defaultAuthProps = async (_ctx: GetServerSidePropsContext) => {
  return { props: {} };
};
