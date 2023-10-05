import { EmailSchemaType } from "@/schemas/Email";
import { PrismaParameter } from "../types";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { configuration } from "../aws";

export const emailScripts = {
  query: {},
  mutate: {
    send: async ({ input }: PrismaParameter<EmailSchemaType>) => {
      const params = {
        Destination: {
          ToAddresses: [process.env.SES_RECIPIENT_ADDRESS ?? ""],
        },
        Message: {
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: input.body,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: `[CircleDating] ${input.subject}`,
          },
        },
        ReplyToAddresses: [input.email],
        Source: process.env.SES_SENDER_ADDRESS,
      };

      const client: SESClient = new SESClient(configuration);
      const send: SendEmailCommand = new SendEmailCommand(params);

      const response = await client.send(send);

      return response;
    },
  },
};
