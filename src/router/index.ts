import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Movies from "../views/Movies/Movies.vue";
import NowPlaying from "../views/Movies/NowPlaying.vue";
import Popular from "../views/Movies/Popular.vue";
import TopRated from "../views/Movies/TopRated.vue";
import Upcoming from "../views/Movies/Upcoming.vue";
import MovieDetails from "../views/Movies/MovieDetails.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/movies",
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
  {
    path: "/movies/now-playing",
    name: "NowPlaying",
    component: NowPlaying,
  },
  {
    path: "/movies/popular",
    name: "Popular",
    component: Popular,
  },
  {
    path: "/movies/top-rated",
    name: "TopRated",
    component: TopRated,
  },
  {
    path: "/movies/upcoming",
    name: "Upcoming",
    component: Upcoming,
  },
  {
    path: "/movies/:id",
    name: "MovieDetails",
    component: MovieDetails,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
