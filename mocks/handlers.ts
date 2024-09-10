import { http, graphql, HttpResponse, bypass } from 'msw'
import type { User } from '@/app/page'
import type { Movie } from '@/app/movie-list'

const handler = graphql.query<{ movies: Array<Movie> }>('ListMovies', () => {
  return HttpResponse.json({
    data: {
      movies: [
        {
          id: '6c6dba95-e027-4fe2-acab-e8c155a7f0ff',
          title: 'Lord of The Rings',
        },
        {
          id: 'a2ae7712-75a7-47bb-82a9-8ed668e00fe3',
          title: 'The Matrix',
        },
        {
          id: '916fa462-3903-4656-9e76-3f182b37c56f',
          title: 'Star Wars: The Empire Strikes Back',
        },
      ],
    },
  })
})

Object.defineProperty(handler, 'ID', {
  value: Math.random().toString(16).slice(2),
  enumerable: true,
  writable: false,
})

export const handlers = [
  // http.get<never, never, User>('https://api.example.com/user', () => {
  //   return HttpResponse.json({
  //     firstName: 'Sarah',
  //     lastName: 'Maverick',
  //   })
  // }),
  http.get('/user', async ({ request }) => {
    const response = await fetch(bypass(request));
    const { status, statusText, headers } = response;
    const text = await response.text();
    const lines = text.split('\n');
  
    // here goes RSC patching... 
    lines[lines.length - 2] = lines[lines.length - 2].replace('Real', 'Fake');

    const newText = lines.join('\n');
    return new HttpResponse(newText, { status, statusText, headers });
  }),
  handler,
]
