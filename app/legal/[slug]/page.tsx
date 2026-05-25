import LegalDocumentPage, {
  generateLegalMetadata,
} from "../legal-page-shell";

interface LegalSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LegalSlugPageProps) {
  const { slug } = await params;
  return generateLegalMetadata(slug);
}

export default async function LegalSlugPage({ params }: LegalSlugPageProps) {
  const { slug } = await params;
  return <LegalDocumentPage slug={slug} />;
}
