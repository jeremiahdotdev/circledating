import { Location } from "@prisma/client";
import { countries } from "../../src//globals/location";
import { handleDisconnect, handleError } from "./util";
import { prisma } from "../../src/server/db";

export function seedLocations() {
  const locations: Location[] = [];
  let index = 0;
  countries.forEach(({ continent, country, states }) => {
    if (states.length) {
      states.forEach((state) =>
        locations.push({
          id: (++index).toString(),
          continent: continent,
          country: country,
          state: state,
        })
      );
    } else {
      locations.push({
        id: (++index).toString(),
        continent: continent,
        country: country,
        state: "",
      });
    }
  });

  prisma.location
    .createMany({
      data: locations,
    })
    .then(handleDisconnect)
    .catch(handleError);
}
