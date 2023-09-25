import { CirclesView } from "@/views/CirclesView/CirclesView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireUser } from "@/helpers/requireUser";

export const getServerSideProps = requireUser(defaultAuthProps);

export default CirclesView;
