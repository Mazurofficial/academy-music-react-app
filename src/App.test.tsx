import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { App } from "./App"

// Можеш замокати компоненти сторінок, якщо AppRoutes використовує Lazy або великі сторінки
vi.mock("./AppRoutes", () => ({
  default: () => <div>Mocked Routes</div>,
}))

describe("App", () => {
  it("renders AppRoutes", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText("Mocked Routes")).toBeInTheDocument()
  })
})
