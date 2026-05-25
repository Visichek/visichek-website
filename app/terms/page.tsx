import { redirectToLegalDocument } from "../legal/redirect-to-document";

export default async function TermsRedirectPage() {
  await redirectToLegalDocument("terms_of_service", "terms-of-service");
}
