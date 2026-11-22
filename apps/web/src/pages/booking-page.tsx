import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { PageCard } from "@/components/page-card";

export default function BookingPage() {
  return (
    <PageCard description="Страница записи" title="Запись на звонок">
      <p className="text-sm text-muted-foreground">
        Сценарий бронирования появится на следующем шаге.
      </p>
      <Button asChild variant="outline">
        <Link to="/">Вернуться на главную</Link>
      </Button>
    </PageCard>
  );
}
