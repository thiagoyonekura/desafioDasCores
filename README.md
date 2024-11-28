# 🎨 Jogo de Cores - HTML, CSS e JavaScript

## 📜 Descrição do Jogo
O **Jogo de Cores** é simples e divertido! Seu objetivo é clicar no botão que corresponde à **cor do alvo** antes que o tempo se esgote. O alvo sempre será a **cor da palavra exibida na tela**.

- **Como jogar:**  
  - Clique na cor correta para ganhar pontos.  
  - O jogo termina se você:
    - Escolher a cor errada.  
    - Não clicar antes do tempo acabar.

---

## 🎯 Objetivo Técnico
1. **Alvo:**  
   - Uma cor aleatória que **"pinta" a palavra sorteada**.  
   - São 9 cores disponíveis, escolhidas randomicamente em cada rodada.

2. **Palavra sorteada:**  
   - Uma string com o nome das cores, preferencialmente iguais às cores disponíveis nos botões.

3. **Tempo:**  
   - O cronômetro regressivo **varia conforme o nível do jogo**.

4. **Botões:**  
   - 9 botões representam as cores disponíveis.  
   - Os botões são **embaralhados** em cada rodada ou dependendo do nível.

5. **Jogada correta:**  
   - Jogador clica no botão correspondente ao alvo:
     - Soma-se 1 ponto.
     - Inicia-se uma nova rodada.

6. **Jogada errada:**  
   - Jogador clica no botão errado ou o tempo acaba:
     - **Fim de jogo.**

---

## 🎮 Layout do Jogo
1. O jogador preenche um **formulário inicial** antes de começar o jogo.
2. Durante a partida, a tela exibe:
   - O nível atual.
   - O cronômetro regressivo.
   - O alvo (cor da palavra sorteada).
   - Os botões com as cores disponíveis.
3. Ao fim da partida, o jogador visualiza:
   - Sua pontuação total.
   - As informações preenchidas no formulário.

---

## ⚙️ Mecânica do Jogo
- A cada **10 pontos**, o jogo avança para o próximo nível.  
- Mudanças por nível:

| **Nível** | **Tempo para acertar** |
|-----------|-------------------------|
| 1         | 3 segundos              |
| 2         | 2 segundos              |
| 3         | 2 segundos              |
| 4         | 1,7 segundos            |
| 5         | 1,4 segundos            |
| 6         | 1 segundo               |

---

## 🚀 Publicação
A apostila está disponível online no **GitHub Pages**. Acesse [aqui](https://thiagoyonekura.github.io/desafioDasCores/) para visualizar.
