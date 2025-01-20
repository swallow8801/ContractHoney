"use client"

import { Suspense } from "react"
import { Container } from "./analysis.styled"

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <Container>
      <div>Loading...</div>
    </Container>
  )
}

// Separate the content that uses useSearchParams into its own component
function AnalysisContent() {
  const { AnalysisPage } = require("./AnalysisContent")
  return <AnalysisPage />
}

// Main component with Suspense boundary
export default function Analysis() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AnalysisContent />
    </Suspense>
  )
}

