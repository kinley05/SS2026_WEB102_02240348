import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'video/mp4',
    'video/quicktime',
    'video/mpeg',
    'video/webm',
    'application/octet-stream' // fallback for files with unknown MIME type
  ]
  
  // Also allow by file extension as fallback
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.mpeg', '.webm']
  const fileExt = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'))
  
  if (allowed.includes(file.mimetype) || allowedExtensions.includes(fileExt)) {
    cb(null, true)
  } else {
    cb(new Error(`File type ${file.mimetype} not allowed. Allowed: images (jpeg, png, gif) and videos (mp4, mov, mpeg, webm)`), false)
  }
}

const upload = multer({
  storage,
  limits: { 
    fileSize: 50 * 1024 * 1024,
    files: 2,
    fields: 10
  },
  fileFilter,
})

export default upload