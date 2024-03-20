import { CleanExitSettings, isValidSettings } from "./types";

async function main() {
  console.log("CleanExit has started.");

  let recv;
  try {
    recv = await chrome.storage.sync.get();
  } catch (e) {
    console.error(`Failed to retrieve data from Chrome storage: ${e}`);
    return;
  }

  let settings: CleanExitSettings;
  if (isValidSettings(recv)) {
    settings = recv;
  } else {
    console.log(
      "CleanExit settings are missing or corrupted - setting to default."
    );
    settings = new CleanExitSettings();
    try {
      await chrome.storage.sync.set(settings);
    } catch (e) {
      console.error(
        `Failed to save CleanExit settings to Chrome storage: ${e}`
      );
      return;
    }
  }

  const removeAll: chrome.browsingData.RemovalOptions = { since: 0 };
  try {
    if (settings.browsing_history === true) {
      await chrome.browsingData.removeHistory(removeAll);
      console.log("Removed browsing history.");
    }

    if (settings.download_history === true) {
      await chrome.browsingData.removeDownloads(removeAll);
      console.log("Removed download history.");
    }

    if (settings.cookies_site_data === true) {
      await chrome.browsingData.removeCookies(removeAll);
      await chrome.browsingData.removeCacheStorage(removeAll);
      await chrome.browsingData.removeLocalStorage(removeAll);
      await chrome.browsingData.removeIndexedDB(removeAll);
      await chrome.browsingData.removeFileSystems(removeAll);
      await chrome.browsingData.removeServiceWorkers(removeAll);
      await chrome.browsingData.removeWebSQL(removeAll);
      console.log("Removed cookies and other site data.");
    }

    if (settings.cached_images_files === true) {
      await chrome.browsingData.removeCache(removeAll);
      console.log("Removed cache data.");
    }

    if (settings.passwords_sign_in_data === true) {
      await chrome.browsingData.removePasswords(removeAll);
      console.log("Removed saved passwords.");
    }

    if (settings.autofill_form_data == true) {
      await chrome.browsingData.removeFormData(removeAll);
      console.log("Removed auto-fill data.");
    }

    if (settings.hosted_app_data === true) {
      await chrome.browsingData.removeAppcache(removeAll);
      console.log("Removed application cache.");
    }
  } catch (e) {
    console.error(`CleanExit failed to delete some data: ${e}`);
    return;
  }

  console.log("CleanExit has successfully cleared all requested data.");
}

chrome.runtime.onStartup.addListener(() => main());
chrome.runtime.onInstalled.addListener((obj) => {
  // @ts-ignore
  if (obj.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: "popup.html" });
  }
  main();
});
