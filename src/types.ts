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


export function createCleanExitSettings(obj: any): CleanExitSettings | null {
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

  const missingFields = requiredFields.filter(field => !(field in obj));
  if (missingFields.length > 0) {
    console.log(`CleanExitSettings is missing required fields: ${missingFields.join(", ")}`);
    return null;
  }

  return new CleanExitSettings(
    Boolean(obj.browsing_history),
    Boolean(obj.download_history),
    Boolean(obj.cookies_site_data),
    Boolean(obj.cached_images_files),
    Boolean(obj.passwords_sign_in_data),
    Boolean(obj.autofill_form_data),
    Boolean(obj.site_settings),
    Boolean(obj.hosted_app_data)
  );
}
