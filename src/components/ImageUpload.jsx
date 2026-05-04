'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function ImageUpload({ onUpload, disabled }) {
  const [preview, setPreview] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)

      onUpload(file)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    disabled,
  })

  return (
    <div className="card">
      <div
        {...getRootProps()}
        className={`border-3 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <p className="text-sm text-gray-600">Click to upload a different image</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-5xl">📸</div>
            {isDragActive ? (
              <p className="text-lg font-semibold text-purple-600">Drop the image here!</p>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-700">
                  Drag & drop your crochet image here
                </p>
                <p className="text-sm text-gray-500">or click to select a file</p>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}