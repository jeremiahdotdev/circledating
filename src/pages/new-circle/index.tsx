import { NewCircleView } from "@/views/NewCircleView/NewCircleView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireUser } from "@/helpers/requireUser";

export const getServerSideProps = requireUser(defaultAuthProps);

export default NewCircleView;
