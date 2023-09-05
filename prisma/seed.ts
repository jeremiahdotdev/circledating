import { handleDisconnect, handleError } from "./seeds/util";
import { seedCircles } from "./seeds/seedCircles";
import { seedLocations } from "./seeds/seedLocations";
import { seedMessages } from "./seeds/seedMessages";
import { seedUsers } from "./seeds/seedUsers";

const main = async () => {
  // await seedLocations();
  await seedCircles();
  // await seedUsers();
  // await seedMessages();
};

main().then(handleDisconnect).catch(handleError);
