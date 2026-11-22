import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PageCardProps = {
  description: string;
  title: string;
  children: ReactNode;
};

export function PageCard({ description, title, children }: PageCardProps) {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
          <CardTitle className="text-3xl">
            <h1>{title}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </main>
  );
}
