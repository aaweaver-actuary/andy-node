class Due {
  constructor(
    // Human defined date in arbitrary format.
    string,

    // Date in format YYYY-MM-DD corrected to user's timezone.
    date,

    // Whether the task has a recurring due date.
    is_recurring,

    // Date and time in RFC3339 format in UTC. This field is read-only. Only returned
    // if date and time are set for the task. Note that T00:00:00Z is returned for all-day tasks.
    datetime = null,

    // Only returned if exact due time set, user's timezone definition either in
    // tzdata-compatible format("Europe/Berlin") or as a string specifying east of
    // UTC offset as "UTC±HH:MM" (i.e. "UTC-01:00").
    timezone = null,
  ) {
    this.string = string;
    this.date = date;
    this.is_recurring = is_recurring;
    this.datetime = datetime;
    this.timezone = timezone;
  }

  // ============================ METHODS TO CREATE NEW INSTANCES ============================
  // Create a new Due from a string
  static fromString(string) {
    // if the string contains the words every or ev, is_recurring is true, and next word
    // defines the frequency
    let is_recurring = false;
    let frequency = null;

    // Lowercase the string and split it into an array of words
    const lower = string.toLowerCase();
    const words = lower.split(' ');

    // If the string contains the word every or ev, is_recurring is true
    if (words.includes('every') || words.includes('ev')) {
      is_recurring = true;

      // check the very next word to see if it is a valid frequency
      let nextWord = words[words.indexOf('every') + 1];

      // If the string contains the word day or days, the frequency is days
      if (
        nextWord.includes('day') ||
        nextWord.includes('days') ||
        nextWord.includes('d')
      ) {
        frequency = 'days';
      } else if (
        nextWord.includes('week') ||
        nextWord.includes('weeks') ||
        nextWord.includes('wk') ||
        nextWord.includes('w')
      ) {
        // If the string contains the word week or weeks, the frequency is weeks
        frequency = 'weeks';
      } else if (
        nextWord.includes('month') ||
        nextWord.includes('months') ||
        nextWord.includes('m') ||
        nextWord.includes('mo') ||
        nextWord.includes('mth')
      ) {
        // If the string contains the word month or months, the frequency is months
        frequency = 'months';
      } else if (
        nextWord.includes('year') ||
        nextWord.includes('years') ||
        nextWord.includes('y') ||
        nextWord.includes('yr')
      ) {
        // If the string contains the word year or years, the frequency is years
        frequency = 'years';
      } else {
        // If none of the above, throw an error
        throw new Error(`Invalid frequency keyword: ${nextWord}`);
      }

      // If the string contains the word every or ev, remove the word and the next word
      // from the string
      string = string.replace(`every ${nextWord}`, '');
    }

    // parse the date from the string
    const date = Date.parse(string);

    // if the date is valid, return a new Due with the date
    if (date) {
      return new Due(string, date, is_recurring);
    } else {
      // if the date is not valid, return a new Due with the string
      return new Due(string, null, is_recurring);
    }
  }
}

module.exports = Due;
