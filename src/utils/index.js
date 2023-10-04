export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${url}`;
}

export function formatDate (date, inclYear = false) {
  if (inclYear) {
    return (
      new Intl.DateTimeFormat(
        'es-CO',
        {month: 'long', day: 'numeric', year: 'numeric' , timeZone: 'America/Bogota'}
      ).format(new Date(date))
    );
  } else {
    return (
      new Intl.DateTimeFormat(
        'es-CO',
        {month: 'long', day: 'numeric', timeZone: 'America/Bogota'}
      ).format(new Date(date))
    );
  }
}
