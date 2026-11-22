import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

const { apiGetHealth } = vi.hoisted(() => ({ apiGetHealth: vi.fn() }));

vi.mock("@/lib/api", () => ({ client: { apiGetHealth } }));

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  it("открывает главную страницу", () => {
    apiGetHealth.mockResolvedValue({ status: 200 });

    renderApp();

    expect(
      screen.getByRole("heading", { name: "Календарь звонков" }),
    ).toBeInTheDocument();
  });

  it("переходит на страницу записи и возвращается обратно", async () => {
    const user = userEvent.setup();
    apiGetHealth.mockResolvedValue({ status: 200 });

    renderApp();

    await user.click(
      screen.getByRole("link", { name: "Записаться на звонок" }),
    );

    expect(
      screen.getByRole("heading", { name: "Запись на звонок" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", { name: "Вернуться на главную" }),
    );

    expect(
      screen.getByRole("heading", { name: "Календарь звонков" }),
    ).toBeInTheDocument();
  });

  it("неизвестный адрес возвращает на главную", () => {
    apiGetHealth.mockResolvedValue({ status: 200 });

    renderApp("/unknown");

    expect(
      screen.getByRole("heading", { name: "Календарь звонков" }),
    ).toBeInTheDocument();
  });
});
