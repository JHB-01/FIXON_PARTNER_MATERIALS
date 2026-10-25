# FIXON R9 - Mini-Update Po Audycie

Ta paczka jest nakladka na pelna zbiorcza R8 z 24 pazdziernika, ktorej instalacje potwierdzono. Nie wymaga nowych warunkow handlowych ani zmiany cen. Naprawia pozostawione etykiety ilosciowe PL/Warsaw Home i odtwarza aktualne zatwierdzone tresci, ktorych brakuje na publicznej stronie. Zawiera zalezne obrazy/fonty, nowe poprawne fontowo reklamy oraz dotychczasowy mechanizm publikacji R8. Nie kasuje plikow uzytkownika.

## Wgranie

1. W GitHub Desktop wybierz repo FIXON i otworz jego folder przez Repository / Show in Explorer.
2. Skopiuj ZAWARTOSC folderu `DO_WGRANIA` do glownego folderu repozytorium. Zastap pliki o tych samych nazwach. Nie kopiuj calego folderu `DO_WGRANIA` jako podfolderu.
3. Nie usuwaj `client-files/.gitattributes`. Chroni spakowane katalogi przed zmiana znakow i koncow linii przez Git.
4. Sprawdz wszystkie 50 katalogow samodzielnych dolaczonym, tylko-odczytowym `SPRAWDZ_KATALOGI.ps1`, podajac parametr `-Repo` z folderem repo. Wynik ma byc PASS. Jesli pokazuje BRAK/INNA WERSJA, naloz ponownie pelna zbiorcza R8 z 24.10, a nastepnie R9. Ta mala paczka celowo nie zawiera 48 niezmienionych, duzych katalogow offline.
5. Zrob commit i Push we wlasnym GitHub Desktop. W ustawieniach Pages zrodlem ma byc GitHub Actions. Poczekaj na sukces zalaczonego workflow publikacji; sam commit nie oznacza aktualizacji publicznej strony.
6. Sprawdz publicznie katalogi PL/Warsaw Home, dowolny rynek zagraniczny, cenniki, umowy PL/EN i pobrany katalog samodzielny. Odswiez bez pamieci podrecznej. Nie powinno byc etykiet RRP `<5 szt.` ani dawnych ogolnych progow 10/50/100 sztuk.

## Wazne Rozroznienie

Audyt publicznych 438 adresow wykazal mieszane starsze wersje i osiem brakujacych dokumentow, pomimo potwierdzenia wgrania R8. Raport nie utozsamia wszystkich roznic tekstu z bledem rabatu. R9 przywraca dla tych sciezek najnowsze juz zatwierdzone pliki R8 oraz poprawia znalezione resztki PL/WH. To nie jest nowa polityka cenowa. Po publikacji trzeba potwierdzic wynik na publicznych adresach.

Duza, osobna paczka targowa sluzy do druku i pracy marketingowej. Nie wrzucaj calej paczki targowej do Pages. W tej nakladce sa tylko jej odpowiedniki reklam potrzebne na stronie. Wektory z poprawnymi fontami sa samodzielne; workflow pozostawia duze SVG w repo i kieruje do nich z serwisu. Caly zestaw papierowy ma osobna instrukcje produkcji.

Raporty, manifesty i ta instrukcja sa obok `DO_WGRANIA`, nie musza trafiac do repo. Nie wykonano publikacji, push ani wysylki wiadomosci za uzytkownika.
