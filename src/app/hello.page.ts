
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  template: `
    <div style="padding:24px">
      <h1>✅ Uygulama Çalışıyor</h1>
      <p>Bu geçici bir sayfa. Şimdi Material shell’e geri döneceğiz.</p>
    </div>
  `,
})
export class HelloPage {}
