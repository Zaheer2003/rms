'use client'
import AuthPage from './auth/page';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AuthPage />
    </div>
  )
}
