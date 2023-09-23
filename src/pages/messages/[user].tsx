import { MessagesView } from "@/views/MessagesView/MessagesView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireUser } from "@/helpers/requireUser";

export const getServerSideProps = requireUser(defaultAuthProps);

export default MessagesView;
