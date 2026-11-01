# AGENTS.md

## Проект

«Календарь звонков» — учебный сервис бронирования. UI-тексты и документация на
русском. Сейчас реализован каркас; сценарий бронирования идёт следующим шагом.

## Команды

- `mise install` — поставить Node.js, hk и pitchfork из `mise.toml`.
- `mise run install` — установить npm-зависимости (`npm ci`).
- `mise run dev` — поднять API (3001) и веб (5173) через daemons.
- `mise run check` — контракт, ESLint, Prettier, типы и тесты. Эту же команду
  запускает CI.
- `mise run lint`, `mise run typecheck`, `mise run test`, `mise run build` —
  отдельные проверки и сборка.
- `mise run api:generate` — пересобрать OpenAPI и сгенерировать сервер и SDK.
- `mise daemons status`, `mise daemons logs`, `mise run dev:stop` — управление
  dev-серверами.
- `hk check --all` — прогнать Git-хуки по всему репозиторию.

## Устройство

- `packages/spec` — TypeSpec-контракт и сгенерированный OpenAPI.
- `apps/api` — Express 5, сгенерированный роутер, smoke-тест.
- `apps/web` — React 19, Vite 8, shadcn/ui, сгенерированный fetch-SDK.
- `apps/*/src/generated` — сгенерированный код, вручную не редактируется.
- `mise.toml` — версии инструментов, задачи, daemons.

## Правила

- Сообщения коммитов — Conventional Commits (`feat:`, `fix:`, `chore:` и т.д.).
- Не изменять `.github/workflows/hexlet-check.yml` и не переименовывать
  репозиторий.
- Не редактировать сгенерированные файлы; менять контракт и запускать
  `mise run api:generate`.
- Версии инструментов менять только через `mise.toml`.

## Agent skills

### Issue tracker

Issues и спеки живут в GitHub Issues этого репозитория. См.
`docs/agents/issue-tracker.md`.

### Triage labels

Пять канонических ролей: `needs-triage`, `needs-info`, `ready-for-agent`,
`ready-for-human`, `wontfix`. См. `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` в корне и ADR в `docs/adr/`. См.
`docs/agents/domain.md`.
