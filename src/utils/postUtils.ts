import { Post } from '../model/types'
import { PostWithAuthor } from '../controller/types'

/**
 * Returns Posts which have to be on given pageNumber
 * Calculated by retreiving the numer of posts, which should be displayed on one page and the pageNumber
 *
 * @param posts All Posts: Post which are on given pageNumber are returned
 * @param pageNumber PageNumber for which posts should be returned
 */
export const getPostsForGivenPage = (posts: PostWithAuthor[], pageNumber: number) => {
  if (!process.env.ALL_POSTS_ARTICLES_PER_PAGE)
    throw new Error('EnvironmentVariable ALL_POSTS_ARTICLES_PER_PAGE was not set')
  const postsPerPage = Number(process.env.ALL_POSTS_ARTICLES_PER_PAGE)

  //Index of first post (inclusive)
  const firstPost = postsPerPage * pageNumber - postsPerPage
  //Index of last post (exclusive)
  const lastPost = postsPerPage * pageNumber

  return posts.slice(firstPost, lastPost)
}

/**
 * Calculates the amount of pages for given post array
 * Uses the ALL_POSTS_ARTICLES_PER_PAGE env variable to know how much posts should be on a page
 *
 * @param posts Post Array for which PageCount is calculated
 */
export const getPageCount = (posts: PostWithAuthor[]) => {
  if (!process.env.ALL_POSTS_ARTICLES_PER_PAGE)
    throw new Error('EnvironmentVariable ALL_POSTS_ARTICLES_PER_PAGE was not set')
  const postsPerPage = Number(process.env.ALL_POSTS_ARTICLES_PER_PAGE)
  return Math.ceil(posts.length / postsPerPage)
}
