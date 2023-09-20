import { put } from "@vercel/blob";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const file = routerQueryAttributeToString(request.query.filename);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const blob = await put(file.split(".")[0], request.body, {
    access: "public",
  });

  return response.status(200).json(blob);
}
