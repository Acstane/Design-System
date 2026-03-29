import {
  Document, Packer, Paragraph, TextRun, Header, Footer, ImageRun,
  AlignmentType, BorderStyle, TabStopPosition, TabStopType,
  PageNumber, ShadingType,
} from 'docx';
import { saveAs } from 'file-saver';

const LOGO_SVG_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575" width="120" height="120">
  <defs><linearGradient id="g" x1="100.3" y1="222.78" x2="269.55" y2="125.05" gradientTransform="translate(0 576) scale(1 -1)" gradientUnits="userSpaceOnUse">
    <stop offset=".2" stop-color="#a338ff"/><stop offset=".28" stop-color="#a93eff"/><stop offset=".75" stop-color="#ca64ff"/><stop offset="1" stop-color="#d773ff"/>
  </linearGradient></defs>
  <path d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z" fill="#1a0730"/>
  <path d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z" fill="url(#g)"/>
</svg>`;

async function svgToPng(svg: string, size: number): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => {
        b!.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
      }, 'image/png');
    };
    img.src = url;
  });
}

interface LetterheadOpts {
  name: string;
  email: string;
  website: string;
}

export async function exportLetterhead(opts: LetterheadOpts) {
  const logoPng = await svgToPng(LOGO_SVG_DARK, 120);

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
          margin: { top: 1600, bottom: 1200, left: 1200, right: 1200 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new ImageRun({ data: logoPng, transformation: { width: 22, height: 22 }, type: 'png' }),
                new TextRun({ text: '  Acstane', bold: true, size: 24, font: 'Inter', color: '111111' }),
                new TextRun({ text: `\t${opts.email}`, size: 17, font: 'Inter', color: '999999' }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E8E8E8', space: 10 },
              },
              spacing: { after: 300 },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new ImageRun({ data: logoPng, transformation: { width: 12, height: 12 }, type: 'png' }),
                new TextRun({ text: '  Acstane', size: 14, font: 'Inter', bold: true, color: 'BBBBBB' }),
                new TextRun({ text: '   ·   The backbone your product is missing.', size: 12, font: 'JetBrains Mono', color: 'CCCCCC' }),
                new TextRun({ text: `\t${opts.website}   ·   Page `, size: 12, font: 'JetBrains Mono', color: 'CCCCCC' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 12, font: 'JetBrains Mono', color: 'CCCCCC' }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              border: {
                top: { style: BorderStyle.SINGLE, size: 1, color: 'F0F0F0', space: 10 },
              },
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: 'Your content here...', color: 'CCCCCC', italics: true, size: 22 }),
          ],
          spacing: { before: 200 },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `acstane-letterhead.docx`);
}

interface DocumentCoverOpts {
  title: string;
  subtitle: string;
  description: string;
  version: string;
}

export async function exportDocumentCover(opts: DocumentCoverOpts) {
  const logoPng = await svgToPng(LOGO_SVG_DARK, 240);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 2400, bottom: 1800, left: 1440, right: 1440 },
          },
        },
        children: [
          new Paragraph({ spacing: { before: 1200 } }),
          new Paragraph({
            children: [
              new ImageRun({ data: logoPng, transformation: { width: 48, height: 48 }, type: 'png' }),
              new TextRun({ text: '  Acstane', size: 32, font: 'Inter', bold: true, color: '111111' }),
            ],
            spacing: { after: 800 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'TECHNICAL DOCUMENTATION',
                size: 16, font: 'JetBrains Mono', color: 'A338FF', bold: true,
              }),
            ],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: opts.title, size: 72, font: 'Inter', bold: true, color: '111111' }),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: opts.subtitle, size: 72, font: 'Inter', bold: true, color: '111111' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [],
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 6, color: 'A338FF', space: 0 },
            },
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: opts.description, size: 24, font: 'Inter', color: '666666' }),
            ],
            spacing: { after: 1200 },
          }),
          new Paragraph({
            border: {
              top: { style: BorderStyle.SINGLE, size: 1, color: 'E8E8E8', space: 10 },
            },
            children: [
              new TextRun({ text: `Acstane  ·  ${opts.version}  ·  ${new Date().getFullYear()}  ·  CONFIDENTIAL`, size: 16, font: 'JetBrains Mono', color: 'AAAAAA' }),
            ],
          }),
        ],
      },
      {
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
                  new ImageRun({ data: logoPng, transformation: { width: 16, height: 16 }, type: 'png' }),
                  new TextRun({ text: '  Acstane', bold: true, size: 20, font: 'Inter', color: '333333' }),
                  new TextRun({ text: `\t${opts.title} ${opts.subtitle}`, size: 16, font: 'Inter', color: 'AAAAAA' }),
                ],
                tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
                border: {
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E8E8E8', space: 8 },
                },
                spacing: { after: 300 },
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Acstane  ·  CONFIDENTIAL', size: 14, font: 'JetBrains Mono', color: 'CCCCCC' }),
                  new TextRun({ text: '\tPage ', size: 14, font: 'JetBrains Mono', color: 'CCCCCC' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 14, font: 'JetBrains Mono', color: 'CCCCCC' }),
                ],
                tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
                border: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: 'F0F0F0', space: 8 },
                },
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: 'Your content here...', color: 'CCCCCC', italics: true }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'acstane-document.docx');
}
