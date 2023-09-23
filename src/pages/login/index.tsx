import { LoginView } from "@/views/LoginView/LoginView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireNoAuth } from "@/helpers/requireNoAuth";

export const getServerSideProps = requireNoAuth(defaultAuthProps);

export default LoginView;
