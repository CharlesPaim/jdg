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