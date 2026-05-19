import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export const uploadFile = async (fileBuffer, bucket, originalName, mimeType) => {
  const storagePath = Date.now() + '_' + originalName.replace(/\s+/g, '_')

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    })

  if (error) throw new Error('Upload failed: ' + error.message)

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath)

  return {
    publicUrl: data.publicUrl,
    storagePath,
  }
}

export const deleteFile = async (bucket, storagePath) => {
  const { error } = await supabase.storage.from(bucket).remove([storagePath])
  if (error) throw new Error('Delete failed: ' + error.message)
}
