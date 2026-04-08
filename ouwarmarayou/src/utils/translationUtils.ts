import i18n from "i18next";

/**
 * Gets a localized field from an object based on the current language.
 * Falls back to the default field if the translation is missing.
 * 
 * @param item The data object (e.g., Actualite, Activite)
 * @param field The field base name (e.g., 'titre', 'description')
 * @returns The localized string or the default version
 */
export function getLocalized<T>(item: T, field: keyof T): string {
  if (!item) return "";

  const lang = i18n.language;
  const localizedKey = `${String(field)}_${lang}` as keyof T;

  // Si on est en français, on retourne le champ de base (sauf si on veut forcer _fr)
  if (lang === "fr") {
    return String(item[field] || "");
  }

  // Sinon on cherche le champ localisé
  const value = item[localizedKey];
  
  // Si la valeur localisée existe et n'est pas vide, on l'utilise
  if (value && String(value).trim() !== "") {
    return String(value);
  }

  // Fallback sur le champ de base (Français)
  return String(item[field] || "");
}

/**
 * Translation helper for simple arrays or static objects that might be passed to t()
 * but are actually dynamic identifiers.
 */
export function tDynamic(t: any, key: string): string {
  return t(key);
}
