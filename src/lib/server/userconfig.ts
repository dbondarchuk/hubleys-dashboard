import { isFile, readFile, writeFile } from '$lib/server/fs'

const default_config: UserConfig = {
  version: 0,
  theme: 'system',
  language: null,
  weather: {
    lon: null,
    lat: null,
    zip_code: null,
    country_code: null,
    mode: 'zip',
    show: true
  },
  clock: { show: true },
  calendar: { show: true },
  searchbar: { show: true },
  dashboard: { show_settings_text: true },
  backgrounds: [
    {
      static_image: { source: 'upload', web_url: '', upload_url: '' },
      random_image: { provider: 'unsplash', unsplash_query: '', subreddits: '', duration: 0 },
      background: 'triangles',
      blur: 'dark',
      dots: true,
      particles: false,
      selected: true
    }
  ]
}

type UserId = string

let _cache: Record<UserId, UserConfig> = {}

function userConfigFilePath(userid: UserId) {
  const encUserid = encodeURIComponent(userid)
  return '/data/users/config/' + encUserid + '.json'
}

async function readUserConfig(userid: UserId) {
  const filepath = userConfigFilePath(userid)
  if (await isFile(filepath)) {
    return JSON.parse(await readFile(filepath))
  } else {
    return default_config
  }
}

async function writeUserConfig(userid: UserId, config: UserConfig) {
  const filepath = userConfigFilePath(userid)
  await writeFile(filepath, JSON.stringify(config))
}

export async function getUserConfig(userid: UserId) {
  if (!_cache[userid]) _cache[userid] = await readUserConfig(userid)
  return _cache[userid]
}

export async function setUserConfig(userid: UserId, config: UserConfig) {
  _cache[userid] = config
  await writeUserConfig(userid, config)
}

export async function reloadAllUsersConfig() {
  _cache = {}
}

export async function reloadUserConfig(userid: UserId) {
  _cache[userid] = await readUserConfig(userid)
}

export function userBackgroundImgFilePath(userid: UserId, imgId: string) {
  return '/data/users/backgrounds/' + encodeURIComponent(userid + '-' + imgId)
}
