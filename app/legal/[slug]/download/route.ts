import { NextResponse } from "next/server";
import { fetchLegalDocument } from "../../../util/legal";

interface LegalDownloadRouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _request: Request,
  { params }: LegalDownloadRouteContext,
) {
  const { slug } = await params;

  try {
    const document = await fetchLegalDocument(slug);
    if (!document?.sourceFileUrl) {
      return new NextResponse("No source file is available for this document.", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const response = NextResponse.redirect(document.sourceFileUrl, 302);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("[legal] failed to resolve download URL:", error);
    return new NextResponse("The source file could not be loaded.", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
