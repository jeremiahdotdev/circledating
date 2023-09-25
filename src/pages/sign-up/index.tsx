import { SignUpView } from "@/views/SignUpView/SignUpView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireNoAuth } from "@/helpers/requireNoAuth";

export const getServerSideProps = requireNoAuth(defaultAuthProps);

export default SignUpView;
