# Ingenieurbuero Kuehl Homepage

Statische Unternehmenswebsite fuer das `Ingenieurbuero fuer Fahrzeugtechnik Kuehl`.

Live:
- `https://ingenieurbuero-kuehl.de`
- `https://www.ingenieurbuero-kuehl.de`

## Projektueberblick

Die Website praesentiert das Buero, die angebotenen Leistungen sowie die Kontaktmoeglichkeiten fuer Interessenten in Koeln und Umgebung.

Schwerpunkte der Website:
- responsives Layout fuer Mobile und Desktop
- klare Nutzerfuehrung mit direktem Kontaktweg
- GitHub-Pages-kompatibler statischer Aufbau
- rechtliche Seiten fuer Impressum und Datenschutz
- kontaktfreundliches Formular mit lokaler E-Mail-Vorbereitung

## Seiten

- `index.html` - Startseite
- `leistungen.html` - Leistungen und Fachgebiete
- `ueber-uns.html` - Qualifikation, Haltung und Werdegang
- `kontakt.html` - Kontakt, Formular, Adresse und Erreichbarkeit
- `impressum.html` - Impressum
- `datenschutz.html` - Datenschutzerklaerung
- `danke.html` - Danke-Seite

## Technik

Die Website verwendet bewusst keinen Build-Prozess und kein Framework.

Stack:
- HTML
- CSS
- JavaScript
- GitHub Pages fuer das Hosting

Wichtige Frontend-Funktionen in `js/main.js`:
- mobile Navigation
- Cookie-Hinweis mit `localStorage`
- automatisches Jahresdatum im Footer
- Formularlogik fuer die vorbereitete E-Mail im lokalen Mailprogramm

## Projektstruktur

```text
.
|- index.html
|- leistungen.html
|- ueber-uns.html
|- kontakt.html
|- impressum.html
|- datenschutz.html
|- danke.html
|- CNAME
|- .nojekyll
|- css/
|  \- style.css
|- js/
|  \- main.js
`- assets/
```

Nicht fuer das Repo gedacht:
- `test-output/`
- `VOR-VEROEFFENTLICHUNG-CHECKLISTE.txt`

## Lokal testen

Die Seiten koennen direkt im Browser geoeffnet werden.

Beispiel:
- `index.html` doppelklicken

Oder mit einem einfachen lokalen Webserver arbeiten, wenn relative Pfade oder Browserverhalten komfortabler getestet werden sollen.

## Deployment

Die Website ist fuer GitHub Pages vorbereitet.

Aktueller Stand:
- Branch: `main`
- Ordner: `/ (root)`
- Custom Domain ueber `CNAME`: `ingenieurbuero-kuehl.de`
- `.nojekyll` ist vorhanden

## Kontaktformular

Da GitHub Pages kein serverseitiges Formular-Backend bereitstellt, verwendet die Kontaktseite eine vorbereitete E-Mail:
- Besucher fuellen das Formular aus
- JavaScript erstellt daraus eine `mailto:`-Anfrage
- das lokale E-Mail-Programm des Besuchers wird mit vorausgefuelltem Betreff und Text geoeffnet

Falls kein lokales E-Mail-Programm eingerichtet ist, bleibt die direkte Kontaktaufnahme per E-Mail oder Telefon moeglich.

## Pflegehinweise

- CSS- oder JS-Aenderungen sollten mit einer neuen Versionsnummer in den HTML-Dateien versehen werden, damit Browser-Cache sauber aktualisiert wird.
- Nach gestalterischen Aenderungen sollten Mobile- und Desktop-Ansichten geprueft werden.
- Rechtstexte sollten bei inhaltlichen oder technischen Aenderungen mitgeprueft werden.
- Vor einer Veroeffentlichung empfiehlt sich ein letzter Test von Links, Kontaktweg und Domain.
