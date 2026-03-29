import {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, BorderStyle, TabStopPosition, TabStopType,
  PageNumber, NumberFormat,
} from 'docx';
import { saveAs } from 'file-saver';

interface LetterheadOpts {
  name: string;
  email: string;
  website: string;
}

export async function exportLetterhead(opts: LetterheadOpts) {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Inter', size: 22, color: '333333' },
          paragraph: { spacing: { line: 340 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1200, left: 1200, right: 1200 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Acstane',
                  bold: true,
                  size: 28,
                  font: 'Inter',
                  color: '111111',
                }),
                new TextRun({
                  text: `\t${opts.email}`,
                  size: 18,
                  font: 'Inter',
                  color: '888888',
                }),
              ],
              tabStops: [{
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              }],
              border: {
                bottom: {
                  style: BorderStyle.SINGLE,
                  size: 1,
                  color: 'DDDDDD',
                  space: 8,
                },
              },
              spacing: { after: 400 },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Acstane',
                  size: 16,
                  font: 'Inter',
                  bold: true,
                  color: 'AAAAAA',
                }),
                new TextRun({
                  text: '  ·  The backbone your product is missing.  ·  ',
                  size: 14,
                  font: 'JetBrains Mono',
                  color: 'CCCCCC',
                }),
                new TextRun({
                  text: opts.website,
                  size: 14,
                  font: 'JetBrains Mono',
                  color: 'CCCCCC',
                }),
                new TextRun({
                  text: '\tPage ',
                  size: 14,
                  color: 'CCCCCC',
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 14,
                  color: 'CCCCCC',
                }),
              ],
              tabStops: [{
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              }],
              border: {
                top: {
                  style: BorderStyle.SINGLE,
                  size: 1,
                  color: 'EEEEEE',
                  space: 8,
                },
              },
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: 'Your content here...', color: 'BBBBBB', italics: true }),
          ],
          spacing: { before: 200 },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `acstane-letterhead-${opts.name.toLowerCase().replace(/\s+/g, '-')}.docx`);
}

interface DocumentCoverOpts {
  title: string;
  subtitle: string;
  description: string;
  version: string;
}

export async function exportDocumentCover(opts: DocumentCoverOpts) {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 2400, bottom: 1440, left: 1440, right: 1440 },
          pageNumbers: { formatType: NumberFormat.DECIMAL },
        },
      },
      children: [
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'TECHNICAL DOCUMENTATION',
              size: 18,
              font: 'JetBrains Mono',
              color: 'A338FF',
              bold: true,
            }),
          ],
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: opts.title,
              size: 72,
              font: 'Inter',
              bold: true,
              color: '111111',
            }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: opts.subtitle,
              size: 72,
              font: 'Inter',
              bold: true,
              color: '111111',
            }),
          ],
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: opts.description,
              size: 24,
              font: 'Inter',
              color: '666666',
            }),
          ],
          spacing: { after: 800 },
        }),
        new Paragraph({
          border: {
            top: {
              style: BorderStyle.SINGLE,
              size: 1,
              color: 'EEEEEE',
              space: 8,
            },
          },
          children: [
            new TextRun({
              text: `Acstane  ·  ${opts.version}  ·  ${new Date().getFullYear()}  ·  CONFIDENTIAL`,
              size: 18,
              font: 'JetBrains Mono',
              color: 'AAAAAA',
            }),
          ],
          alignment: AlignmentType.LEFT,
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'acstane-document-cover.docx');
}
