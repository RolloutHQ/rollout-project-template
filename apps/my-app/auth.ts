import { AppCredential, defineJWTAuth } from "@rollout/framework";

export type MyAppCredential = AppCredential<{
  apiKey: string;
}>;

export const auth = defineJWTAuth<MyAppCredential>({
  // uncomment this if your app only ever has single credential per user
  // this will cause the credential dropdown to be hidden and the first credential automatically preselected
  // singleCredentialOnly: true,

  // this will be called every time a consumer interacts with the API
  async getCredentialFromJWT({ consumer, authData }) {
    // authData is whatever was passed in consumer's token under ["rollout.com"].authData

    return {
      // credentialKey is a unique identifier for the credential
      credentialKey: consumer.consumerKey,

      // data can be any shape descibed by MyAppCredential
      data: {
        apiKey: (authData as { apiKey: string }).apiKey,
      },
    };
  },

  // this will be called every time before using the credential
  // you can make sure the credential is valid and doesn't need refreshing
  // refreshTokens: false can be used in case no refreshing is ever needed
  async refreshTokens({ credential }) {
    // check and refresh credential
    // return valid credential
    return credential.data;
  },

  // here you can customize how the credential will be presented in the UI
  async getCredentialOption({ credential }) {
    return {
      label: `Primary`,
      avatar: undefined,
    };
  },
});
