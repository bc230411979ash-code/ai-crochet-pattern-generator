'use client'

import { useState } from 'react'

export default function PatternEditor({ pattern, onSave }) {
  const [editedPattern, setEditedPattern] = useState(pattern.patternText)

  const handleSave = () => {
    onSave({
      ...pattern,
      patternText: editedPattern,
    })
  }

  return (
    <div className="card space-y-4 slide-in">
      <h3 className="text-xl font-bold text-purple-800">✏️ Edit Pattern</h3>
      
      <textarea
        value={editedPattern}
        onChange={(e) => setEditedPattern(e.target.value)}
        className="input-field h-48 font-mono text-sm"
        placeholder="Edit your pattern here..."
      />

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="btn-primary flex-1"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  )
}