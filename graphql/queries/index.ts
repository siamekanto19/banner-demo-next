import { graphql } from '../generated'

export const BANNER = graphql(`
  query Banner {
    banner {
      name
      contents {
        id
        name
        sub_heading
        heading
        background_image {
          alternativeText
          url
        }
        cta_button {
          title
          id
          href
        }
      }
    }
  }
`)
