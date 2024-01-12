import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import moment from "moment";
import PopoverText from "./components/PopoverText";
import {
  MovieDetail,
  useGenresMovies,
  usePopularMovies,
  useSearchMovies,
} from "./api/query";

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
interface TABLEHEADTYPE {
  title: string;
  className: string;
}
const TABLE_HEAD: TABLEHEADTYPE[] = [
  { title: "No", className: "w-[60px]" },
  { title: "Movie Name", className: "w-[240px]" },
  { title: "Release Date", className: "w-[160px]" },
  { title: "Genre", className: "w-[240px]" },
  { title: "Popularity", className: "w-[120px]" },
  { title: "Vote Count", className: "w-[120px]" },
  { title: "Vote Average", className: "w-[120px]" },
  { title: "Action", className: "w-[60px]" },
];

function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [dataDialog, setDataDialog] = useState<MovieDetail | undefined>();

  const handleOpen = (data: MovieDetail) => {
    setOpen(true);
    setDataDialog(data);
  };
  const handleClose = () => {
    setOpen(false);
    setDataDialog(undefined);
  };
  const {
    data: trendingData,
    isFetching: isFetchingTrending,
    // isError: errorTrending,
  } = usePopularMovies(search, page);

  const {
    data: searchData,
    isFetching: isFetchingSearch,
    // isError: errorSearch,
  } = useSearchMovies(search, page);

  const {
    data: genreData,
    isFetching: isFetchingGenre,
    // isError: errorGenre,
  } = useGenresMovies();

  const isLoading = isFetchingSearch || isFetchingTrending || isFetchingGenre;
  const datas: MovieDetail[] | undefined = useMemo(
    () => (search ? searchData?.results ?? [] : trendingData?.results ?? []),
    [search, searchData, trendingData]
  );

  const totalPage = useMemo(
    () => trendingData?.total_pages ?? searchData?.total_pages,
    [trendingData, searchData]
  );

  const handleSearch = debounce((tempSearch: string) => {
    setSearch(tempSearch);
    setPage(1);
  }, 500);

  const next = () => {
    if (page === totalPage) return;
    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <div className={`flex flex-col gap-4 w-full my-4 relative`}>
      {isLoading ? (
        <div className="absolute backdrop-blur-lg w-full h-full">
          <Spinner className="absolute top-1/2 left-1/2 h-16 w-16 text-gray-900/50" />
        </div>
      ) : null}
      <p className="text-2xl text-teal-400 text-center">Movie DB API</p>
      <div className="flex px-4 justify-start">
        <div className="w-72">
          <Input
            type="text"
            crossOrigin={undefined}
            variant="outlined"
            label="Search"
            placeholder={"Search"}
            className="px-2 py-1"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-auto px-4">
        <table className="w-full min-w-max table-fixed text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => {
                const headClass = head.className ? ` ${head.className}` : "";
                return (
                  <th
                    key={head.title}
                    className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4${headClass}`}
                  >
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head.title}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {datas.map((dataMovie, index) => {
              const {
                title,
                release_date,
                genre_ids,
                popularity,
                vote_count,
                vote_average,
                id,
              } = dataMovie;
              const isLast = index === datas.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              const genre = (genreData?.genres ?? [])
                .filter((item) => (genre_ids || []).includes(item.id))
                .reduce(
                  (prev, current, index) =>
                    prev + `${index !== 0 ? ", " : ""}${current.name}`,
                  ""
                );

              const releaseDate = release_date
                ? moment(release_date).format("DD MMM YYYY")
                : "";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {(page - 1) * 20 + index + 1}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <PopoverText text={title}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal truncate"
                      >
                        {title}
                      </Typography>
                    </PopoverText>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {releaseDate}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <PopoverText text={genre}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal truncate"
                      >
                        {genre}
                      </Typography>
                    </PopoverText>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {popularity}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vote_count}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vote_average}
                    </Typography>
                  </td>
                  <td
                    className={`${classes} bg-blue-gray-50/50 flex justify-center`}
                  >
                    <div
                      data-testid={`detail-movie-${index}`}
                      onClick={() => handleOpen(dataMovie)}
                    >
                      <Bars3Icon strokeWidth={2} className="h-4 w-4" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end px-4">
        <div className="flex items-center gap-8">
          <IconButton
            placeholder={""}
            size="sm"
            variant="outlined"
            onClick={prev}
            disabled={page === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography placeholder={""} color="gray" className="font-normal">
            Page <strong className="text-gray-900">{page}</strong> of{" "}
            <strong className="text-gray-900">{totalPage}</strong>
          </Typography>
          <IconButton
            placeholder={""}
            size="sm"
            variant="outlined"
            onClick={next}
            disabled={page === 10}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
      <Dialog
        placeholder={""}
        open={open && !!dataDialog}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader
          placeholder={""}
        >{`Overview ${dataDialog?.title}`}</DialogHeader>
        <DialogBody
          className="z-[999] flex flex-col justify-center align-middle pt-4 px-8 pb-8"
          placeholder={""}
        >
          <div className="flex justify-center w-full py-4">
            <img
              src={`https://image.tmdb.org/t/p/original${dataDialog?.poster_path}`}
              alt={`${dataDialog?.title}~poster`}
              className="h-full !max-w-[240px] rounded-lg object-cover"
            />
          </div>
          <Typography
            placeholder={""}
            variant="small"
            color="gray"
            className="font-normal text-blue-gray-500 text-center"
          >
            {dataDialog?.overview}
          </Typography>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default App;
