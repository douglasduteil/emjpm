import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { useRouter } from "next/router";
import React from "react";

import { LayoutSignup } from "../../src/components/Layout";
import { SignupContextProvider } from "../../src/components/Signup/context";
import { SignupServiceInvitation } from "../../src/components/Signup/SignupServiceInvitation";
import { withAuthSync } from "../../src/util/auth";

const SignupInvitationPage = () => {
  const {
    query: { token }
  } = useRouter();

  return (
    <SignupContextProvider>
      <LayoutSignup>
        <BoxWrapper pt="6" px="1">
          <SignupServiceInvitation token={token} />
        </BoxWrapper>
      </LayoutSignup>
    </SignupContextProvider>
  );
};

export default withAuthSync(SignupInvitationPage);
