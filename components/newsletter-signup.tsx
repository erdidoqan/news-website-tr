import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  return (
    <div className="bg-gray-900 text-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5" />
        <h3 className="font-serif text-lg font-bold">Haber Bülteni</h3>
      </div>

      <p className="text-gray-300 text-sm mb-4">Günlük haber özetini e-posta adresinize gönderelim.</p>

      <div className="space-y-3">
        <Input type="email" placeholder="E-posta adresiniz" className="bg-white text-gray-900 border-gray-300" />
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Abone Ol</Button>
      </div>

      <p className="text-xs text-gray-400 mt-3">İstediğiniz zaman abonelikten çıkabilirsiniz.</p>
    </div>
  )
}
