# 🍺 Festa da Galera - Ultimate Beer Runner 2.0

## 📋 Descrição Geral

**Festa da Galera - Ultimate Beer Runner 2.0** é um jogo de corrida infinita (endless runner) em 2D desenvolvido em HTML5 Canvas puro, criado como convite interativo para uma festa. O jogo combina mecânicas clássicas de plataforma com elementos de progressão, customização e sistemas sociais modernos.

---

## 🎮 Mecânicas Principais

### Sistema de Movimento
- **Corrida Automática**: O personagem corre automaticamente da esquerda para a direita
- **Pulo Variável**: Sistema de pulo com intensidade controlada
  - **CRÍTICO**: O pulo deve ser INSTANTÂNEO ao clique/toque (latência < 16ms)
  - Toque/clique rápido: pulo baixo
  - Segurar o toque: pulo alto (com barra de indicador visual)
  - Física realista com gravidade e aceleração
  - Visual de "impulso" ao deixar o chão
- **Controles Universais** (funcionam AMBOS em qualquer dispositivo):
  - **Mobile**: Toque em qualquer lugar da tela (exceto botões de UI). Resposta instantânea sem delay.
  - **Desktop**: Espaço, seta para cima, ou clique do mouse em qualquer lugar.
  - **IMPORTANTE**: Todos os botões da interface (menus, pause, tabs, etc) devem funcionar tanto com clique quanto com toque.

### Sistema de Pontuação
- **Pontos Base**: 1 ponto a cada 10 frames (~0.16s)
- **Coleta de Itens**: 50 pontos base por item
- **Multiplicador de Combo**: 
  - Combo x1.5 (3 itens consecutivos)
  - Combo x2.0 (6 itens consecutivos)
  - Combo x2.5 (9 itens consecutivos)
  - Combo x3.0 (12+ itens consecutivos)
- **Power-ups**: Dobro de pontos quando ativo
- **Bônus de Nível**: +500 pontos ao completar cada nível

### Sistema de Combos
- Reseta após 3 segundos (180 frames) sem coletar itens
- Visual feedback com animação e cores vibrantes
- Display central mostrando multiplicador atual
- Efeito sonoro progressivo conforme o combo aumenta

### 🔥 Fever Mode (Modo Febre)
- **Ativação**: Ocorre automaticamente após manter um combo alto por certo tempo (lógica interna)
- **Efeitos**:
  - Contagem regressiva de duração
  - Som de fundo agitado ("fever")
  - Efeitos visuais intensificados
  - Reset automático ao fim do timer

---

## 🏃 Personagem

### Modelos Disponíveis
1. **Homem**: Corpo padrão masculino
2. **Mulher**: Corpo feminino com cabelo longo
3. **Sprite Custom**: Suporte para sprite sheet externo (48x48px, 3 linhas x 8 frames)

### Customização Procedural
- **Roupas**: 6 cores (Vinho, Dourado, Azul, Rosa, Branco, Verde Neon)
- **Acessórios**:
  - Nenhum
  - Boné
  - Peruca
  - Cartola
  - Óculos escuros
  - Coroa

### Animações
- **IDLE**: Estado parado (4 frames)
- **RUN**: Corrida com movimento de pernas (8 frames alternados)
- **JUMP**: Pose de salto (mudança visual imediata ao pular)
- **Trail Effects**: Rastros coloridos quando power-ups estão ativos

---

## 🎯 Objetivos e Progressão

### Objetivo Principal
Coletar **13 itens de festa** (bebidas/comidas) por nível enquanto desvia de obstáculos (desculpas).

### Sistema de Níveis
- **Nível 1-4**: Ambiente diurno, velocidade progressiva
- **Nível 5+**: Modo noturno com luzes de festa piscantes
- Velocidade base aumenta: `5 + (nível - 1)`
- Spawn rate de obstáculos acelera a cada nível

### Barra de Progresso
- Visual animado com gradiente dourado/laranja
- Efeito shimmer constante
- Texto centralizado mostrando `X/13 ITENS`

---

## 🍺 Itens Colecionáveis

### Itens Normais (40x50px)
Lista expandida de itens temáticos:
1. **🍺 Cerveja**: Caneca com espuma
2. **🍹 Coquetel**: Drink rosa triangular
3. **💧 Água**: Garrafa azul
4. **🥩 Churrasco**: Carne na espetada
5. **🍕 Pizza**: Fatia redonda
6. **🌭 Hot Dog**: Cachorro quente
7. **🍺 Chopp**: Tulipa de chopp
8. **🥩 Carne**: Pedaço de carne crua/assada
9. **🍬 Doce**: Bala ou pirulito
10. **🥐 Salgado**: Coxinha ou similar
11. **🥤 Refri**: Copo de refrigerante
12. **🥪 Sanduíche**: Lanche natural
13. **🎤 Karaokê**: Microfone
14. **🎵 Música**: Nota musical
15. **🥁 Pagode**: Tambor/Pandeiro

**Características**:
- Movimento flutuante senoidal
- Spawn a cada 75 frames
- 50 pontos base + multiplicadores

### Itens Dourados (50x60px)
- **Probabilidade**: 3% de spawn
- **Visual**: 
  - Aura dourada pulsante
  - Brilho com shadow blur
  - 4 partículas orbitais
- **Recompensas**:
  - +500 pontos
  - +25 moedas
  - Conquista "Caçador de Ouro"
  - Screen shake intenso
  - 40 partículas de explosão

### 💰 Moedas
- Aparecem randomicamente (a cada 120 frames, 60% chance)
- Rotação e escala pulsante
- Som distintivo agudo
- Usadas na loja de skins

---

## ⚡ Power-Ups

### Tipos e Efeitos
1. **🧲 Magnet (Ímã)**
   - Duração: 10 segundos (600 frames)
   - Atrai itens/moedas num raio de 250px
   - Trail roxo no personagem
   - Brilho roxo ao redor

2. **🛡️ Shield (Escudo)**
   - Duração: 10 segundos (600 frames)
   - Protege de 1 colisão com obstáculo
   - Aura ciano pulsante ao redor do personagem (Círculo pulsante, raio 38px, linha 4px)
   - Trail azul

3. **⬆️ Super Jump**
   - Duração: 10 segundos (600 frames)
   - Força de pulo aumentada em ~37%
   - Trail dourado
   - Brilho dourado ao pular

4. **🐌 Slow Motion**
   - Duração: 10 segundos (600 frames)
   - Reduz velocidade do jogo para 60%
   - Facilita timing de pulos
   - Trail azul claro
   - Tudo ao redor se move mais devagar

5. **2️⃣ Double Points**
   - Duração: 10 segundos (600 frames)
   - Dobra pontos de itens coletados
   - Trail verde
   - Sinergia poderosa com combos
   - Números de pontos em verde brilhante

### Mecânica de Spawn
- Spawn a cada 550 frames
- Visual com ícone emoji pulsante
- **REGRA CRÍTICA**: Não spawnar um power-up se o mesmo tipo já está ativo (Ex: Se Shield está ativo, não pode spawnar outro Shield). Outros tipos podem spawnar.

### Feedback Visual de Power-up Ativo
- **OBRIGATÓRIO**: O jogador DEVE saber visualmente que um power-up está ativo.
- **HUD - Canto Superior Direito**:
  - Caixa colorida com borda do power-up
  - Ícone emoji do power-up
  - Timer em SEGUNDOS: "🧲 8s", "🛡️ 5s", etc
  - Atualização em tempo real
  - Cores: Magnet (Roxo #FF00FF), Shield (Ciano #00FFFF), Super Jump (Dourado #FFD700), Slow Mo (Azul Claro #87CEEB), Double Points (Verde #00FF00).
- **Trail no Personagem**:
  - Rastro de partículas coloridas seguindo o personagem
  - Cor corresponde ao power-up ativo
  - 20 frames de vida por partícula trail
- **Múltiplos Power-ups Simultâneos**:
  - Mostrar múltiplas caixas na HUD empilhadas verticalmente
  - Trails se sobrepõem (mix de cores)
  - Cada um com seu timer independente

---

## 🚧 Obstáculos

### Desculpas Esfarrapadas (Texto)
Blocos de texto representando desculpas para não ir à festa:
- "TÔ CANSADO"
- "VAI CHOVER"
- "SEM GRANA"
- "TÔ VELHO"
- "PREGUIÇA"
- "TÔ OCUPADO"
- "OUTRO DIA"

### Garçom Desastrado (Especial)
- **Probabilidade**: 20% de chance de spawnar no lugar de um texto
- **Visual**: Retângulo/Sprite representando um garçom ou obstáculo físico
- **Comportamento**: Move-se ligeiramente mais rápido que o chão (efeito de deslocamento)

### Características Gerais
- Tamanho dinâmico baseado no texto/tipo
- Spawn adaptativo:
  - Taxa base: 120 frames - (nível × 5)
  - Gap mínimo entre obstáculos: 90 frames
  - Randomização adicional de 0-40 frames
- **Warning System**: 
  - Contorno vermelho piscante quando a menos de 150px
  - Intensidade aumenta conforme aproximação
- Colisão precisa (com margem de 8px)

---

## 🎨 Ambientação Visual

### Background Dinâmico

#### Céu
- **Dia**: Gradiente azul (#87CEEB → #E0F6FF)
- **Noite (Nível 5+)**: Gradiente roxo escuro (#1a0033 → #330066)
  - Luzes piscantes RGB a cada 15 frames

#### Nuvens
- 3-5 nuvens flutuantes
- Movimento parallax lento (0.2-0.7 speed)
- Opacidade 60%
- Formato com 2 círculos sobrepostos

#### Elementos de Fundo (Parallax)
1. **Árvores**: 
   - Copa verde circular (45px raio)
   - Tronco marrom (24x100px)
   - Velocidade 0.3x

2. **Caixas**: 
   - Blocos cinza (45x55px)
   - Velocidade 0.6x

#### Dançarinos
- NPCs animados dançando no fundo
- 4 cores vibrantes (Rosa, Ciano, Dourado, Verde)
- Bounce senoidal e movimento de braços
- Opacidade 50%

#### Barras de Música
- 10 barras equalizador
- Altura pulsante sincronizada com frames
- 4 cores diferentes
- Gradiente vertical com transparência

### Chão
- Base verde com gradiente (#228B22 → #1a6b1a)
- Linha cinza superior (calçada)
- Tufos de grama animados (movimento senoidal)

---

## 🎆 Efeitos Visuais

### Sistema de Partículas
- **Pulo**: 8 partículas douradas ao decolar (efeito de impulso)
- **Corrida**: Partículas brancas nos pés (quando grounded)
- **Coleta**: 10-15 partículas da cor do item
- **Item Dourado**: 40 partículas explosivas

### Confetes
- Spawn em eventos especiais:
  - 30 confetes ao completar nível
  - 80 confetes em vitória
  - 120 confetes em novo recorde
- Física realista com rotação
- 6 cores diferentes
- Duração: 2 segundos

### Screen Shake
- Intensidade variável (4-20px)
- Decay exponencial (×0.9 por frame)
- Aplicado via `ctx.translate()`
- Triggers:
  - Colisão com escudo: 6px
  - Item dourado: 12px
  - Game Over: 20px

### Toasts Flutuantes
- Animação float-up (1.2s)
- Escala pulsante no meio (1.0 → 1.2 → 0.8)
- Fade out progressivo
- Cores contextuais
- **Classe CSS**: `.toast` (Z-Index 3000, Fixed Position)

### Popup de Conquista (Achievement)
- **Comportamento**: Aparece no topo da tela
- **Prioridade**: É ocultado IMEDIATAMENTE se ocorrer Game Over ou Level Complete para não bloquear a visão
- **Animação**: Slide down + fade in

---

## 🎯 Sistemas de Progressão

### Missões (Rotativas)
Missões aleatórias durante o gameplay:

| Tipo | Descrição | Alvo | Recompensa |
|------|-----------|------|------------|
| collect | Colete X itens | 5 | 20 moedas |
| combo | Combo de Xx | 5 | 30 moedas |
| coins | Pegue X moedas | 10 | 25 moedas |
| perfect | X pulos perfeitos | 3 | 40 moedas |
| powerup | Use X power-ups | 3 | 35 moedas |

- Display no canto superior direito
- Progress tracker em tempo real
- Nova missão 3s após completar

### Desafios Diários
Reset diário às 00:00:

| Tipo | Descrição | Alvo | Recompensa |
|------|-----------|------|------------|
| score | Faça X pontos | 5000 | 100 moedas |
| items | Colete X itens | 50 | 80 moedas |
| streak | Streak de X | 20 | 120 moedas |

- Badge rosa pulsante
- Confetes ao completar
- Salvo em localStorage com data

### Sistema de Streak
- Aumenta a cada segundo de sobrevivência
- Display após 5+ streak
- Emoji de fogo 🔥
- Cor vermelha vibrante com pulso
- Contribui para conquistas

---

## 🏆 Conquistas (Achievements)

### Lista Completa

| Nome | Ícone | Descrição | Condição |
|------|-------|-----------|----------|
| Primeiro Salto | 🦘 | Deu o primeiro pulo | Pular pela 1ª vez |
| Colecionador | 📦 | Coletou 50 itens | 50 itens totais |
| Milionário | 💰 | Acumulou 100 moedas | 100 moedas totais |
| Mestre do Combo | 🔥 | Combo x3 | Atingir combo 3.0x |
| Velocista | ⚡ | Chegou ao nível 5 | Completar nível 4 |
| Sobrevivente | 💪 | Jogou 10 partidas | 10 partidas totais |
| Caçador de Ouro | 🌟 | Pegou item dourado | 1 item dourado |
| Rei da Festa | 👑 | Completou 3 níveis | 3 níveis completos |
| Perfeccionista | 🎯 | 10 pulos perfeitos | 10 perfect jumps |
| Comprador | 🛍️ | Desbloqueou 3 skins | 3 skins compradas |
| Streaker | 🔥 | Streak de 30 | 30s sobrevivendo |
| Power User | ⚡ | Usou todos power-ups | Usar os 5 tipos |

### Definição de "Pulo Perfeito"
- **ESPECIFICAÇÃO EXATA**:
  - Está em velocidade máxima (após os primeiros segundos de jogo)
  - Pula sobre um obstáculo (desculpa)
  - Passa pelo obstáculo SEM colidir (margem de segurança < 10px verticalmente)
  - Não toca no topo do obstáculo durante o arco do pulo
  - A trajetória do pulo forma um arco limpo sobre o obstáculo
- **Critérios Técnicos**:
  - `player.y < obstacle.y - 10`
  - `player.x` overlap com `obstacle.x` durante o pulo
  - `!collision` detectada
  - `player.grounded === false` durante toda a passagem
- **Feedback Visual**:
  - Toast amarelo "PERFECT! +10" acima do personagem
  - Som especial (tom alto, 1000Hz)
  - Bônus de +10 pontos
  - Contador de pulos perfeitos incrementado
  - Partículas douradas extras (5 partículas)

### Sistema
- Popup animado centralizado (3.5s)
- Fundo dourado com borda branca
- Som de conquista (1200Hz sine)
- Vibração (100-50-100ms)
- Salvo em localStorage
- Progress tracking para conquistas incrementais

---

## 🛍️ Loja de Skins

### Moeda Virtual
- **Obtida por**:
  - Coletar moedas no jogo (1:1)
  - Completar missões (20-40)
  - Completar desafios diários (80-120)
  - Itens dourados (25)
- **Persistente**: Salva entre sessões

### Catálogo

| Skin | Preço | Cor | Especial |
|------|-------|-----|----------|
| PADRÃO | 0 | - | Desbloqueada |
| FESTEIRO | 50 | Rosa (#FF1493) | - |
| VIP GOLD | 100 | Dourado (#FFD700) | - |
| NEON | 150 | Ciano (#00FFFF) | - |
| FLAMEJANTE | 200 | Laranja (#FF4500) | - |
| GELO | 250 | Azul claro (#87CEEB) | - |
| ARCO-ÍRIS | 300 | - | ✨ Gradiente |
| LENDÁRIO | 500 | Roxo (#9370DB) | 👑 Premium |

### Interface
- Grid 2x4 responsivo
- Preview canvas 60x60px
- Estados visuais:
  - 🔒 Bloqueada (cinza, ícone cadeado)
  - 🟢 Desbloqueada (borda verde)
  - ✅ Equipada (borda dourada + glow)
- Feedback tátil ao comprar/equipar
- **CRÍTICO**: Funciona tanto com clique quanto com toque

---

## 📊 Estatísticas e Leaderboard

### Stats Rastreadas
- **Recorde de Pontos**: Score mais alto ever
- **Moedas Totais**: Acumuladas lifetime
- **Partidas Jogadas**: Contador total
- **Itens Coletados**: Total lifetime
- **Conquistas**: X/12 desbloqueadas

### Top 5 Leaderboard
- Salva top 5 scores localmente
- Input de nome em novo recorde
- Display com medalhas:
  - 🥇 1º lugar (dourado)
  - 🥈 2º lugar (prata)
  - 🥉 3º lugar (bronze)
  - 4️⃣5️⃣ 4º e 5º (cinza)
- Timestamp de cada score

### 🎫 Ingresso VIP (Feature Especial)
- **Acesso**: Botão "GERAR INGRESSO VIP" na aba STATS
- **Funcionalidade**:
  - Gera dinamicamente uma imagem (Canvas) com:
    - Nome do jogador
    - Recorde atual
    - Data e local da festa
    - Frase de desafio ("Eu vou! Você consegue me superar?")
  - Exibe em um modal exclusivo
- **Ações**:
  - **Salvar / Compartilhar**: Botão dedicado que usa Web Share API (mobile) ou Download direto (desktop)
  - **Fechar**: Retorna ao menu

---

## 🎵 Sistema de Áudio

### Web Audio API
Síntese procedural de sons:

| Evento | Tipo | Frequência | Duração |
|--------|------|------------|---------|
| Pulo | square | 350Hz | 0.12s |
| Item | sine | 650Hz + score×30 | 0.12s |
| Moeda | sine | 900Hz | 0.10s |
| Power-up | square | 1000Hz | 0.25s |
| Missão | sine | 900Hz | 0.30s |
| Item Dourado | sine | 1400Hz | 0.60s |
| Conquista | sine | 1200Hz | 0.40s |
| Game Over | sawtooth | 180Hz | 0.60s |
| Nível | sine | 800Hz | 0.40s |
| Pulo Perfeito | sine | 1000Hz | 0.15s |

### Vibração Háptica
- Suporte via `navigator.vibrate()`
- Padrões variados:
  - Pulo: 20ms
  - Coleta: 15ms
  - Power-up: [50, 30, 50]ms
  - Item Dourado: [100, 50, 100, 50, 100]ms
  - Conquista: [100, 50, 100]ms

---

## 🎮 Interface do Usuário (HUD)

### Durante o Jogo (Canto Superior Esquerdo)
- **Nível**: Display numérico
- **Pontos**: Atualização em tempo real
- **Moedas**: Contador dourado (💰)
- **Streak**: Condicional, aparece após 5+ (🔥)
- **Combo**: Condicional, mostra multiplicador

### Canto Superior Direito
- **Missão Ativa**: Caixa verde com progresso
- **Desafio Diário**: Caixa rosa com badge
- **Power-ups Ativos**: 
  - **OBRIGATÓRIO**: Lista de timers em SEGUNDOS ("🧲 8s", "🛡️ 3s")
  - Atualização em tempo real
  - Cor da borda corresponde ao power-up
  - Múltiplos power-ups empilhados verticalmente

- Label "SEGURE PARA PULAR MAIS ALTO"

---

## 📱 Menus e Telas

### Menu Principal
4 abas navegáveis (**TODAS** funcionam com clique E toque):

#### 1️⃣ JOGAR
- Countdown para festa (dias:horas:minutos)
- Display de recorde e moedas
- Grid 2x2 de stats rápidas
- Botão "COMEÇAR A FESTA!" (animado)
- Botão "TUTORIAL"

#### 2️⃣ VISUAL
- Preview canvas animado do personagem
- 3 controles de setas (funcionam com clique E toque):
  - Modelo (Homem/Mulher/Sprite)
  - Roupa (6 cores)
  - Acessório (6 opções)
- Atualização em tempo real

#### 3️⃣ LOJA
- Saldo de moedas no topo
- Grid 2x4 de skins
- Toque para comprar/equipar
- Toast de feedback

#### 4️⃣ STATS
- Leaderboard Top 5 (scrollable)
- Lista de conquistas (scrollable)
- **Botão GERAR INGRESSO VIP**: Abre o modal do ingresso

### Tela de Pause
- Background blur simulado
- Mensagem: "Aproveite para tomar um gole d'água! 💧"
- Botão "CONTINUAR" (clique E toque)
- Botão "MENU PRINCIPAL" (clique E toque)

### Tela de Game Over
- Título: "😅 DESCULPA NÃO ACEITA!"
- Info box com:
  - Score final (grande)
  - Moedas ganhas
  - Nível atingido
  - Itens coletados
- **Novo Recorde**:
  - Banner pulsante "🏆 NOVO RECORDE! 🏆"
  - Input de nome (máx 12 chars) - funciona com toque para focar
  - Botão "SALVAR" (clique E toque)
- Botões (ambos clique E toque):
  - "🔄 JOGAR NOVAMENTE"
  - "🏠 MENU"

### Tela de Vitória (Nível Completo)
- Título: "🎊 NÍVEL COMPLETO! 🎊"
- "+500 PTS BÔNUS DE CONCLUSÃO!"
- Botão "➡️ PRÓXIMO NÍVEL" (clique E toque)
- **Info da Festa**:
  - Data: 13 DEZ | 12H | SÁBADO
  - Local: Cond. Rio das Pedras - Imbuí
  - QR Code para confirmação
- Botões (todos clique E toque):
  - "✅ CONFIRMAR PRESENÇA"
    - **Link Exato**: [Google Forms](https://docs.google.com/forms/d/e/1FAIpQLSf0bXMLZbsEKBpVuw0QlHtA4o5CSav_fFQByRv34g3oMIQEoQ/viewform)
    - Abre em nova aba (`target="_blank"`)
  - "🏠 MENU"

### Tutorial Overlay
- Fundo escuro 90% opaco
- Caixa branca centralizada
- 6 passos ilustrados:
  1. 👆 Toque para pular
  2. 🖐️ Segure para pulos altos
  3. 🍺 Colete bebidas/comidas
  4. ⚠️ Desvie das desculpas
  5. ⭐ Pegue power-ups
  6. 🎯 Complete missões
- Botão "BORA COMEÇAR!" (clique E toque)
- Mostrado apenas na 1ª vez (localStorage)

---

## ⚙️ Performance e Otimização

### Frame Rate
- **Target**: 60 FPS constante
- **Delta Time**: Normalizado para consistência
  - `dt = deltaTime / TARGET_FRAME_TIME`
  - Cap máximo de 2x para evitar glitches
- **requestAnimationFrame**: Loop otimizado

### Input Response
- **CRÍTICO**: Latência de input < 16ms (1 frame)
- Event listeners diretos sem debounce no pulo
- `{ passive: false }` para permitir preventDefault
- Prioridade máxima no event handler do pulo

### Culling e Cleanup
- Entidades removidas quando `x < -150`
- Partículas removidas quando `life <= 0`
- Arrays filtrados a cada frame

### Canvas Optimization
- `imageSmoothingEnabled = false` (pixel art)
- Double buffering automático do navegador
- Context save/restore estratégico

### Mobile Optimization
- Touch events com `{ passive: false }`
- Prevenção de scroll durante jogo
- Detecção de dispositivo via User Agent
- Resize handler responsivo

### Estrutura DOM
- **Modais**: Todos os modais (`gameOverModal`, `levelCompleteModal`, `ticketModal`, etc.) são filhos diretos de `<body>` para evitar problemas de `z-index` e stacking context.

---

## 💾 Persistência de Dados

### LocalStorage Keys
```javascript
'beerRunnerHighScore'          // Recorde de pontos
'beerRunnerTopScores'          // Array top 5
'beerRunnerCoins'              // Moedas totais
'beerRunnerAchievements'       // Objeto conquistas
'beerRunnerTutorial'           // Boolean tutorial visto
'beerRunnerSkins'              // Array skins desbloqueadas
'beerRunnerEquippedSkin'       // String skin atual
'beerRunnerGamesPlayed'        // Contador partidas
'beerRunnerItemsCollected'     // Total itens
'beerRunnerDailyChallengeDate' // Data último desafio
'beerRunnerDailyChallenge'     // Objeto desafio atual
'beerRunnerPerfectJumps'       // Total pulos perfeitos
'beerRunnerLastPlayerName'     // Último nome usado
```

### Sincronização
- **Save**: Automático ao coletar moedas, completar níveis, game over
- **Load**: Ao iniciar aplicação
- **Validação**: Parse com fallback para valores default

---

## 🌐 Compartilhamento Social

### Função `shareGame()`
- Usa Web Share API (mobile)
- Fallback: Clipboard API (desktop)
- Texto: "Fiz X pontos na Festa da Galera! 🍺🎉 Consegue me superar?"
- URL: `window.location.href`

### Função `shareHighScore()` ⭐
- **Localização**: Aba STATS, botão dedicado "📤 COMPARTILHAR RECORDE"
- Texto customizado: "Meu recorde no Jogo da Festa da Galera é de X pontos. Será que você consegue superar? Clica aqui:"
- Toast de confirmação ao copiar
- Funciona com clique E toque

---

## 🎯 Contexto e Propósito

### Save the Date
- **Data**: 13 de Dezembro, 12h, Sábado
- **Local**: Condomínio Rio das Pedras - Imbuí
- **Propósito**: Convite interativo para festa
- **CTA**: 
  - **QR Code para confirmação**: [Link QR](https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://docs.google.com/forms/d/e/1FAIpQLSf0bXMLZbsEKBpVuw0QlHtA4o5CSav_fFQByRv34g3oMIQEoQ/viewform)
  - **Link direto para Google Forms**: [Google Forms](https://docs.google.com/forms/d/e/1FAIpQLSf0bXMLZbsEKBpVuw0QlHtA4o5CSav_fFQByRv34g3oMIQEoQ/viewform)
  - Compartilhamento viral

### Gamificação do Convite
- Transforma convite passivo em experiência engajante
- Desafios e leaderboard incentivam replayability
- Sistema de moedas/skins aumenta investimento emocional
- Tema "desculpas" como obstáculos é humor auto-consciente

---

## 🔧 Tecnologias Utilizadas

### Core
- **HTML5 Canvas**: Renderização 2D
- **Vanilla JavaScript (ES6+)**: Lógica de jogo
- **CSS3**: UI e animações
- **Google Fonts**: "Press Start 2P" (pixel art)

### APIs
- **Web Audio API**: Síntese de áudio procedural
- **Vibration API**: Feedback háptico
- **LocalStorage API**: Persistência
- **Web Share API**: Compartilhamento nativo
- **Clipboard API**: Fallback para compartilhamento

### Design Patterns
- **Game Loop**: requestAnimationFrame com delta time
- **Object Pool**: Reutilização de partículas
- **State Machine**: Gerenciamento de telas
- **Event-Driven**: Sistema de conquistas/missões
- **Procedural Generation**: Personagens, nuvens, obstáculos

---

## 📐 Especificações Técnicas

### Canvas
- **Dimensões**: Fullscreen responsivo
- **Aspect Ratio**: Adaptativo
- **Coordenadas**: Sistema cartesiano 2D
- **Origin**: Top-left (0,0)

### Personagem
- **Tamanho**: 40x60px
- **Hitbox**: Retângulo com margem de 5px
- **Posição X**: Fixa em 50px
- **Posição Y**: Dinâmica (física)
- **Velocidade Terminal**: ~20px/frame

### Física
- **Gravidade**: 0.8 px/frame²
- **Jump Force**: -19 px/frame (normal), -26 (super)
- **Jump Hold Bonus**: -0.6 px/frame² (até 25 frames)
- **Ground Y**: `canvas.height - 80` (mobile) ou `- 100` (desktop)

### Spawn Rates
- Nuvens: 200 frames (~3.3s)
- Árvores/Caixas: 150 frames (~2.5s)
- Dançarinos: 250 frames (~4.2s)
- Obstáculos: Variável (60-120 frames)
- Itens: 75 frames (~1.25s)
- Moedas: 120 frames (~2s, 60% chance)
- Power-ups: 550 frames (~9.2s)

---

## 🐛 Tratamento de Erros

### Input Handling
- **Touch Events**: `{ passive: false }` + `preventDefault()`
- **Scroll Lock**: `touch-action: none` no body
- **Duplo Touch**: Debounce via flag `isJumpPressed`
- **Context Suspension**: Auto-resume do AudioContext

### Edge Cases
- **Frame Spike**: Delta time cap em 2x
- **Offscreen Elements**: Remoção aos -150px
- **LocalStorage Full**: Try-catch com fallback
- **Sprite Load Fail**: Fallback para rendering procedural

### Browser Compatibility
- **AudioContext**: Fallback para webkit
- **Vibration**: Feature detection
- **Share API**: Fallback para clipboard
- **Touch Events**: Detecção de suporte

---

## 🎨 Paleta de Cores

### Principais
- **Dourado**: `#FFD700` (moedas, UI premium)
- **Vinho**: `#8B0000` (background buttons)
- **Azul Céu**: `#87CEEB` (background dia)
- **Verde Grama**: `#228B22` (chão)

### Power-ups
- Magnet: `#FF00FF` (roxo)
- Shield: `#00FFFF` (ciano)
- Super Jump: `#FFD700` (dourado)
- Slow Mo: `#87CEEB` (azul claro)
- Double Points: `#00FF00` (verde neon)

### UI
- Texto: `#FFF` (branco)
- Shadow: `#000` (preto)
- Success: `#00FF00` (verde)
- Error: `#FF0000` (vermelho)
- Warning: `#FFFF00` (amarelo)

---

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
  - Ground offset: 80px
  - Font sizes reduzidos
  - Touch-friendly hit areas
- **Desktop**: ≥ 768px
  - Ground offset: 100px
  - Mouse/keyboard controls
  - Hover effects

### Adaptações
- Canvas: Resize dinâmico via `window.resize`
- HUD: Flexbox responsivo
- Modais: Max-width 400px, 90% width
- Scrolls: Habilitados apenas em modais
- Font sizes: Escala baseada em viewport

---

## 🚀 Próximas Melhorias Possíveis

### Gameplay
- [ ] Modo multiplayer local
- [ ] Boss fights a cada 5 níveis
- [ ] Eventos especiais temporários
- [ ] Seasonal skins
- [ ] Achievements global (backend)

### Technical
- [ ] Service Worker (PWA)
- [ ] Web Workers para física
- [ ] WebGL renderer
- [ ] Backend para leaderboard global
- [ ] Analytics (GA4)

### UX
- [ ] Modo tutorial interativo
- [ ] Replay de best run
- [ ] Gifmaker de momentos épicos
- [ ] Controller support
- [ ] Accessibility improvements (screen reader)