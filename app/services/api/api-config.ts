// import { API_URL } from 'react-native-dotenv'

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  // url: API_URL || 'http://172.16.34.43:8091',
  // url: 'http://47.90.98.235:8088',
  // url: 'http://172.16.34.43:8091',
  url: 'http://47.90.98.235:8094',
  timeout: 10000
}
