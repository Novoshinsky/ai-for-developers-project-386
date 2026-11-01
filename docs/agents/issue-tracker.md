# Issue tracker: GitHub

Issues и спеки для этого репозитория живут в GitHub Issues. Для всех операций используй `gh` CLI.

## Соглашения

- **Создать issue**: `gh issue create --title "..." --body "..."`. Многострочное тело — через heredoc.
- **Прочитать issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **Список issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` с нужными фильтрами `--label` и `--state`.
- **Сделать issue подзадачей**: `gh issue create --parent <parent> ...` или позже `gh issue edit <parent> --add-sub-issue <child>` (`gh` 2.94+). Для старых версий: `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`. Без sub-issues добавь `Part of #<parent>` в начало тела.
- **Блокировки**: нативные зависимости GitHub. `gh issue create --blocked-by <n>,<n> ...` или `gh issue edit <child> --add-blocked-by <blocker>` (`gh` 2.94+). Резервный вариант — строка `Blocked by: #<n>, #<n>` в начале тела. Тикет разблокирован, когда все блокеры закрыты.
- **Сколько открытых блокеров**: `gh api repos/<owner>/<repo>/issues/<n> --jq .issue_dependencies_summary.blocked_by` (0 — можно начинать). `gh issue view <n> --json blockedBy` включает и закрытые, поэтому фильтруй: `--jq '[.blockedBy.nodes[] | select(.state == "OPEN")] | length'`.
- **Комментарий**: `gh issue comment <number> --body "..."`.
- **Метки**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Закрыть**: сначала `gh issue comment <number> --body "..."`, затем `gh issue close <number>`.

Репозиторий определяется из `git remote -v`; `gh` делает это автоматически внутри клона.

Заводи issue только в репозитории пользователя. Никогда не заводи их в `mattpocock/skills` (репозиторий, откуда пришли скиллы), если он тебе не принадлежит. В форке `gh` может по умолчанию выбрать upstream-родителя, поэтому перед первым `gh issue create` проверь цель через `gh repo view --json nameWithOwner` и подтверди её у пользователя, если это не его репозиторий.

## Pull requests как поверхность triage

**PRs as a request surface: no.** _(Поставь `yes`, если внешние PR считаются запросами на фичу; `/triage` читает этот флаг.)_

При `yes` PR проходят те же метки и состояния, что и issues, через команды `gh pr`:

- **Прочитать PR**: `gh pr view <number>`, затем `gh pr view <number> --comments`; дифф — `gh pr diff <number>`.
- **Список внешних PR**: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.
- **Комментарий / метка / закрытие**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub использует общее пространство номеров для issues и PR, поэтому `#42` может быть и тем и другим: проверяй через `gh pr view 42`, затем `gh issue view 42`.

## Когда скилл говорит «опубликовать в issue tracker»

Создай GitHub issue.

## Когда скилл говорит «получить нужный тикет»

Прочитай его, как описано в **Прочитать issue**.

## Операции wayfinder

Карта — это один issue, дочерние тикеты — его sub-issues.

- **Карта**: issue с меткой `wayfinder:map`, в теле — Notes / Decisions-so-far / Fog. `gh issue create --label wayfinder:map`.
- **Дочерний тикет**: GitHub sub-issue карты. Где sub-issues недоступны — task list в теле карты и `Part of #<map>` в начале тела. Метки: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). После взятия тикет назначается на dev.
- **Блокировки**: см. **Блокировки** выше.
- **Поиск фронтира**: открытые дочерние issues карты без открытых блокеров и без assignee; первый по порядку карты побеждает.
- **Взять в работу**: `gh issue edit <n> --add-assignee @me` — первая запись сессии.
- **Закрыть**: `gh issue comment <n> --body "<answer>"`, затем `gh issue close <n>`, затем добавь указатель на контекст в Decisions-so-far карты.
