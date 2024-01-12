import {
  RenderOptions,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: jest.fn().mockImplementation(({ ...rest }) => {
    if (rest["0"] === "popular_movie") {
      return {
        data: {
          page: 1,
          results: [
            {
              adult: false,
              backdrop_path: "/vdpE5pjJVql5aD6pnzRqlFmgxXf.jpg",
              genre_ids: [18, 36],
              id: 906126,
              original_language: "es",
              original_title: "La sociedad de la nieve",
              overview:
                "On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashes into a glacier in the heart of the Andes.",
              popularity: 1435.957,
              poster_path: "/2e853FDVSIso600RqAMunPxiZjq.jpg",
              release_date: "2023-12-13",
              title: "Society of the Snow",
              video: false,
              vote_average: 8.095,
              vote_count: 569,
            },
            {
              adult: false,
              backdrop_path: "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
              genre_ids: [28, 12, 14],
              id: 572802,
              original_language: "en",
              original_title: "Aquaman and the Lost Kingdom",
              overview:
                "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
              popularity: 1112.367,
              poster_path: "/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
              release_date: "2023-12-20",
              title: "Aquaman and the Lost Kingdom",
              video: false,
              vote_average: 6.5,
              vote_count: 452,
            },
            {
              adult: false,
              backdrop_path: "/r9oTasGQofvkQY5vlUXglneF64Z.jpg",
              genre_ids: [28, 35],
              id: 1029575,
              original_language: "en",
              original_title: "The Family Plan",
              overview:
                "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
              popularity: 1112.105,
              poster_path: "/a6syn9qcU4a54Lmi3JoIr1XvhFU.jpg",
              release_date: "2023-12-14",
              title: "The Family Plan",
              video: false,
              vote_average: 7.4,
              vote_count: 673,
            },
          ],
          total_pages: 1,
          total_results: 3,
        },
        isLoading: false,
        isError: false,
      };
    }

    if (rest["0"] === "search_movie") {
      return {
        data: {
          page: 1,
          results: [
            {
              adult: false,
              backdrop_path: "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
              genre_ids: [28, 12, 14],
              id: 572802,
              original_language: "en",
              original_title: "Aquaman and the Lost Kingdom",
              overview:
                "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
              popularity: 1112.367,
              poster_path: "/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
              release_date: "2023-12-20",
              title: "Aquaman and the Lost Kingdom",
              video: false,
              vote_average: 6.5,
              vote_count: 452,
            },
          ],
          total_pages: 1,
          total_results: 1,
        },
        isLoading: false,
        isError: false,
      };
    }

    if (rest["0"] === "genres_movie") {
      return {
        data: {
          page: 1,
          results: {
            genres: [
              {
                id: 28,
                name: "Action",
              },
              {
                id: 12,
                name: "Adventure",
              },
              {
                id: 16,
                name: "Animation",
              },
              {
                id: 35,
                name: "Comedy",
              },
              {
                id: 80,
                name: "Crime",
              },
              {
                id: 99,
                name: "Documentary",
              },
              {
                id: 18,
                name: "Drama",
              },
              {
                id: 10751,
                name: "Family",
              },
              {
                id: 14,
                name: "Fantasy",
              },
              {
                id: 36,
                name: "History",
              },
              {
                id: 27,
                name: "Horror",
              },
              {
                id: 10402,
                name: "Music",
              },
              {
                id: 9648,
                name: "Mystery",
              },
              {
                id: 10749,
                name: "Romance",
              },
              {
                id: 878,
                name: "Science Fiction",
              },
              {
                id: 10770,
                name: "TV Movie",
              },
              {
                id: 53,
                name: "Thriller",
              },
              {
                id: 10752,
                name: "War",
              },
              {
                id: 37,
                name: "Western",
              },
            ],
          },
          total_pages: 1,
          total_results: 2,
        },
        isLoading: false,
        isError: false,
      };
    }

    return {
      data: null,
      isLoading: true,
      isError: false,
    };
  }),
}));

describe("Movies component", () => {
  it("renders with mocked data", async () => {
    render(<App />);

    // Your test assertions go here
    expect(screen.getByText("Society of the Snow")).toBeInTheDocument();
  });

  it("renders with search mocked data", async () => {
    render(<App />);

    // Input element
    const inputElement = screen.getByRole("textbox");

    // Simulate a change in the input data
    fireEvent.change(inputElement, {
      target: { value: "Aquaman and the Lost Kingdom" },
    });

    // Your test assertions go here
    expect(
      screen.getByText("Aquaman and the Lost Kingdom")
    ).toBeInTheDocument();
  });

  it("renders detail with mocked data", async () => {
    render(<App />);
    const element = screen.getByTestId("detail-movie-0");

    // Simulate a change in the input data
    fireEvent.click(element);

    // Your test assertions go here
    waitFor(() => {
      expect(screen.getByText("Overview")).toBeInTheDocument();
    });
  });
});
