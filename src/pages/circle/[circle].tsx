import { CircleProfileView } from "@/views/CircleView/CircleProfileView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireUser } from "@/helpers/requireUser";

export const getServerSideProps = requireUser(defaultAuthProps);

export default CircleProfileView;
