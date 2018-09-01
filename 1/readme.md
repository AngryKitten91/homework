# Zadanie 1: Programowanie CSS

## Treść:
>W pliku styles.scss zaimportuj zawartość plików _variables.scss i _main.scss (zachowaj tę kolejność importu). Pamiętaj, że w imporcie nie musisz wstawiać podkreślnika (_) ani rozszerzenia pliku (.scss). Jeżeli nie wiesz jak pracować ze ścieżkami w systemie operacyjnym, to zobacz ten filmik.
>
>W pliku _variables.scss zadeklaruj zmienną (o zmiennych) o nazwie errorColor (pamiętaj o właściwym przedrostku dla zmiennych w sass); niech przechowuje kolor czerwony.
>
>W pliku _main.scss utwórz regułę dla klasy .error, dodaj do niej styl background i przypisz do niej zmienną errorColor. Dodaj też styl color: white.
>
>W pliku _main.scss, za pomocą pętli for wygeneruj 10 klas o nazwie paragraph-[wartość zmiennej z zakresu od 12 do 21] (czyli: .paragrapth-12, .paragrapth-13, .paragrapth-14,..., .paragrapth-20, .paragrapth-21) ze stylem font-size: [wartość jak w nazwie klasy] oraz te same klasy z atrybutem --alert ze stylem color: [wartość zmiennej errorColor] i font-size: [wartość zmiennej jak w nazwie klasy] (czyli: .paragraph-12--alert,..., .paragraph-21--alert).

---

## Rozwiązanie:

### Struktura plików:

```
scss
├─┬ partials
│ ├── _main.scss
│ └── _variables.scss
├── gulpfile.js
├── readme.md
├── styles.css
└── styles.scss
```

W pliku **partials/_main.scss** znajdują się dwie wersje pętli mającej rozwiązać zadanie.

* Pierwsze rozwiąznaie wykorzystuję metodę **@extend** pozwalającą na dziedziczenie styli wskazanej klasy
* Druga tworzy niezależne klasy
 