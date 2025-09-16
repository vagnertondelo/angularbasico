import { Component, inject, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto-service';
import { ProdutoModel } from '../../models/produtoModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-component.html',
  styleUrl: './produto-component.css'
})
export class ProdutoComponent implements OnInit {

  private service = inject(ProdutoService);

  produtos: ProdutoModel[]=[];
  novoNome = '';
  novoPreco = '';
  novoDescricao = '';
  erro = '';
  sucesso = '';

  loading = false;

  ngOnInit(){
    this.carregar();
  }

    carregar(){
      this.loading = true;
      this.service.listar()
          //Faz a inscrição para reagir ao resultado do Observable
          .subscribe({
            next: d => {
              this.produtos = d;
              this.loading = false;
            },
            error: e => {
              this.erro = e.message;
              this.loading = false;
            }
          });
    }



    adicionar(){
      this.erro='';
      const precoNum = Number(this.novoPreco);
      if (!this.novoNome.trim()) {
        this.erro = 'Informe o nome';
        return;
      }
      if (!this.novoDescricao.trim()) {
        this.erro = 'Informe uma decrção';
        return;
      }
      if (Number.isNaN(precoNum) || precoNum < 0) {
        this.erro = 'Preço inválido';
        return;
      }
      const payload : ProdutoModel={
        id:'',
        nome: this.novoNome,
        descricao : this.novoDescricao,
        preco: precoNum
      }

      this.loading = true;
      this.service.adicionar(payload).subscribe({
        next: (p) => {
          this.sucesso = `Produto ${p.nome} salvo com sucesso`;
          this.loading = false;
          this.novoNome = '';
          this.novoDescricao ='';
          this.novoPreco='';
          this.carregar();

            setTimeout(() => this.sucesso = '', 3000);
        },
           error: (e) => {
              this.erro = e.message || 'Falha ao salvar o produto.';
              this.loading = false;
           }
      })
    }


    remover(id: string){
      this.service.remover(id).subscribe({
        next: (msg: string) =>{
          this.sucesso = msg || "Produto apagado";
          this.carregar();
          setTimeout(() => this.sucesso = '' , 3000);
        },
        error: e => {
          this.erro = e.message || "Deu ruim";
        }
      })
    }






}
