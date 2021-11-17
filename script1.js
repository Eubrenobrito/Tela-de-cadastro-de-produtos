class Produto {
  //atributos
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }
  
  salvar() {
    
    let produto = this.lerDados();

    if (this.validaCampos(produto)) {
      if(this,this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
      
    }

    this.listaTabela();
    this.cancelar();
    // quando adiciona um produto, ele chama a funcao salva, depois, chama a funcao ValidaCampos, se tiver preenchido, irá chamar o "this.adicionar();" que é a funcao que irá adiconar os itens ao array
  }
  
  // funcao que irá listar os dados do array
  listaTabela() {
      let tbody = document.getElementById('tbody');
      tbody.innerText = ''; //para nao duplicar

      for( let i = 0; i < this.arrayProdutos.length; i++) {
        // criando o tr
        let tr = tbody.insertRow();
        // função insertRow tem a função de adicionar uma nova linha a tabela(tbody)
        let td_id = tr.insertCell();
        // funcao insertCell ira inserir uma nova coluna
        let td_produto = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_id.innerText = this.arrayProdutos [i].id;
        td_produto.innerText = this.arrayProdutos [i].nomeProduto;
        td_valor.innerText = this.arrayProdutos [i].preco;
        // usando classList para centralizar com js(pegando a class(.center) do css
        td_id.classList.add('center');
        
        
        // manuseando imagem
        
       
        let imgEdit = document.createElement('img');
        imgEdit.src = 'img/edit.icon.svg';
        imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

        let imgDelete = document.createElement('img');
        imgDelete.src = 'img/delete.icon.svg';
        imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");


        // setAttribute tem dois paramentros ('evento', 'ação') no segundo parametro chama o objeto(produto) e a função(deletar))
        // dentro do metodo do deletar no setAttribute, temos que informar qual que é o id do produto que queremos deletar.
        // para isso, temos que concatenar o valor do nosso id que é o valor que colocamos no array(pegamos a propriedade id do objeto)
        td_acoes.appendChild(imgEdit);
        td_acoes.appendChild(imgDelete);
        
        
        
        
      }
  }

  // se a pessoa escrever todos os campos, irá chamar função "adicionar"
  adicionar(produto) {
    produto.preco = parseFloat(produto.preco);
    this.arrayProdutos.push(produto);
  // função push: adiciona um ou mais elementos para o final de um array e retorna um novo comprimento do array
    this.id++;
  // quando adiciona, incrimenta um Id
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if(this.arrayProdutos[i].id == id){
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        this.arrayProdutos[i].preco = produto.preco;
      }
    }
  }

  preparaEdicao(dados) {
    this.editId = dados.id;

    document.getElementById('produto').value = dados.nomeProduto;
    document.getElementById('preco').value = dados.preco;

    document.getElementById('btn1').innerText = 'Atualizar';
  }

  lerDados() {
    let produto = {};

    produto.id = this.id;
    produto.nomeProduto = document.getElementById('produto').value;
    produto.preco = document.getElementById('preco').value;

    return produto;
  }

  // condicional para verificar se os campos estao vázios
  validaCampos(produto) {
    let msg = "";

    if (produto.nomeProduto == "") {
      msg += "- informe o nome do produto \n";
    }

    if (produto.preco == "") {
      msg += "- informe o preço \n";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  cancelar() {
    
    document.getElementById('produto').value = '';
    document.getElementById('preco').value = '';

    document.getElementById('btn1').innerText = 'Salvar';
    this.editId = null;
  }

  deletar(id) {

    if(confirm('deseja realmente deletar este produto com o id ' + id + ' ?')){
    let tbody = document.getElementById('tbody');
    // função que irá deletar lista do array
    // aqui teremos que criar um for, fazer um laço para identificar se a propriedade id, é a mesma que a gente recebeu no nosso parametro deletar
    for(let i = 0; i < this.arrayProdutos.length; i++) {
      if(this.arrayProdutos[i].id == id) {
        this.arrayProdutos.splice(i, 1);
        tbody.deleteRow(i);
      }
    }
    }
  }
}

var produto = new Produto();
