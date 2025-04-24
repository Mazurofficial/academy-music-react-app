import { screen } from "@testing-library/dom"
import TrackList from "./TrackList"
import { renderWithProviders } from "../../utils/test-utils"

describe("TrackList", () => {
  it("renders H1 Title", () => {
    renderWithProviders(<TrackList />)
    expect(screen.getByTestId("tracks-header")).toBeInTheDocument()
  })
})
