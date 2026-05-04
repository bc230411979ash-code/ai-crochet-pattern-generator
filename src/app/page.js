'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import PatternDisplay from '@/components/PatternDisplay'
import PatternEditor from '@/components/PatternEditor'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  const [pattern, setPattern] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const handleImageUpload = async (file) => {
    setLoading(true)
    setError(null)
    setPattern(null)
    
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()
      setPattern(data)
      setEditMode(false)
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePattern = (updatedPattern) => {
    setPattern(updatedPattern)
    setEditMode(false)
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-purple-800">
            🧶 AI Crochet Pattern Generator
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Upload a crochet image or pattern photo, and our AI will analyze it and generate a detailed crochet pattern you can follow!
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <ImageUpload onUpload={handleImageUpload} disabled={loading} />
            
            {loading && (
              <div className="card bg-white rounded-lg p-8 text-center">
                <LoadingSpinner />
                <p className="mt-4 text-gray-600">Analyzing your image...</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {pattern && (
              <>
                <PatternDisplay pattern={pattern} />
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="btn-primary"
                  >
                    {editMode ? 'Done Editing' : 'Edit Pattern'}
                  </button>
                </div>
                {editMode && (
                  <PatternEditor 
                    pattern={pattern} 
                    onSave={handleUpdatePattern}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}