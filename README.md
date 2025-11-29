# Festa da Galera - Ultimate Beer Runner 2.0

Este é um jogo de "Infinity Run" temático de festa, desenvolvido com HTML5 Canvas, JavaScript e CSS.

## 📂 Estrutura de Arquivos

O projeto está atualmente consolidado em três arquivos principais para facilitar a execução direta no navegador (sem necessidade de servidor local). Abaixo está a documentação detalhada de como cada arquivo está organizado logicamente.

### 1. `index.html`
O ponto de entrada do jogo. Contém:
- **Estrutura Base**: Configuração do `canvas` onde o jogo é renderizado.
- **Interface de Usuário (UI)**: Todos os elementos de sobreposição (overlays) HTML que ficam acima do canvas:
  - **Menu Principal**: Abas de Jugar, Visual (Customização), Loja e Estatísticas.
  - **Modais**: Game Over, Nível Completo, Pausa.
  - **HUD**: Elementos de tutorial e popups de conquistas.
- **Scripts e Estilos**: Importa `style.css` e `script.js`.

### 2. `style.css`
Gerencia toda a aparência visual do jogo. Está organizado nas seguintes seções lógicas:
- **Reset & Base**: Normalização de margens, fontes e configuração do corpo da página.
- **Canvas**: Dimensionamento e posicionamento da área de jogo.
- **Menu Overlay**: Estilos para o fundo do menu, título animado e sistema de abas.
- **Componentes UI**: Botões, caixas de estatísticas, grades de itens da loja.
- **Customização**: Controles para troca de skins e acessórios.
- **Modais**: Estilização das janelas de Game Over, Pausa e Nível Completo.
- **Animações**: Keyframes para efeitos de pulso, brilho e transições.
- **Responsividade**: Ajustes para diferentes tamanhos de tela (mobile vs desktop).

### 3. `script.js`
Contém toda a lógica do jogo, atualmente estruturado em um único arquivo para simplicidade de implantação. Suas seções internas são:

1.  **Constantes e Configuração**: Definições de FPS, gravidade, força do pulo e URLs externas.
2.  **Estado do Jogo**: Variáveis globais que controlam o fluxo (menu, jogando, game over), pontuação e estatísticas.
3.  **Entidades**:
    - **Player**: Objeto principal com propriedades de física, estado de animação e customização.
    - **Arrays de Objetos**: Listas para obstáculos, itens colecionáveis, partículas e power-ups.
4.  **Dados Estáticos**: Listas de modelos, roupas, acessórios, tipos de itens e conquistas.
5.  **Sistemas**:
    - **Persistência**: Funções `loadData()` e `saveData()` para salvar progresso no `localStorage`.
    - **Áudio**: Gerenciamento de efeitos sonoros e música (AudioContext).
    - **Input**: Listeners para teclado e toque na tela.
6.  **Loop do Jogo**:
    - `update()`: Atualiza física, posições e lógica de colisão.
    - `draw()`: Renderiza todos os elementos no canvas a cada frame.
    - `gameLoop()`: O loop principal usando `requestAnimationFrame`.
7.  **Lógica de Jogo**: Funções para pular, gerar obstáculos (`spawnObstacle`), detectar colisões e gerenciar power-ups.

---

## 🛠️ Sugestão de Refatoração (Como dividir os arquivos)

Para facilitar a manutenção em projetos maiores, estes arquivos poderiam ser divididos da seguinte forma. **Nota:** Essa abordagem exige o uso de um servidor local (http-server, Live Server) devido a restrições de segurança do navegador (CORS) com módulos ES6.

### JavaScript (Módulos ES6)
Dividir o `script.js` em uma pasta `/src` ou `/js`:
- `js/constants.js`: Todas as constantes (`GRAVITY`, `TARGET_FPS`).
- `js/state.js`: Gerenciamento do estado global (Store pattern).
- `js/entities/`:
  - `Player.js`: Classe Player.
  - `Obstacle.js`: Classe Obstacle.
  - `Item.js`: Classe Item.
- `js/systems/`:
  - `InputHandler.js`: Lógica de teclado/toque.
  - `AudioSystem.js`: Gerenciamento de som.
  - `Storage.js`: Salvar/Carregar dados.
- `js/main.js`: Ponto de entrada que importa os outros módulos e inicia o Game Loop.

**Como implementar:**
No HTML, altere a importação para: `<script type="module" src="js/main.js"></script>`.

### CSS (Pré-processadores ou CSS Modules)
Dividir o `style.css` em uma pasta `/css`:
- `css/base.css`: Reset e variáveis globais.
- `css/layout.css`: Estrutura do menu e containers.
- `css/components/`:
  - `buttons.css`
  - `modals.css`
  - `cards.css`
- `css/game.css`: Estilos específicos do canvas e HUD.
- `css/main.css`: Arquivo que importa todos os outros (`@import`).

### Benefícios da Divisão
- **Manutenibilidade**: Arquivos menores são mais fáceis de ler e editar.
- **Colaboração**: Menos conflitos de merge quando várias pessoas trabalham no projeto.
- **Reutilização**: Classes e estilos podem ser reutilizados em outros projetos.
