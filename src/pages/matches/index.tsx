import { ConversationsView } from "@/views/ConversationView/ConversationsView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireUser } from "@/helpers/requireUser";

export const getServerSideProps = requireUser(defaultAuthProps);

export default ConversationsView;
