// Country list for the cruise partner calculator.
//
// UN_COUNTRIES holds the 193 member states of the United Nations, in the
// official short form used by the UN. TERRITORIES adds the non-sovereign
// islands and overseas territories that carry cruise traffic — a cruise
// retailer on Aruba, Curaçao or Sint Maarten needs them just as much as a
// sovereign state, so they are listed separately and clearly marked.

export const UN_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
  "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Côte d'Ivoire",
  "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic People's Republic of Korea",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea",
  "Republic of Moldova", "Romania", "Russian Federation", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syrian Arab Republic",
  "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Türkiye", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United Republic of Tanzania", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Viet Nam", "Yemen", "Zambia", "Zimbabwe",
];

export const TERRITORIES = [
  "American Samoa", "Anguilla", "Aruba", "Bermuda", "Bonaire",
  "British Virgin Islands", "Cayman Islands", "Cook Islands", "Curaçao",
  "Falkland Islands", "Faroe Islands", "French Polynesia", "Gibraltar",
  "Greenland", "Guadeloupe", "Guam", "Guernsey", "Hong Kong SAR",
  "Isle of Man", "Jersey", "Macao SAR", "Martinique", "Montserrat",
  "New Caledonia", "Niue", "Norfolk Island", "Northern Mariana Islands",
  "Palestine", "Pitcairn Islands", "Puerto Rico", "Saba",
  "Saint Barthélemy", "Saint Martin", "Saint Pierre and Miquelon",
  "Sint Eustatius", "Sint Maarten", "Taiwan", "Tokelau",
  "Turks and Caicos Islands", "US Virgin Islands", "Wallis and Futuna",
  "Åland Islands",
];

// Ready-made options for the searchable country selector, grouped so the UN
// member states come first and the islands / territories sit under their own
// heading.
export const COUNTRY_OPTIONS = [
  ...[...UN_COUNTRIES].sort((a, b) => a.localeCompare(b)).map((c) => ({
    key: `un-${c}`,
    label: c,
    group: "United Nations member states",
  })),
  ...[...TERRITORIES].sort((a, b) => a.localeCompare(b)).map((c) => ({
    key: `ter-${c}`,
    label: c,
    group: "Islands & territories",
  })),
];