
# Sistema de Recomendação de Animes

## Descrição:

Este é um sistema especialista desenvolvido para recomendar animes aos usuários com base em uma árvore de decisão construída a partir de um conjunto de regras. O objetivo principal é proporcionar sugestões personalizadas, alinhadas aos interesses individuais de cada usuário.

## Funcionalidades:

- **Recomendação Personalizada:** O sistema analisa as preferências do usuário, levando em consideração seu perfil, incluindo gostos por filmes, desenhos, músicas e animes.

- **Árvore de Decisão:** Utilizando um conjunto de regras, o sistema cria uma árvore de decisão que mapeia as preferências do usuário para sugerir animes que possam ser do seu interesse.

## Como Utilizar:

   Pra visualizar este projeto, clone o repositório:
 ```
   git clone https://github.com/luacrz/Recomendacao-Animes.git
 ```
  Vá para o diretório do back-end, instale o Pandas (caso não o tenha instalado) e rode o servidor
  ```
  cd BackEnd
  pip install pandas
  uvicorn main:app --reload
  ```
 Vá para o diretório do front-end, instale as dependências e rode o servidor
  ```
    cd ../frontend_paa/
    npm install 
    npm run dev
  ```
 Em seguida, acesse a aplicação em qualquer navegador pela URL informada no terminal (geralmente http://localhost:5173/)
