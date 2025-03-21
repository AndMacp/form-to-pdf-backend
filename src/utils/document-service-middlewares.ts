import { createPdfAgreement } from './helper-functions'
import fetch from 'node-fetch'
import FormData from 'form-data'

const formToPdfMiddleware = () => {
  return async (context, next) => {
    const result = await next()

    if (context.action === 'create') {
      const pdfDoc = await createPdfAgreement(result)

      const formData = new FormData()
      formData.append('files', pdfDoc, {
        filename: `agreement-${result.name}-${result.surname}-${result.id}.pdf`,
        contentType: 'application/pdf',
      })

      const uploadRes = await fetch(
        'https://form-to-pdf-backend-production-46e9.up.railway.app/api/upload',
        {
          method: 'POST',
          body: formData,
          headers: formData.getHeaders(),
        }
      )

      const uploadedFile = (await uploadRes.json())[0]

      await strapi.entityService.update('api::agreement.agreement', result.id, {
        data: {
          agreement: [uploadedFile.id],
        },
      })
    }
    return result
  }
}

export { formToPdfMiddleware }
