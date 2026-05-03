// Update the onSubmit function to use your Express backend URL
const onSubmit = async (data) => {
	setIsUploading(true);
	setUploadProgress(0);
	setUploadResult(null);

	try {
		const formData = new FormData();
		formData.append('file', data.file[0]);
		formData.append('name', data.name);

		// Log what we're trying to upload for debugging
		console.log('Uploading file:', data.file[0].name, 'Type:', data.file[0].type);

		// Change the URL to point to your Express backend
		const response = await axios.post('http://localhost:8000/api/upload', formData, {
			onUploadProgress: (progressEvent) => {
				const percentage = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setUploadProgress(percentage);
			}
		});

		setUploadResult({
			success: true,
			message: 'File uploaded successfully!',
			data: response.data
		});
	} catch (error) {
		console.error('Upload error:', error);
		setUploadResult({
			success: false,
			message: error.response?.data?.error || 'Upload failed'
		});
	} finally {
		setIsUploading(false);
	}
};

const dropzoneConfig = {
	// Inside the onDrop callback:
	onDrop: (acceptedFiles) => {
		// Process the dropped files
		onDrop(acceptedFiles);

		// Create preview info for the file (both images and PDFs)
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];

			// For images, create preview URL
			if (file.type.startsWith('image/')) {
				const previewUrl = URL.createObjectURL(file);
				setFilePreview({
					url: previewUrl,
					name: file.name,
					type: file.type
				});
			}
			// For PDFs, just store the name and type (no preview URL needed)
			else if (file.type === 'application/pdf') {
				setFilePreview({
					name: file.name,
					type: file.type
				});
			}
			else {
				// For other file types
				setFilePreview(null);
			}
		}
	},
};

{filePreview && (
	<div className="mb-4">
		<h3 className="font-medium mb-1">Preview:</h3>
		<div className="border rounded p-2">
			{filePreview.type?.startsWith('image/') ? (
				/* Show actual preview for images */
				<img
					src={filePreview.url}
					alt={filePreview.name}
					className="max-w-full h-auto max-h-40 rounded"
				/>
			) : filePreview.type === 'application/pdf' ? (
				/* Just show file name for PDFs */
				<div className="py-2 px-3 bg-gray-100 rounded flex items-center">
					<svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414a2 2 0 00-.586-1.414L14 2.586A2 2 0 0012.586 2H9z"></path>
						<path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
					</svg>
					<span>{filePreview.name}</span>
				</div>
			) : (
				/* Generic file info for other types */
				<div>File selected: {filePreview.name}</div>
			)}
		</div>
	</div>
)}
