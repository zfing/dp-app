package com.ex_app;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DownloadApkModule extends ReactContextBaseJavaModule {
    public static String description;

    DownloadManager downloadManager;
    Activity activity;

    public DownloadApkModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "RNDownloadApk";
    }

    @ReactMethod
    public void downloading(String url, String description) {
        DownloadApkModule.description = description;

        activity = getCurrentActivity();
        downloadManager = (DownloadManager) activity.getSystemService(Context.DOWNLOAD_SERVICE);
        Uri uri = Uri.parse(url);
        DownloadManager.Request request = new DownloadManager.Request(uri);

        // set wifi or mobile
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);

        // set notify title
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
        request.setMimeType("application/vnd.android.package-archive");
        request.setTitle("Download");

        if (description == null || "".equals(description)) {
            description = "downloading";
        }

        request.setDescription(description);
        request.setAllowedOverRoaming(false);

        // set storage dir
        request.setDestinationInExternalFilesDir(activity, Environment.DIRECTORY_DOWNLOADS, description);

        long downloadid = downloadManager.enqueue(request);
        SharedPreferences sharedPreferences = activity.getSharedPreferences("rn_download_android",0);
        sharedPreferences.edit().putLong("rn_download_android_apk", downloadid).commit();
    }
}
