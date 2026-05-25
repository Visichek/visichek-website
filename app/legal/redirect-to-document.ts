import { notFound, redirect } from "next/navigation";
import {
  fetchLegalDocumentSlugByDocType,
  type LegalDocType,
} from "../util/legal";

export async function redirectToLegalDocument(
  docType: LegalDocType,
  fallbackSlug?: string,
) {
  const slug = (await fetchLegalDocumentSlugByDocType(docType)) ?? fallbackSlug;

  if (!slug) notFound();

  redirect(`/legal/${slug}`);
}
