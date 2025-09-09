// Manual cache clear script
console.log('🧹 Manuel cache temizleme başlatılıyor...')

// Browser'da çalıştırılacak kod
const clearScript = `
console.log('🧹 LocalStorage ve SessionStorage temizleniyor...')
localStorage.clear()
sessionStorage.clear()
console.log('✅ Cache temizlendi! Sayfa yenilenecek...')
setTimeout(() => {
  window.location.reload()
}, 1000)
`

console.log('📋 Browser console\'da şu kodu çalıştır:')
console.log('---')
console.log(clearScript)
console.log('---')
console.log('Veya browser\'ı hard refresh yap: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)')
