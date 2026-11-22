import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PageCard } from "@/components/page-card";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/api";

type HealthState = "loading" | "ok" | "error";

const healthLabel: Record<HealthState, string> = {
  loading: "Проверяем API…",
  ok: "API доступен",
  error: "API недоступен",
};

const healthDot: Record<HealthState, string> = {
  loading: "size-2 animate-pulse rounded-full bg-muted-foreground",
  ok: "size-2 rounded-full bg-emerald-500",
  error: "size-2 rounded-full bg-destructive",
};

export default function HomePage() {
  const [health, setHealth] = useState<HealthState>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    client
      .apiGetHealth()
      .then((response) => {
        if (active) {
          setHealth(response.status === 200 ? "ok" : "error");
        }
      })
      .catch(() => {
        if (active) {
          setHealth("error");
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  return (
    <PageCard description="Учебный проект Хекслета" title="Календарь звонков">
      <p className="text-sm text-muted-foreground">
        Сервис бронирования звонков: гость выбирает тип встречи и слот и создаёт
        бронирование.
      </p>
      <Button asChild>
        <Link to="/booking">Записаться на звонок</Link>
      </Button>
      <div className="flex items-center justify-between gap-2 border-t pt-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className={healthDot[health]} aria-hidden="true" />
          {healthLabel[health]}
        </span>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            setHealth("loading");
            setAttempt((value) => value + 1);
          }}
        >
          Проверить снова
        </Button>
      </div>
    </PageCard>
  );
}
