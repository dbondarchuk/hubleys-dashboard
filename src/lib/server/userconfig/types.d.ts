export interface BackgroundConfig {
  static_image: {
    source: 'upload' | 'web'
    upload_url: string
    web_url: string
    upload_img?: FileList
  }
  random_image: {
    provider: 'unsplash' | 'reddit'
    unsplash_query: ''
    subreddits: ''
    duration: 0
  }
  background: 'triangles' | 'static' | 'random'
  blur: false | 'dark' | 'light'
  dots: boolean
  particles: false | ParticleName
  selected: boolean
}

export interface UserConfig {
  version: number
  theme: 'system' | 'light' | 'dark'
  language: string | null
  weather: {
    zip_code: string | null
    country_code: string | null
    lon: number | null
    lat: number | null
    mode: 'zip' | 'lonlat'
    show: boolean
  }
  clock: { show: boolean }
  calendar: { show: boolean }
  searchbar: { show: boolean }
  dashboard: { show_settings_text: boolean }
  tiles: { layout: 'center' | 'wide'; position: 'top' | 'bottom' }
  backgrounds: BackgroundConfig[]
}
