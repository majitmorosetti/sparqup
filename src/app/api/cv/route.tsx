// app/api/cv/route.tsx
import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import { createCVDocument } from '@/components/cv/CVDocument';
import { cvData } from '@/data/cv-data';


export async function GET() {
  try {
    const document = createCVDocument(cvData);
    const blob = await pdf(document).toBlob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="CV-Majit-Morosetti.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Erreur génération PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF' },
      { status: 500 }
    );
  }
}