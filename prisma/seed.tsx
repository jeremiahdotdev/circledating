import { Circle } from "@prisma/client";
import { CircleSchemaType, DefaultCirclesList } from "@/schemas/Circle";
import { prisma } from "@/server/db";

function createMany() {
  DefaultCirclesList.forEach((circle: CircleSchemaType) => {
    const dataRow: Circle = {
      name: circle.name,
      label: circle.label,
      ageMaxRestriction: circle.ageMinRestriction ?? null,
      ageMinRestriction: circle.ageMinRestriction ?? null,
      maxWeightRestriction: circle.maxWeightRestriction ?? null,
    };
    void prisma.circle.create({ data: dataRow });

    if (circle.sexRestriction) {
      void prisma.circle.update({
        where: {
          name: circle.name,
        },
        data: {
          sexRestriction: {
            circleName: circle.name,
            restriction: circle.sexRestriction,
          },
        },
      });
    }
  });
}

createMany();
