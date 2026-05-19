import supabase from '../lib/supabase.js'

export const uploadFile = async (fileBuffer, bucket, originalName, mimeType) => {
  try {
    // Validate file buffer
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error('File buffer is empty')
    }

    // Validate Supabase credentials
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const storagePath = `${Date.now()}_${originalName.replace(/\s+/g, '_')}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      })

    if (error) {
      console.error(`Supabase upload error for ${bucket}:`, error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(storagePath)

    if (!publicUrlData) {
      throw new Error('Failed to generate public URL')
    }

    return {
      publicUrl: publicUrlData.publicUrl,
      storagePath,
    }
  } catch (error) {
    console.error('Upload error:', error.message)
    throw error
  }
}

export const deleteFile = async (bucket, storagePath) => {
  const { error } = await supabase.storage.from(bucket).remove([storagePath])
  if (error) throw new Error(`Delete failed: ${error.message}`)
}