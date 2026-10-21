# Plano do site — Real Estamento Militar del Principado de Gerona

## Base técnica
- **Astro** (site estático) → alojamento **Vercel**. Pasta `website/`. Só frontend; sem SEO/meta/backend por agora.
- Conteúdo em `website/src/data/*.json`, extraído do site atual **palavra por palavra** e verificado automaticamente nos dois sentidos (nenhum texto alterado, nenhum parágrafo em falta): `node website/scripts/verificacion/check-verbatim.cjs corpus.txt ../../src/data`.
- Panfletos para descarga: `website/public/descargas/panfletos/` · imagens mostradas (felicitações, capas): `website/src/assets/actividades/` · logótipos: `website/src/assets/marca/` · fotos: `website/src/assets/fotos/` (ver `FOTOS.md`).
- Identidade (`Estamento de gerona - Visual IDT`): Libre Caslon Display/Text + Geist/Geist Mono; pergamino #F3EDE2, piedra #E3D8C5, negro #1A1714, rojo #A3201F, teja #B4501F (só botões), plata #C9C3B8, tinta-2 #5C534A; raio 0; sem sombras/degradados; retícula 12 col, máx. 1240 px; margens 24/48/72; espaço entre secções 96/64; texto corrido ≤ 68 caracteres; filete (banda negra com linha vermelha) no cabeçalho e rodapé; numeração romana nas secções; datas em Geist Mono; capitular só no 1.º parágrafo dos textos históricos longos.

## Navegação
`Historia ▾ (La Corporación · La Cofradía de San Jorge)` · `Actividades` · `Consejo` · `Enlaces` · `Contacto`
Rodapé: logótipo, email, enlaces, Aviso legal, Política de privacidad, "Página Web del Real Estamento… · Abril del 2026."

## Páginas

### Home — narrativa em capítulos (I, II, III…)
| # | Secção | Conteúdo (tudo vem dos textos existentes) | Referência Framer |
|---|---|---|---|
| — | Portada | Foto `hero` a toda a largura + logótipo horizontal + «saludable y provechosa» + 28 de agosto de 1386 | Faseelh / Faith (foto serena, pouco texto) |
| I | Origen | Fundação pelo Infante Don Juan, 1386 — parágrafo-manifesto grande com mini-imagens inline → *La Corporación* | Faseelh (statement com imagens inline) |
| II | Los distintivos | Venera (cruz de San Jorge com 4 espadas) e banda negra fileteada de rojo — origem da própria marca | Mychurch (título à esquerda, pontos à direita) |
| III | Lo que hacemos | Caridade e beneficência da Diocese · estudos históricos e publicações · conferências · atos musicais · Capilla de San Jorge | Faith (cartões de "sacramentos", sem ícones genéricos) |
| IV | Actividades | As 3 mais recentes, em linhas de "anales" → todas as atividades | Faseelh (lista de awards) / LocalUnity (bloco de data) |
| V | Felicitaciones de Navidad | Faixa horizontal 2025 → 2016 | — |
| VI | La Cofradía | Torneios e justas (1588–1640), Jueves Santo (desde 1643) → *La Cofradía* | Faith (título sticky + lista) |
| VII | Consejo | Presidência de honra separada + "nómina" uniforme em 3 colunas + capelães | LocalUnity (lista tabelar limpa) |

### Historia · La Corporación (compacta) → "Leer el texto íntegro" (ES) + "Llegir en català"
Cronologia (1386 · Carlos II · séc. XVI–XVII · Alfonso XIII · hoje) · Distintivos e uniformidade · Sede (Catedral / Iglesia de los Dolores) · Obras e actividad.

### Historia · La Cofradía de San Jorge (compacta) → texto íntegro (ES) + catalão
Os livros de atas (1588–1709, períodos em branco) · Las ordinacions (1631, 1643 com as 6 regras, 1667) · Os cofrades (militares / ciudadanos / nobles) · Ciudadanos Honrados · **Registro de privilegios de generosidad** (1486 · 1493 · 1503 · 1511, por localidade).

### Texto íntegro (4 páginas: 2 textos × ES/CA)
Texto exato, fundo pergamino (experiência com textura), capitular vermelha, capítulos em numeração romana, 68 caracteres por linha, assinatura no fim.

### Actividades — "anales"
Agrupadas por ano (2026 → 2016), filtros: Música · Conferencias y exposiciones · Publicaciones · Navidad. Linhas tipográficas (data em Geist Mono, título em Caslon), sem panfletos como imagem.
**Detalhe** (`/actividades/<id>`): título, data, texto existente, transcrição literal do panfleto (após a tua verificação), botão **"Descargar panfleto"**; felicitações e capas mostradas como imagem.

### Enlaces · Contacto · Aviso legal · Política de privacidad
Texto atual, organizado. Enlaces nos 4 grupos existentes.

## Línguas
Só o que existe hoje: tudo em castelhano + versões catalãs dos 2 textos de história.

## Ficheiros de apoio
- `REVISAO.md` — contradições e gralhas para o cliente (nada corrigido).
- `FOTOS.md` — fotografias a arranjar.
- `verificacao-transcricoes.html` — panfletos vs transcrições, para validares.
