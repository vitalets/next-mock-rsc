import { test, expect } from '@playwright/test'

test('mock RSC', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('link').click();

  const greeting = page.locator('#server-side-greeting')
  await expect(greeting).toHaveText('Hello, Fake!')
})

test('receives mocked responses in loaders', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const greeting = page.locator('#server-side-greeting')
  await expect(greeting).toHaveText('Hello, Sarah!')
})

test('receives mocked responses on browser runtime', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const fetchMoviesButton = page.locator('#fetch-movies-button')
  await fetchMoviesButton.click()
  await page.waitForLoadState('networkidle')

  const moviesList = page.locator('#movies-list')
  await moviesList.waitFor()
  const movieItems = await moviesList.locator('li').allTextContents()

  expect(movieItems).toEqual([
    'Lord of The Rings',
    'The Matrix',
    'Star Wars: The Empire Strikes Back',
  ])
})
