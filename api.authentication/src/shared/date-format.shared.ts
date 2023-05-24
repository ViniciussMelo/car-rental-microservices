export class DateFormat {
  static formatDate(date: Date, language = 'pt-BR') {
    return new Intl.DateTimeFormat(language, {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }
}
