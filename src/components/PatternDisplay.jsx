'use client'

import { useState } from 'react'

export default function PatternDisplay({ pattern }) {
  const [copied, setCopied] = useState(false)

  const downloadPattern = () => {
    const element = document.createElement('a')
    const file = new Blob([pattern.patternText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'crochet-pattern.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pattern.patternText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold text-purple-800 mb-4">📋 Generated Pattern</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap break-words">
            {pattern.patternText}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={copyToClipboard}
          className="btn-primary text-sm"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
        <button
          onClick={downloadPattern}
          className="btn-primary text-sm"
        >
          📥 Download
        </button>
      </div>

      {pattern.difficulty && (
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Difficulty</p>
            <p className="text-lg font-bold text-blue-600">{pattern.difficulty}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Est. Time</p>
            <p className="text-lg font-bold text-green-600">{pattern.estimatedTime}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Yarn Weight</p>
            <p className="text-lg font-bold text-orange-600">{pattern.yarnWeight}</p>
          </div>
        </div>
      )}
    </div>
  )
}