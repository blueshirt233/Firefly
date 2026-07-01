// ==================================================================
// ShuoShuo Config - Global settings for the moments/shoushuo feature
// Modify these values to control: posts per page, max grid images, tags
// ==================================================================
import type { ShuoShuoConfig } from "@/types/shuoshuoConfig"

export const shuoshuoConfig: ShuoShuoConfig = {
  enable: true,
  postsPerPage: 10,
  maxGridImages: 9,
  showTags: true,
}