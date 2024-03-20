export class CleanExitSettings {
  constructor(
    public browsing_history: boolean = false,
    public download_history: boolean = false,
    public cookies_site_data: boolean = false,
    public cached_images_files: boolean = false,
    public passwords_sign_in_data: boolean = false,
    public autofill_form_data: boolean = false,
    public site_settings: boolean = false,
    public hosted_app_data: boolean = false
  ) {}
}

export function isValidSettings(obj: any): obj is CleanExitSettings {
  const requiredFields = [
    "browsing_history",
    "download_history",
    "cookies_site_data",
    "cached_images_files",
    "passwords_sign_in_data",
    "autofill_form_data",
    "site_settings",
    "hosted_app_data",
  ];
  for (const field of requiredFields) {
    if (!(field in obj)) {
      console.log(`CleanExitSettings is missing required field: ${field}`);
      return false;
    }
  }
  return true;
}
