# CONTRIBUTING

Contribuições sempre serão bem vindas, sejam pequenas ou grandes. Leia o código de conduta antes de abrir qualquer issue ou pull request.

## Apoie a causa

Deseja ajudar a disseminar o Open Source na UFCG? Confira nossos projetos apoiados na nossa [plataforma](https://issueai.opendevufcg.org) e ajude da maneira que puder, seja compartilhando, contribuindo para o código ou documentação, sugerindo novas ideias, você que manda!

## Desenvolvimento

Para ajudar no desenvolvimento da nossa plataforma, você precisa ter `yarn` e `node` na sua máquina. Usamos [`React`](https://reactjs.org) para desenvolver o site.

Clone esse repositório, entre na pasta do `IssueAi` na sua linha de comando, e siga os passos:

### Adicione uma chave pessoal do github

Crie uma cópia do arquivo `.env.example` e a nomeie `.env`

Crie uma chave pessoal no github [seguindo esses passos até o 9](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line). Só é necessária a permissão de leitura de repositórios - `public_repo`.

Copie e cole a chave gerada no seu novo arquivo `.env`:

```bash
GITHUB_TOKEN=suaTokenAqui
```

### Instalar dependêndencias

```sh
yarn
```

### Rodar o site em desenvolvimento

```sh
yarn start
```

## Informações adicionais

Usamos [Flow](https://flow.org/) para garantir a qualidade do nosso código seguindo os padrões propostos pelo Flow.
