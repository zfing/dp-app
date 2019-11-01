import RNFetchBlob from 'rn-fetch-blob'
// import { NativeModules } from 'react-native'
// const RNFetchBlob = NativeModules.RNFetchBlob

const actionViewIntent = RNFetchBlob.android.actionViewIntent
const DownloadDir = RNFetchBlob.fs.dirs.DownloadDir

export interface InstallOptions {
  title?: string,
  description?: string,
  url: string,
}

export const install = (options: InstallOptions) => new Promise((resolve, reject) => {
  const config = {
    addAndroidDownloads: {
      useDownloadManager: true, // 调起原生下载管理
      title: options.title,
      description: options.description,
      mime: 'application/vnd.android.package-archive',
      mediaScannable: true,
      notification: true,
      path: DownloadDir + '/' + options.url.substr(options.url.lastIndexOf('-')),
    }
  }

  RNFetchBlob
    .config(config)
    .fetch('GET', options.url)
    .then(res => {
      actionViewIntent(res.path(), 'application/vnd.android.package-archive')
      resolve()
    })
    .catch(err => { reject(err) })
})
