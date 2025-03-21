import PDFDocument from 'pdfkit'
import getStream from 'get-stream'

export async function createPdfAgreement(userData) {
  const response = await fetch('http://localhost:1337/api/agreement-template')
  const agreement = (await response.json()) as any

  const filledAgreement = agreement.data.text
    .replace('[Name]', userData.name)
    .replace('[Surname]', userData.surname)
    .replace('[Age]', userData.age)
    .replace('[Country]', userData.country)
    .replace('[City]', userData.city)

  const doc = new PDFDocument()

  doc.fontSize(14).text(filledAgreement, { lineGap: 4 })
  doc.end()

  return await getStream.buffer(doc)
}
