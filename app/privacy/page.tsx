import { redirectToLegalDocument } from "../legal/redirect-to-document";

export default async function PrivacyPolicyRedirectPage() {
  await redirectToLegalDocument("privacy_policy", "privacy-policy");
}
