export async function analyzeImageWithHuggingFace(imageFile) {
  const apiKey = process.env.HUGGINGFACE_API_KEY

  if (!apiKey) {
    throw new Error('HuggingFace API key not configured')
  }

  try {
    const base64 = await fileToBase64(imageFile)
    const base64Data = base64.split(',')[1]

    const response = await fetch(
      'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'POST',
        body: Buffer.from(base64Data, 'base64'),
      }
    )

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('HuggingFace error:', error)
    throw error
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}