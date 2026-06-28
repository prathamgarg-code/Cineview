import { observer } from 'mobx-react-lite'
import { SectionErrorBoundary, StatusBlock } from '../../../Common'
import { MovieCard } from '../../../Movies/ui/components/MovieCard'
import { PersonCard } from '../components/PersonCard'
import { RecentSearches } from '../components/RecentSearches'
import { SearchResultGroup } from '../components/SearchResultGroup'
import { TVCard } from '../components/TVCard'
import { useSearchController } from '../controllers/useSearchController'

export const SearchPage = observer(() => {
  const {
    inputValue,
    setInputValue,
    searchStatus,
    movies,
    tvShows,
    people,
    recentSearches,
    searchFromRecent,
  } = useSearchController()

  const hasResults = movies.length > 0 || tvShows.length > 0 || people.length > 0
  const isEmptySearch =
    searchStatus === 'success' && inputValue.trim() !== '' && !hasResults

  return (
    <main className="py-6">
      <div className="px-4">
        <h1 className="mb-4 text-2xl font-semibold">Search</h1>
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies, TV shows, people…"
          className="w-full max-w-xl rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
      </div>

      <RecentSearches items={recentSearches} onSelect={searchFromRecent} />

      <SectionErrorBoundary title="Search results failed to load.">
        <StatusBlock
          status={searchStatus}
          isEmpty={isEmptySearch}
          emptyMessage="No results found for your search."
        >
          <SearchResultGroup title="Movies" isEmpty={movies.length === 0}>
            {movies.map((item) => (
              <MovieCard
                key={item.id}
                movie={{
                  id: item.id,
                  title: item.title ?? 'Unknown',
                  poster_path: item.poster_path ?? null,
                  backdrop_path: null,
                  vote_average: item.vote_average ?? 0,
                  overview: '',
                  release_date: '',
                }}
              />
            ))}
          </SearchResultGroup>

          <SearchResultGroup title="TV Shows" isEmpty={tvShows.length === 0}>
            {tvShows.map((item) => (
              <TVCard key={item.id} item={item} />
            ))}
          </SearchResultGroup>

          <SearchResultGroup title="People" isEmpty={people.length === 0}>
            {people.map((item) => (
              <PersonCard key={item.id} item={item} />
            ))}
          </SearchResultGroup>
        </StatusBlock>
      </SectionErrorBoundary>
    </main>
  )
})