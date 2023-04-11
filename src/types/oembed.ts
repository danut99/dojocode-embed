/**
 * Object Embed Response.
 */
export interface OEmbedResponse  {
  /**
   * A boolean indicating whether the oEmbed request was successful.
   */
  success: boolean
  /**
   * The title of the challenge.
   */
  title: string
  /**
   * The name of the author of the challenge.
   */
  author_name: string
  /**
   * The type of the oEmbed response.
   */
  type: string
  /**
   * The HTML content of the oEmbed response.
   */
  html: string
  /**
   * The width of the iframe.
   */
  width: number
  /**
   * The height of the iframe.
   */
  height: number
};