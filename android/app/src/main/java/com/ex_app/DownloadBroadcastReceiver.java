package com.ex_app;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.widget.Toast;

import java.io.File;

import androidx.core.content.FileProvider;

public class DownloadBroadcastReceiver extends BroadcastReceiver {
    public void installApp(Context context) {
        File file = new File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), DownloadApkModule.description);

        if (file.exists()) {
            Intent intent = new Intent(Intent.ACTION_VIEW);

            // set without activity tag
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            if (Build.VERSION.SDK_INT >= 24){ // 7.0+
                Uri apkUri = FileProvider.getUriForFile(context, BuildConfig.APPLICATION_ID + "" + ".fileprovider", file);
                intent.addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
            } else {
                intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
            }

            context.startActivity(intent);
        } else {
            Toast.makeText(context, "Download fail!", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        long downloadID = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        SharedPreferences sharedPreferences = context.getSharedPreferences("rn_download_android", 0);
        long reference = sharedPreferences.getLong("rn_download_android_apk", 0);

        if (reference == downloadID) {
            DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            DownloadManager.Query query = new DownloadManager.Query();

            query.setFilterById(downloadID);
            Cursor download = downloadManager.query(query);
            String downloadName = null;

            if (download.moveToFirst()) {
                int status = download.getInt(download.getColumnIndex(DownloadManager.COLUMN_STATUS));
                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    installApp(context);
                } else {
                    Toast.makeText(context, "download fail and clear residual!", Toast.LENGTH_LONG).show();
                    downloadManager.remove(downloadID);
                    download.close();
                    return;
                }
            }

            if (downloadName == null) {
                return;
            }
        }
    }
}
