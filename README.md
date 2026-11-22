# Календарь звонков

[![hexlet-check](https://github.com/Novoshinsky/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Novoshinsky/ai-for-developers-project-386/actions)
[![ci](https://github.com/Novoshinsky/ai-for-developers-project-386/actions/workflows/ci.yml/badge.svg)](https://github.com/Novoshinsky/ai-for-developers-project-386/actions/workflows/ci.yml)

Сервис бронирования звонков по мотивам Cal.com. Учебный проект Хекслета:
https://ru.hexlet.io/programs/ai-for-developers

Сейчас в репозитории готов каркас: TypeSpec-контракт, сгенерированные OpenAPI и
клиентский SDK, Express-сервер с проверкой здоровья, React-интерфейс с главной
страницей и заглушкой страницы записи, а также единая команда проверок для
локальной машины и CI. Сценарий бронирования появится на следующих шагах.

## Стек

- Node.js 26 LTS, npm workspaces
- TypeSpec 1.17 → OpenAPI 3
- `@nahkies/openapi-code-generator`: Express-роутер и fetch-SDK
- Express 5, zod 4
- React 19, Vite 8, shadcn/ui, Tailwind CSS 4
- Vitest 5, supertest 7
- mise, hk, pitchfork

## Установка

Нужен [mise](https://mise.jdx.dev/). На Windows:

```bash
winget install jdx.mise
```

Клонирование и подготовка окружения:

```bash
git clone https://github.com/Novoshinsky/ai-for-developers-project-386.git
cd ai-for-developers-project-386
mise install
mise run install
```

Версии Node.js, hk и pitchfork зафиксированы в `mise.toml`, зависимости — в
`package-lock.json`.

## Запуск

```bash
mise run dev
```

- веб-интерфейс: http://localhost:5173
- API: http://localhost:3001/api/health

Dev-серверы работают через daemons mise отдельно от терминала:

```bash
mise daemons status
mise daemons logs
mise run dev:stop
```

## Проверки

Одна команда запускает контракт, линтер, проверку типов и тесты:

```bash
mise run check
```

Отдельные задачи:

```bash
mise run lint       # ESLint + Prettier
mise run typecheck  # tsc --noEmit
mise run test       # Vitest
mise run build      # сборка API и веба
```

Git-хуки настраиваются через `hk` и вызывают те же проверки. Формат сообщений
коммитов — [Conventional Commits](https://www.conventionalcommits.org/).

## Контракт и генерация

```text
packages/spec/main.tsp → packages/spec/openapi/openapi.yaml
                       → apps/api/src/generated
                       → apps/web/src/generated
```

Пересобрать контракт и сгенерировать код:

```bash
mise run api:generate
```

Сгенерированные файлы не редактируются вручную.

## Структура

```text
packages/spec   TypeSpec-контракт и OpenAPI
apps/api        Express-сервер и smoke-тест
apps/web        React/Vite-интерфейс, тесты и сгенерированный SDK
GLOSSARY.md     словарь предметной области
docs/adr        принятые решения
mise.toml       версии инструментов и задачи
hk.pkl          Git-хуки
```

## CI

`.github/workflows/ci.yml` на каждый push и pull request запускает:

```bash
mise run install
mise run check
mise run build
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл
`.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его,
ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы
обучения с практикой, поддержкой наставников и реальными проектами, которые
остаются в резюме. Этот репозиторий — один из таких проектов.
