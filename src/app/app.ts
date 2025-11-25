import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private router = inject(Router);

  // Url reativa (atualiza a cada navegação)
  urlSig = toSignal(
    //escuta os eventos (navegações, etc.)
    this.router.events.pipe(
      // Filtra apenas eventos de fim de navegação
      //  (quando a URL realmente mudou)
      filter(e => e instanceof NavigationEnd),

      // Emite um valor inicial asim
      // que o app carrega (antes da primeira navegação)
      startWith(null),

      //Mapeia o evento para URL atual
      map(() => (this.router.url || '/').split('?')[0].split('#')[0])

    ),
    //Valor inicial do signal nome atual da rota
{initialValue: (typeof location !== 'undefined' ? location.pathname: '/')}
  );
  // Esconde o menu apenas nas rotas de autenticação
  isAuthPage = computed(()=>{
    //Lê a URL atual a partir do signal reativo acima
    const url = this.urlSig();

    // Retorna true se a rota começar com /login ou /recuperar-senha
    //nessas paginas menu não mostra
    return url.startsWith('/login') || url.startsWith('/recuperar-senha');
  })
}
