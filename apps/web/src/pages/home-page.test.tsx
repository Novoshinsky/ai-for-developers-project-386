import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./home-page";

const { apiGetHealth } = vi.hoisted(() => ({ apiGetHealth: vi.fn() }));

vi.mock("@/lib/api", () => ({ client: { apiGetHealth } }));

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe("HomePage", () => {
  it("рассказывает про сервис", async () => {
    apiGetHealth.mockResolvedValue({ status: 200 });

    renderHomePage();

    expect(
      screen.getByRole("heading", { name: "Календарь звонков" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Сервис бронирования звонков/)).toBeInTheDocument();
    expect(await screen.findByText("API доступен")).toBeInTheDocument();
  });

  it("ведёт на страницу записи", () => {
    apiGetHealth.mockResolvedValue({ status: 200 });

    renderHomePage();

    expect(
      screen.getByRole("link", { name: "Записаться на звонок" }),
    ).toHaveAttribute("href", "/booking");
  });

  it("показывает, что API проверяется", () => {
    apiGetHealth.mockReturnValue(new Promise(() => {}));

    renderHomePage();

    expect(screen.getByText("Проверяем API…")).toBeInTheDocument();
  });

  it("показывает, что API недоступен", async () => {
    apiGetHealth.mockRejectedValue(new Error("network"));

    renderHomePage();

    expect(await screen.findByText("API недоступен")).toBeInTheDocument();
  });

  it("повторяет проверку по кнопке", async () => {
    const user = userEvent.setup();
    apiGetHealth
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValue({ status: 200 });

    renderHomePage();

    expect(await screen.findByText("API недоступен")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Проверить снова" }));

    expect(await screen.findByText("API доступен")).toBeInTheDocument();
    expect(apiGetHealth).toHaveBeenCalledTimes(2);
  });
});
