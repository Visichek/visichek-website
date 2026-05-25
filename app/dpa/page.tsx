import { redirectToLegalDocument } from "../legal/redirect-to-document";

export default async function DataProcessingRedirectPage() {
  await redirectToLegalDocument(
    "data_processing_agreement",
    "data-processing-agreement",
  );
}
