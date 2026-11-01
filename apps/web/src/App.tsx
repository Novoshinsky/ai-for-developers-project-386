import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/api";

type HealthState = "loading" | "ok" | "error";

export default function App() {
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
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>Учебный проект Хекслета</CardDescription>
          <CardTitle className="text-3xl">Календарь звонков</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Каркас приложения готов. Сценарий бронирования появится на следующем
            шаге.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={
                health === "ok"
                  ? "size-2 rounded-full bg-emerald-500"
                  : health === "error"
                    ? "size-2 rounded-full bg-destructive"
                    : "size-2 animate-pulse rounded-full bg-muted-foreground"
              }
            />
            <span>
              {health === "ok"
                ? "API доступен"
                : health === "error"
                  ? "API недоступен"
                  : "Проверяем API…"}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setHealth("loading");
              setAttempt((value) => value + 1);
            }}
          >
            Проверить снова
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
