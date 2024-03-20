import "./style.css";
import { CleanExitSettings, isValidSettings } from "./types";

async function main() {
  let recv;
  try {
    recv = (await chrome.storage.sync.get()) as CleanExitSettings;
  } catch (e) {
    const errMsg = `Failed to retrieve data from Chrome storage: ${e}`;
    console.error(errMsg);
    document.getElementById("app")!.innerHTML = `<p>${errMsg}</p>`;
    return;
  }

  let settings: CleanExitSettings;
  if (isValidSettings(recv)) {
    settings = recv;
  } else {
    const errMsg = "CleanExit settings are missing or corrupted.";
    console.error(errMsg);
    document.getElementById("app")!.innerHTML = `<p>${errMsg}</p>`;
    return;
  }

  const bh = document.getElementById("browsing_history") as HTMLInputElement;
  if (bh) {
    bh.checked = settings.browsing_history;
    bh.addEventListener("change", (_ev) => {
      chrome.storage.sync.set({
        browsing_history: bh.checked,
      });
    });
  }

  const dh = document.getElementById("download_history") as HTMLInputElement;
  if (dh) {
    dh.checked = settings.download_history;
    dh.addEventListener("change", (_ev) =>
      chrome.storage.sync.set({
        download_history: dh.checked,
      })
    );
  }

  const csd = document.getElementById("cookies_site_data") as HTMLInputElement;
  if (csd) {
    csd.checked = settings.cookies_site_data;
    csd.addEventListener("change", (_ev) =>
      chrome.storage.sync.set({
        cookies_site_data: csd.checked,
      })
    );
  }

  const cif = document.getElementById(
    "cached_images_files"
  ) as HTMLInputElement;
  if (cif) {
    cif.checked = settings.cached_images_files;
    cif.addEventListener("change", (_ev) =>
      chrome.storage.sync.set({
        cached_images_files: cif.checked,
      })
    );
  }

  const ps = document.getElementById(
    "passwords_sign_in_data"
  ) as HTMLInputElement;
  if (ps) {
    ps.checked = settings.passwords_sign_in_data;
    ps.addEventListener("change", (_ev) =>
      chrome.storage.sync.set({
        passwords_sign_in_data: ps.checked,
      })
    );
  }

  const af = document.getElementById("autofill_form_data") as HTMLInputElement;
  if (af) {
    af.checked = settings.autofill_form_data;
    af.addEventListener("change", (_ev) =>
      chrome.storage.sync.set({
        autofill_form_data: af.checked,
      })
    );
  }

  const ha = document.getElementById("hosted_app_data") as HTMLInputElement;
  if (ha) {
    ha.checked = settings.hosted_app_data;
    ha.addEventListener("change", (_ev) =>
      chrome.storage.sync.set({
        hosted_app_data: ha.checked,
      })
    );
  }
}

main();
