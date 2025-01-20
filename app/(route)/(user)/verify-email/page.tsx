"use client"

import { Suspense } from "react"
import { Container } from "./verifyEmail.styled"

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <Container>
      <div>Loading...</div>
    </Container>
  )
}

// Separate the content that uses useSearchParams into its own component
function VerifyEmailContent() {
  const { VerifyEmailForm } = require("./VerifyEmailForm")
  return <VerifyEmailForm />
}

// Main component with Suspense boundary
export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyEmailContent />
    </Suspense>
  )
}

