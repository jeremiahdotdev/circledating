import { NewProfileView } from "@/views/NewProfileView/NewProfileView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireNoUser } from "@/helpers/requireNoUser";

export const getServerSideProps = requireNoUser(defaultAuthProps);

export default NewProfileView;
